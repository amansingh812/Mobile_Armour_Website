#!/usr/bin/env node
/**
 * Import products from Crazy Parts (our wholesaler) into the shop.
 *
 *   npm run import:crazyparts -- <product url> [more urls] [options]
 *   npm run import:crazyparts -- --file products.csv [options]
 *
 * By default it only PREVIEWS: reads each product and prints what it would
 * save. Nothing is uploaded or written until you add --apply.
 *
 * Options (apply to every URL on the command line; a CSV can set them per row):
 *   --cost 12.50       our cost ex GST (from your Crazy Parts account or price list)
 *   --markup 2         price = cost x markup, rounded up to end in 9 (default 2)
 *   --price 39         set the selling price directly instead of cost x markup
 *   --order-in         ordered from Crazy Parts when bought (default: held at the kiosk)
 *   --stock 3          units at the kiosk (default 1; order-in items use 99 while
 *                      Crazy Parts has stock, else 0)
 *   --apply            upload photos to Cloudinary and save to MongoDB
 *
 * CSV columns (header row required): url,cost,price,fulfilment,stock
 *   fulfilment is "kiosk" or "order-in"; empty cells fall back to the options.
 *
 * Reads MONGODB_URI, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY,
 * CLOUDINARY_API_SECRET and (optional) OPENAI_API_KEY from .env.local / .env.
 * Uses only the public product data on the page (schema.org Product); never
 * logs in and never reads trade prices.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- env + args
for (const f of ['.env.local', '.env']) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) continue;
  for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m || process.env[m[1]] !== undefined) continue;
    process.env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
  }
}

const argv = process.argv.slice(2);
const opt = { urls: [], markup: 2, apply: false, fulfilment: 'kiosk' };
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  const next = () => argv[++i];
  if (a === '--apply') opt.apply = true;
  else if (a === '--order-in') opt.fulfilment = 'order-in';
  else if (a === '--cost') opt.cost = Number(next());
  else if (a === '--price') opt.price = Number(next());
  else if (a === '--markup') opt.markup = Number(next());
  else if (a === '--stock') opt.stock = Number(next());
  else if (a === '--file') opt.file = next();
  else if (a === '--html') opt.html = next(); // offline testing: parse a saved page
  else if (a.startsWith('http')) opt.urls.push(a);
  else if (a === '--help' || a === '-h') {
    console.log(fs.readFileSync(fileURLToPath(import.meta.url), 'utf8').split('*/')[0]);
    process.exit(0);
  } else die(`Unknown option: ${a}`);
}

function die(msg) {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
}

// ------------------------------------------------------------- reference data
/** Device names the Product model accepts, read from src/models/Product.ts. */
function loadDeviceEnum() {
  const src = fs.readFileSync(path.join(ROOT, 'src/models/Product.ts'), 'utf8');
  const block = src.slice(src.indexOf('deviceCompatibility: [{'), src.indexOf('index: true', src.indexOf('deviceCompatibility: [{')));
  return [...block.matchAll(/'([^']+)'/g)].map((m) => m[1]);
}
const DEVICES = loadDeviceEnum();
const norm = (s) => s.toLowerCase().replace(/samsung\s+/g, '').replace(/\s+/g, ' ').trim();
const DEVICE_BY_NORM = new Map(DEVICES.map((d) => [norm(d), d]));

const CATEGORY_RULES = [
  [/power ?bank|battery pack/i, 'Power Banks'],
  [/car (mount|holder|charger)|vent|dashboard|fm transmitter/i, 'Car Holders'],
  [/screen protector|tempered glass|\bglass\b|lens protector|privacy film|protector/i, 'Screen Protectors'],
  [/\bcase\b|cover|bumper|folio|wallet/i, 'Cases'],
  [/charger|cable|adapter|adaptor|usb|lightning|magsafe charg/i, 'Cables & Adapters'],
];

const KNOWN_BRANDS = ['REDEFYNE', 'Mercury', 'Goospery', 'Kinglas', 'Baseus', 'LITO', 'iQuick', 'Ugreen', 'Anker', 'Spigen', 'UAG', 'OtterBox'];

// ----------------------------------------------------------------- parsing
async function getHtml(url) {
  if (opt.html) return fs.readFileSync(opt.html, 'utf8');
  const res = await fetch(url, { headers: { 'User-Agent': 'MobileArmourImporter/1.0 (+https://www.mobilearmour.com.au)' } });
  if (res.status === 403 && res.headers.get('cf-mitigated')) {
    throw new Error(
      'Crazy Parts blocked the request (Cloudflare bot check). Save the page from your browser ' +
        '(File > Save Page As, "Webpage, Complete") and re-run with --html <saved-file.html>.'
    );
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

function productLd(html) {
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch {
      continue;
    }
    for (const x of Array.isArray(data) ? data : [data]) if (x && x['@type'] === 'Product') return x;
  }
  return null;
}

/** "Case for iPhone 17 Pro Max / 18 Pro Max" -> ['iPhone 17 Pro Max', 'iPhone 18 Pro Max'] */
function parseDevices(title) {
  const found = new Set();
  const families = [
    ['iPhone', /iphone/i],
    ['Galaxy', /(samsung\s+)?galaxy|samsung/i],
    ['Google Pixel', /(google\s+)?pixel/i],
    ['iPad', /ipad/i],
  ];
  for (const [family, re] of families) {
    const start = title.search(re);
    if (start < 0) continue;
    const tail = title.slice(start).replace(/\(.*?\)/g, '');
    const parts = tail.split(/\s*\/\s*|\s*,\s*|\s+&\s+|\s+and\s+/);
    for (let raw of parts) {
      raw = raw.replace(re, '').trim().split(/\s+(?:case|cover|glass|screen|protector|with|for|-)\b/i)[0].trim();
      if (!raw) continue;
      const candidates = [`${family} ${raw}`, `Samsung Galaxy ${raw}`, raw];
      for (const c of candidates) {
        // try the longest prefix that matches a known device
        const words = c.split(/\s+/);
        for (let n = words.length; n > 0; n--) {
          const hit = DEVICE_BY_NORM.get(norm(words.slice(0, n).join(' ')));
          if (hit) {
            found.add(hit);
            break;
          }
        }
      }
    }
  }
  return [...found];
}

function parseFeatures(description) {
  const text = description.replace(/\s+/g, ' ');
  const material = (text.match(/Material:\s*([^-]+?)(?=\s+Features:|\s+-\s|$)/i) || [])[1]?.trim();
  const bullets = text
    .split(/\s-\s|\s?\[[^\]]+\]\s?/)
    .map((s) => s.replace(/^Features:\s*/i, '').trim())
    .filter((s) => s && !/^(Material|Brand|Note)\b/i.test(s) && s.length > 6 && s.length < 220)
    .map((s) => s.replace(/\s*Note:.*$/i, '').replace(/\.$/, ''));
  return { material, bullets: [...new Set(bullets)].slice(0, 8) };
}

function detectBrand(name, description) {
  const m = description.match(/Brand:\s*([A-Za-z0-9&\- ]{2,30}?)(?=\s{1,}|\s*\[|$)/);
  if (m) return m[1].trim();
  return KNOWN_BRANDS.find((b) => new RegExp(`\\b${b}\\b`, 'i').test(name)) || '';
}

function tidyName(name) {
  return name
    .replace(/\bCase Cover\b/i, 'Case')
    .replace(/\bProtective Transparent\b/i, 'Clear')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function typeTags(name, features) {
  const t = `${name} ${features.join(' ')}`;
  const caseTypes = [];
  if (/clear|transparent|crystal|jelly/i.test(t)) caseTypes.push('Clear TPU');
  if (/silicone/i.test(t)) caseTypes.push('Silicone');
  if (/leather/i.test(t)) caseTypes.push('Leather');
  if (/heavy duty|shockproof|armou?r|military|rugged|kevlar/i.test(t)) caseTypes.push('Rugged Shockproof');
  if (/slim|thin/i.test(t)) caseTypes.push('Slim');
  if (/wallet|card|diary|folio/i.test(t)) caseTypes.push('Wallet Case');
  if (/magsafe|magnetic/i.test(t)) caseTypes.push('MagSafe Compatible');
  const screenProtectorTypes = [];
  if (/privacy/i.test(t)) screenProtectorTypes.push('Privacy');
  if (/tempered|glass/i.test(t)) screenProtectorTypes.push('Tempered Glass');
  if (/matte|anti-?glare/i.test(t)) screenProtectorTypes.push('Anti-glare');
  const accessoryTypes = [];
  if (/magsafe|magnetic/i.test(t)) accessoryTypes.push('MagSafe Compatible');
  if (/wireless charg/i.test(t)) accessoryTypes.push('Wireless Charging Compatible');
  return { caseTypes, screenProtectorTypes, accessoryTypes };
}

/** Rounds up to the next price ending in 9 (17.60 -> 19, 24 -> 29). */
export function retailFromCost(cost, markup) {
  const raw = cost * markup;
  return Math.ceil((raw + 1) / 10) * 10 - 1;
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
/** Same as productSegment() in src/lib/products.ts, so the printed link is the real page. */
const productSlug = (name) =>
  name
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\+/g, ' plus ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .slice(0, 80)
    .replace(/-+$/g, '');

// ------------------------------------------------------------- description
async function writeDescription(p) {
  const fallback = [
    `${p.name}.`,
    p.devices.length ? `Made to fit the ${p.devices.join(' and ')}.` : '',
    p.material ? `Material: ${p.material}.` : '',
    p.features.length ? `${p.features.slice(0, 4).join('. ')}.` : '',
    'Available at Mobile Armour, Warringal Shopping Centre, Heidelberg.',
  ]
    .filter(Boolean)
    .join(' ');
  if (!process.env.OPENAI_API_KEY) return { text: fallback, source: 'template' };
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.4,
        messages: [
          {
            role: 'system',
            content:
              'You write product descriptions for Mobile Armour, a phone accessories kiosk in Heidelberg, Melbourne. Australian English. 60-100 words, plain text, no headings, no emoji. Use ONLY the facts given; never invent specs, ratings, certifications, drop heights or warranties. Do not copy sentences from the supplier text; write in your own words. Mention the exact phone models it fits.',
          },
          {
            role: 'user',
            content: JSON.stringify({ name: p.name, fits: p.devices, material: p.material, features: p.features }),
          },
        ],
      }),
    });
    if (!res.ok) throw new Error(`OpenAI HTTP ${res.status}`);
    const j = await res.json();
    const text = j.choices?.[0]?.message?.content?.trim();
    return text ? { text, source: 'openai' } : { text: fallback, source: 'template' };
  } catch (e) {
    console.warn(`  ! description draft fell back to template (${e.message})`);
    return { text: fallback, source: 'template' };
  }
}

// --------------------------------------------------------------- cloudinary
async function uploadImage(srcUrl, publicId) {
  const { CLOUDINARY_CLOUD_NAME: cloud, CLOUDINARY_API_KEY: key, CLOUDINARY_API_SECRET: secret } = process.env;
  if (!cloud || !key || !secret) die('Cloudinary keys missing: set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
  const timestamp = Math.floor(Date.now() / 1000);
  const params = { overwrite: 'true', public_id: publicId, timestamp: String(timestamp) };
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&');
  const signature = crypto.createHash('sha1').update(toSign + secret).digest('hex');
  const body = new FormData();
  body.set('file', srcUrl); // Cloudinary fetches the image itself
  for (const [k, v] of Object.entries(params)) body.set(k, v);
  body.set('api_key', key);
  body.set('signature', signature);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, { method: 'POST', body });
  const j = await res.json();
  if (!res.ok) throw new Error(`Cloudinary: ${j.error?.message || res.status}`);
  return j.secure_url;
}

// --------------------------------------------------------------------- run
function readCsv(file) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter((l) => l.trim());
  const head = lines.shift().split(',').map((h) => h.trim().toLowerCase());
  return lines.map((l) => {
    const cells = l.split(',').map((c) => c.trim());
    return Object.fromEntries(head.map((h, i) => [h, cells[i] || '']));
  });
}

async function prepare(row) {
  const html = await getHtml(row.url);
  const ld = productLd(html);
  if (!ld) throw new Error('No product data found on the page (schema.org Product missing)');
  const description = String(ld.description || '');
  const { material, bullets } = parseFeatures(description);
  const name = tidyName(String(ld.name));
  const devices = parseDevices(String(ld.name));
  const category = (CATEGORY_RULES.find(([re]) => re.test(ld.name)) || [])[1];
  const supplierInStock = /InStock/i.test(ld.offers?.availability || '');
  const rrp = Number(ld.offers?.price) || null;
  const images = (Array.isArray(ld.image) ? ld.image : [ld.image]).filter(Boolean).map((u) => u.split('?')[0]);

  const cost = row.cost !== undefined && row.cost !== '' ? Number(row.cost) : opt.cost;
  const fixed = row.price !== undefined && row.price !== '' ? Number(row.price) : opt.price;
  const price = Number.isFinite(fixed) ? fixed : Number.isFinite(cost) ? retailFromCost(cost, opt.markup) : null;
  const fulfilment = row.fulfilment || opt.fulfilment;
  const stock =
    row.stock !== undefined && row.stock !== ''
      ? Number(row.stock)
      : opt.stock !== undefined
        ? opt.stock
        : fulfilment === 'order-in'
          ? supplierInStock
            ? 99
            : 0
          : 1;

  const p = {
    url: row.url,
    supplierName: String(ld.name),
    name,
    sku: ld.sku ? String(ld.sku) : null,
    gtin: ld.gtin ? String(ld.gtin) : null,
    manufacturer: detectBrand(String(ld.name), description),
    devices,
    category,
    material,
    features: bullets,
    images,
    rrp,
    cost: Number.isFinite(cost) ? cost : null,
    price,
    fulfilment,
    stock,
    supplierInStock,
    productId: (row.url.match(/-(\d+)(?:[/?#]|$)/) || [])[1] || null,
  };
  p.description = await writeDescription(p);
  return p;
}

function report(p) {
  const warn = [];
  if (!p.category) warn.push('category not recognised: set it in the admin after import');
  if (!p.devices.length) warn.push('no fitting phone recognised in the title');
  if (!p.sku) warn.push('no SKU on the page: re-running may create a duplicate');
  if (p.price === null) warn.push('no price: pass --cost (or --price) before --apply');
  if (!p.supplierInStock) warn.push('Crazy Parts shows this OUT OF STOCK');
  console.log(`\n• ${p.name}`);
  console.log(`  SKU ${p.sku || '—'} · barcode ${p.gtin || '—'} · brand ${p.manufacturer || '—'}`);
  console.log(`  Category: ${p.category || '?'} · Fits: ${p.devices.join(', ') || '?'}`);
  console.log(
    `  Price: ${p.price !== null ? `$${p.price}` : '—'}${p.cost !== null ? (p.price === retailFromCost(p.cost, opt.markup) ? ` (cost $${p.cost} × ${opt.markup})` : ` (set by hand; cost $${p.cost})`) : ''} · Crazy Parts retail $${p.rrp ?? '—'}`
  );
  console.log(`  Stock: ${p.fulfilment === 'order-in' ? 'ordered in' : 'at the kiosk'}, ${p.stock} units · ${p.images.length} photos`);
  console.log(`  Description (${p.description.source}): ${p.description.text}`);
  for (const w of warn) console.log(`  ! ${w}`);
}

async function save(p, db) {
  if (p.price === null) throw new Error('no price (use --cost or --price)');
  if (!p.category) throw new Error('category not recognised');
  const key = slug(p.sku || p.gtin || p.name).slice(0, 60);
  const uploaded = [];
  for (let i = 0; i < p.images.length; i++) {
    process.stdout.write(`  uploading photo ${i + 1}/${p.images.length}\r`);
    uploaded.push(await uploadImage(p.images[i], `products/${key}/${i + 1}`));
  }
  const products = db.collection('products');
  const match = p.sku ? { sku: p.sku } : p.gtin ? { gtin: p.gtin } : { name: p.name };
  const existing = await products.findOne(match, { projection: { _id: 1, createdAt: 1 } });
  const now = new Date();
  const tags = typeTags(p.name, p.features);
  const doc = {
    name: p.name,
    description: p.description.text,
    price: p.price,
    imageUrl: uploaded[0],
    images: uploaded,
    category: p.category,
    stock: p.stock,
    features: p.features,
    deviceCompatibility: p.devices,
    brand: p.devices.some((d) => d.startsWith('iPhone') || d.startsWith('iPad')) ? 'Apple' : p.devices.some((d) => d.startsWith('Samsung')) ? 'Samsung' : p.devices.some((d) => d.startsWith('Google')) ? 'Google' : 'Generic',
    ...tags,
    sku: p.sku,
    gtin: p.gtin,
    manufacturer: p.manufacturer || undefined,
    supplier: { name: 'Crazy Parts', url: p.url, productId: p.productId, inStock: p.supplierInStock, checkedAt: now },
    costPrice: p.cost ?? undefined,
    fulfilment: p.fulfilment,
    updatedAt: now,
  };
  if (existing) {
    await products.updateOne({ _id: existing._id }, { $set: doc });
    return { action: 'updated', id: String(existing._id) };
  }
  const r = await products.insertOne({ ...doc, mountTypes: [], chargerTypes: [], cableTypes: [], tags: [], specifications: {}, createdAt: now });
  return { action: 'created', id: String(r.insertedId) };
}

async function main() {
  const rows = opt.file ? readCsv(opt.file) : opt.urls.map((url) => ({ url }));
  if (!rows.length) die('Give at least one Crazy Parts product URL, or --file products.csv. Use --help for options.');
  for (const r of rows) if (!/^https:\/\/(www\.)?crazyparts\.com\.au\/product\//.test(r.url)) die(`Not a Crazy Parts product URL: ${r.url}`);

  console.log(`${opt.apply ? 'IMPORTING' : 'PREVIEW (nothing is saved; add --apply to import)'} · ${rows.length} product(s) · markup ×${opt.markup}`);

  let db = null;
  let mongoose = null;
  if (opt.apply) {
    if (!process.env.MONGODB_URI) die('MONGODB_URI missing from .env.local / .env');
    mongoose = (await import('mongoose')).default;
    await mongoose.connect(process.env.MONGODB_URI);
    db = mongoose.connection.db;
  }

  let ok = 0;
  for (const row of rows) {
    try {
      const p = await prepare(row);
      report(p);
      if (opt.apply) {
        const r = await save(p, db);
        console.log(`  ✓ ${r.action}: https://www.mobilearmour.com.au/products/${productSlug(p.name)}-${r.id}`);
      }
      ok++;
    } catch (e) {
      console.log(`\n✗ ${row.url}\n  ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, 800)); // be polite to the supplier's site
  }
  if (mongoose) await mongoose.disconnect();
  console.log(`\n${ok}/${rows.length} done.${opt.apply ? ' Pages update within the hour (or on the next deploy).' : ''}\n`);
}

main().catch((e) => die(e.stack || e.message));
