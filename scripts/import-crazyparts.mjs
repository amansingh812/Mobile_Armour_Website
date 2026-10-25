#!/usr/bin/env node
/**
 * Import products from Crazy Parts (our wholesaler) into the shop.
 *
 * One shop product = one DESIGN (e.g. "REDEFYNE Liquid Silicone Case") with
 * options for each phone and colour. Crazy Parts sells a design as one page per
 * size group (17 Pro / 18 Pro, 17 Pro Max / 18 Pro Max) with colours on the page.
 *
 * 1. Capture each Crazy Parts page in your browser (Cloudflare blocks scripts):
 *    open the product page, run scripts/crazyparts-capture.js in the console,
 *    save the clipboard as imports/<name>.json.
 * 2. Import the captures for one design together:
 *
 *   npm run import:crazyparts -- --capture imports/a.json imports/b.json [options]
 *
 * Older modes still work for single products:
 *   npm run import:crazyparts -- <product url> --html saved-page.html [options]
 *   npm run import:crazyparts -- --file products.csv [options]
 *
 * By default it only PREVIEWS. Nothing is uploaded or written until --apply.
 *
 * Options:
 *   --name "..."       shop name for the design (default: worked out from the title)
 *   --cost 12.50       our cost ex GST (from your Crazy Parts account or price list)
 *   --markup 2         price = cost x markup, rounded up to end in 9 (default 2)
 *   --price 39         set the selling price directly instead of cost x markup
 *   --from-rrp 1       price = Crazy Parts retail (inc GST) x this, rounded up to end in 9,
 *                      worked out per option (placeholder until you set your own)
 *   --order-in         ordered from Crazy Parts when bought (default for captures)
 *   --stock 3          units of EACH option held at the kiosk (makes it a kiosk product)
 *   --category "Tech Gadgets"  put everything in this shop category (skip name rules)
 *   --dir imports/x    import every capture in a folder, grouping the pages of one design
 *                      (e.g. its 17 Pro / 18 Pro and 17 Pro Max / 18 Pro Max pages)
 *   --all-available    treat every option as available (ignore Crazy Parts stock)
 *   --floor "waterproof|ip68=99"  minimum price for products whose name matches
 *   --apply            upload photos to Cloudinary and save to MongoDB
 *
 * Re-importing updates the same product (matched by option SKUs or name) and
 * keeps options that aren't in this import.
 *
 * Reads MONGODB_URI, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY,
 * CLOUDINARY_API_SECRET and (optional) OPENAI_API_KEY / AI_PROVIDER from
 * .env.local / .env. Uses only public product data; never logs in and never
 * reads trade prices.
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
const opt = { urls: [], captures: [], markup: 2, apply: false, fulfilment: null };
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  const next = () => argv[++i];
  if (a === '--apply') opt.apply = true;
  else if (a === '--order-in') opt.fulfilment = 'order-in';
  else if (a === '--cost') opt.cost = Number(next());
  else if (a === '--price') opt.price = Number(next());
  else if (a === '--markup') opt.markup = Number(next());
  else if (a === '--from-rrp') opt.fromRrp = Number(next());
  else if (a === '--stock') opt.stock = Number(next());
  else if (a === '--file') opt.file = next();
  else if (a === '--name') opt.name = next();
  else if (a === '--category') opt.category = next(); // force the shop category, e.g. "Tech Gadgets"
  else if (a === '--dir') opt.dir = next();
  else if (a === '--jobs') opt.jobs = next(); // e.g. 0-9: import only these designs (by list number)
  else if (a === '--all-available') opt.allAvailable = true;
  else if (a === '--floor') opt.floors = [...(opt.floors || []), next()];
  else if (a === '--capture') {
    while (argv[i + 1] && !argv[i + 1].startsWith('--')) opt.captures.push(argv[++i]);
  }
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
/** Device names the Product model accepts: src/data/phone-models.ts + the DEVICES list in Product.ts. */
function loadDeviceEnum() {
  const models = fs.readFileSync(path.join(ROOT, 'src/data/phone-models.ts'), 'utf8');
  const product = fs.readFileSync(path.join(ROOT, 'src/models/Product.ts'), 'utf8');
  const start = product.indexOf('export const DEVICES');
  const block = product.slice(start, product.indexOf('\n);', start));
  return [
    ...new Set([...[...models.matchAll(/name: '([^']+)'/g)].map((m) => m[1]), ...[...block.matchAll(/'([^']+)'/g)].map((m) => m[1])]),
  ];
}
const DEVICES = loadDeviceEnum();
const norm = (s) => s.toLowerCase().replace(/samsung\s+/g, '').replace(/\s+/g, ' ').trim();
const DEVICE_BY_NORM = new Map(DEVICES.map((d) => [norm(d), d]));
// Crazy Parts names that differ from ours.
for (const [alias, name] of [
  ['iphone 17 air', 'iPhone Air'],
  ['iphone air', 'iPhone Air'],
  ['galaxy s26+', 'Samsung Galaxy S26 Plus'],
  ['galaxy s25+', 'Samsung Galaxy S25 Plus'],
]) {
  if (DEVICES.includes(name)) DEVICE_BY_NORM.set(alias, name);
}

// First match wins, so the more specific kinds come first.
const CATEGORY_RULES = [
  [/earbud|earphone|headphone|headset|airpods/i, 'Headphones'],
  [/speaker|soundbar/i, 'Speakers'],
  [/memory card|micro ?sd|sd card|flash drive|usb drive|thumb drive|card reader/i, 'Memory & Storage'],
  [/bike|bicycle|motorbike|motorcycle|scooter|handlebar/i, 'Bike Mounts'],
  [/power ?bank|battery pack/i, 'Power Banks'],
  [/\bcar\b[\w\s-]{0,20}\b(mount|holder|charger|bracket|cradle)|vehicle mount|gravity (car )?(mount|holder)|ventilation|\bair ?(vent|outlet)\b|\bvent (mount|clip|holder)|dashboard|fm transmitter/i, 'Car Holders'],
  // Cases and glass before stands and chargers: "Magnetic Ring Holder Case" is a case.
  [/screen protector|tempered glass|\bglass\b|lens protector|privacy film|protector/i, 'Screen Protectors'],
  [/\bcase\b|cover|bumper|folio|wallet/i, 'Cases'],
  [/selfie|tripod|gimbal|tracker|air ?tag|ring light|stylus/i, 'Tech Gadgets'],
  [/wireless charg|magsafe charg|qi2?\b|charging pad|charging stand|3[- ]in[- ]1 (?:wireless|charg)/i, 'Wireless Chargers'],
  [/desk stand|phone stand|tablet stand|ring holder|grip|kickstand holder|lazy holder/i, 'Stands & Holders'],
  [/charger|cable|adapter|adaptor|usb|lightning|hub/i, 'Cables & Adapters'],
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
    .replace(/\s*\((?=[A-Z0-9\/-]*\d{6})[A-Z0-9\/ -]{8,}(\)|$)/g, '') // supplier part codes: (C40467600111-01), (A0005…-00/A0005…-00)
    .replace(/-(Cluster|Cosmic)(\s+\w+)?$/i, '') // trailing colour fragments: "...15W-Cluster"

    .replace(/\bCase Cover\b/i, 'Case')
    .replace(/\bProtective Transparent\b/i, 'Clear')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * The design's name without the phones, since one product covers several:
 * "iPhone 17 Pro Max / 18 Pro Max Mercury Silicone Case Cover" -> "Mercury Silicone Case"
 * "REDEFYNE Liquid Silicone Case Cover with Magnetic Ring for iPhone 17 Pro Max / 18 Pro Max"
 *   -> "REDEFYNE Liquid Silicone Case with Magnetic Ring"
 */
function designName(name) {
  let n = tidyName(name);
  // trailing "for iPhone ..." / "For Samsung Galaxy ..."
  n = n.replace(/\s+for\s+(?:the\s+)?(?:apple\s+)?(?:iphone|samsung|galaxy|google|pixel|ipad)\b.*$/i, '');
  // leading "iPhone 17 Pro Max / 18 Pro Max ..."
  const words = n.split(/\s+/);
  if (/^(iphone|samsung|galaxy|google|pixel)$/i.test(words[0] || '')) {
    let i = 0;
    while (i < words.length && /^(iphone|samsung|galaxy|google|pixel|\d+[a-z+]*|s\d+\+?|z|pro|max|plus|air|mini|ultra|fold\d*|flip\d*|duo|e|se|xl|fe|\/|&|,)$/i.test(words[i])) i++;
    n = words.slice(i).join(' ');
  }
  return n.replace(/\s+-\s*$/, '').replace(/\s{2,}/g, ' ').trim() || tidyName(name);
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
    // Same rules as src/lib/ai.ts: OpenRouter when AI_PROVIDER=openrouter or the key is sk-or-...
    const key = process.env.OPENAI_API_KEY;
    const openrouter = (process.env.AI_PROVIDER || '').toLowerCase() === 'openrouter' || key.startsWith('sk-or-');
    const base = openrouter ? 'https://openrouter.ai/api/v1' : 'https://api.openai.com/v1';
    const model = process.env.AI_MODEL || (openrouter ? 'openai/gpt-4o-mini' : 'gpt-4o-mini');
    const res = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
        ...(openrouter ? { 'HTTP-Referer': 'https://www.mobilearmour.com.au', 'X-Title': 'Mobile Armour' } : {}),
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        messages: [
          {
            role: 'system',
            content:
              'You write product descriptions for Mobile Armour, a phone accessories kiosk in Heidelberg, Melbourne. Australian English. 60-100 words, plain text, no headings, no emoji. Use ONLY the facts given; never invent specs, ratings, certifications, drop heights or warranties. Do not copy sentences from the supplier text; write in your own words. Mention the exact phone models it fits. If colours are given, say how many colours it comes in; do not list them all.',
          },
          {
            role: 'user',
            content: JSON.stringify({ name: p.name, fits: p.devices, colours: [...new Set((p.variants || []).map((v) => v.colour).filter(Boolean))], material: p.material, features: p.features }),
          },
        ],
      }),
    });
    if (!res.ok) throw new Error(`${openrouter ? 'OpenRouter' : 'OpenAI'} HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const j = await res.json();
    const text = j.choices?.[0]?.message?.content?.trim();
    return text ? { text, source: openrouter ? 'OpenRouter' : 'OpenAI' } : { text: fallback, source: 'template' };
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
  const params = { overwrite: 'false', public_id: publicId, timestamp: String(timestamp) };
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

/** A page read the old way (link or saved HTML) in the same shape as a browser capture. */
async function captureFromPage(url) {
  const html = await getHtml(url);
  const ld = productLd(html);
  if (!ld) throw new Error('No product data found on the page (schema.org Product missing)');
  const images = (Array.isArray(ld.image) ? ld.image : [ld.image]).filter(Boolean).map((u) => u.split('?')[0]);
  return {
    url,
    productId: (url.match(/-(\d+)(?:[/?#]|$)/) || [])[1] || null,
    name: String(ld.name),
    description: String(ld.description || ''),
    rrp: Number(ld.offers?.price) || null,
    inStock: /InStock/i.test(ld.offers?.availability || ''),
    sku: ld.sku ? String(ld.sku) : null,
    gtin: ld.gtin ? String(ld.gtin) : null,
    images,
    variants: [],
  };
}

function readCapture(file) {
  const c = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!c || !c.name || !Array.isArray(c.images)) throw new Error(`${file} is not a Crazy Parts capture`);
  return c;
}

/** Turns one or more captures of the same design into one shop product. */
async function prepare(captures, row = {}) {
  const first = captures[0];
  const description = String(first.description || '');
  const { material, bullets } = parseFeatures(description);
  const name = row.name || opt.name || designName(String(first.name));
  const category = opt.category || (CATEGORY_RULES.find(([re]) => re.test(first.name)) || [])[1];

  const cost = row.cost !== undefined && row.cost !== '' ? Number(row.cost) : opt.cost;
  const fixed = row.price !== undefined && row.price !== '' ? Number(row.price) : opt.price;
  const fromRrp = Number.isFinite(opt.fromRrp) ? opt.fromRrp : null;
  const price = Number.isFinite(fixed)
    ? fixed
    : Number.isFinite(cost)
      ? retailFromCost(cost, opt.markup)
      : fromRrp !== null
        ? retailFromCost(captures[0].rrp || 0, fromRrp)
        : null;
  const kioskStock = row.stock !== undefined && row.stock !== '' ? Number(row.stock) : opt.stock;
  const fulfilment = row.fulfilment || opt.fulfilment || (kioskStock !== undefined ? 'kiosk' : 'order-in');

  // Same colour, same name: Crazy Parts sometimes names one colour differently on
  // each page of a design ("Blue" vs "Lcyblue"), so the SKU's colour code decides.
  const colourByCode = new Map();
  const colourCode = (sku) => String(sku || '').split('-').pop().toUpperCase();
  const tidyColour = (c) =>
    c ? String(c).replace(/^colou?r:\s*/i, '').trim().replace(/^lcy/i, 'Icy ').replace(/\b\w/g, (m) => m.toUpperCase()) : undefined;

  const variants = [];
  for (const c of captures) {
    const models = parseDevices(String(c.name));
    const options = c.variants && c.variants.length
      ? c.variants
      : [{ sku: c.sku, gtin: c.gtin, colour: null, rrp: c.rrp, inStock: c.inStock, img: [] }];
    // Photos that belong to one colour only (its main shot) go first for that colour
    // and are left out of the other colours' galleries.
    const own = new Map();
    for (const v of options) {
      const list = v.img || [];
      for (const i of list) {
        const others = options.filter((o) => o !== v && (o.img || []).includes(i)).length;
        if (others === 0 && list.length < c.images.length) own.set(i, v.sku);
      }
    }
    const claimed = new Set(options.flatMap((o) => o.img || []));
    for (const v of options) {
      if (!v.sku) continue;
      const list = v.img && v.img.length ? v.img : c.images.map((_, i) => i);
      const mine = list.filter((i) => own.get(i) === v.sku);
      const shared = list.filter((i) => !own.has(i));
      // photos no option lists (general gallery shots) go after each option's own
      for (let i = 0; i < c.images.length; i++) if (!own.has(i) && !claimed.has(i) && !shared.includes(i)) shared.push(i);
      // Up to 5 photos per option: its own first, then shared gallery shots.
      const img = [...mine, ...shared].slice(0, 5).map((i) => c.images[i]).filter(Boolean);
      const code = colourCode(v.sku);
      let colour = tidyColour(v.colour);
      if (colour && colourByCode.has(code)) colour = colourByCode.get(code);
      else if (colour) colourByCode.set(code, colour);
      variants.push({
        sku: String(v.sku),
        gtin: v.gtin ? String(v.gtin) : undefined,
        models,
        colour,
        rrp: v.rrp ?? c.rrp ?? null,
        inStock: opt.allAvailable ? true : v.inStock !== false,
        images: [...new Set(img)],
        url: c.url,
        productId: c.productId || null,
      });
    }
  }
  // Two Crazy Parts pages can list the same phone + colour: keep one option each.
  {
    const seen = new Set();
    for (let i = 0; i < variants.length; i++) {
      const k = `${[...variants[i].models].sort().join('/')}|${(variants[i].colour || '').toLowerCase()}`;
      if (seen.has(k)) variants.splice(i--, 1);
      else seen.add(k);
    }
  }
  // A design for a single phone keeps the phone in its name (good for search).
  const allModels = [...new Set(variants.flatMap((v) => v.models))];
  const finalName = !row.name && !opt.name && allModels.length === 1 && !name.includes(allModels[0]) ? `${name} for ${allModels[0]}` : name;

  const p = {
    name: finalName,
    supplierNames: captures.map((c) => c.name),
    urls: captures.map((c) => c.url),
    manufacturer: detectBrand(String(first.name), description),
    devices: [...new Set(variants.flatMap((v) => v.models))],
    category,
    material,
    features: bullets,
    images: [...new Set(variants.flatMap((v) => v.images))],
    cost: Number.isFinite(cost) ? cost : null,
    price,
    priceFromRrp: !Number.isFinite(fixed) && !Number.isFinite(cost) ? fromRrp : null,
    floor: (opt.floors || []).reduce((m, f) => {
      const [re, min] = String(f).split('=');
      return new RegExp(re, 'i').test(captures.map((c) => c.name).join(' ')) ? Math.max(m, Number(min) || 0) : m;
    }, 0),
    fulfilment,
    kioskStock,
    variants,
  };
  p.description = await writeDescription(p);
  return p;
}

function report(p) {
  const warn = [];
  if (!p.category) warn.push('category not recognised: set it in the admin after import');
  if (!p.devices.length) warn.push('no fitting phone recognised in the title');
  if (p.variants.some((v) => !v.models.length)) warn.push('an option has no phone: check the Crazy Parts title');
  if (p.price === null) warn.push('no price: pass --cost (or --price) before --apply');
  const out = p.variants.filter((v) => !v.inStock);
  if (out.length) warn.push(`${out.length} of ${p.variants.length} option(s) OUT OF STOCK at Crazy Parts`);
  console.log(`\n• ${p.name}`);
  console.log(`  From: ${p.supplierNames.join('  +  ')}`);
  console.log(`  Category: ${p.category || '?'} · brand ${p.manufacturer || '—'} · ${p.images.length} photos`);
  console.log(
    `  Price: ${
      p.priceFromRrp
        ? [...new Set(p.variants.map((v) => `$${Math.max(p.floor || 0, retailFromCost(v.rrp || 0, p.priceFromRrp))}`))].join(' / ') + ` (retail × ${p.priceFromRrp}${p.floor ? `, min $${p.floor}` : ''})`
        : p.price !== null
          ? `$${p.price}`
          : '—'
    }${
      p.cost !== null ? (p.price === retailFromCost(p.cost, opt.markup) ? ` (cost $${p.cost} × ${opt.markup})` : ` (set by hand; cost $${p.cost})`) : ''
    } · Crazy Parts retail ${[...new Set(p.variants.map((v) => (v.rrp ? `$${v.rrp}` : '—')))].join(' / ')}`
  );
  console.log(
    `  ${p.fulfilment === 'order-in' ? 'Ordered in when bought' : `At the kiosk, ${p.kioskStock ?? 1} of each`} · ${p.variants.length} option(s):`
  );
  for (const v of p.variants) {
    console.log(`    - ${v.models.join(' / ') || '?'}${v.colour ? ` · ${v.colour}` : ''}  [${v.sku}]${v.inStock ? '' : '  OUT OF STOCK'}`);
  }
  console.log(`  Description (${p.description.source}): ${p.description.text}`);
  for (const w of warn) console.log(`  ! ${w}`);
}

const brandOf = (devices) =>
  devices.some((d) => d.startsWith('iPhone') || d.startsWith('iPad'))
    ? 'Apple'
    : devices.some((d) => d.startsWith('Samsung'))
      ? 'Samsung'
      : devices.some((d) => d.startsWith('Google'))
        ? 'Google'
        : 'Generic';

async function save(p, db) {
  if (p.price === null) throw new Error('no price (use --cost or --price)');
  if (!p.category) throw new Error('category not recognised');
  const folder = slug(p.name).slice(0, 60);
  const uploadedByUrl = new Map();
  let n = 0;
  for (const src of p.images) {
    n++;
    process.stdout.write(`  uploading photo ${n}/${p.images.length}\r`);
    const stem = path.basename(src).replace(/\.[a-z0-9]+$/i, '').slice(0, 40);
    uploadedByUrl.set(src, await uploadImage(src, `products/${folder}/${stem}`));
  }
  const now = new Date();
  const kiosk = p.fulfilment === 'kiosk';
  const variants = p.variants.map((v) => ({
    sku: v.sku,
    gtin: v.gtin,
    models: v.models,
    colour: v.colour,
    // --from-rrp prices each option from its own retail price; otherwise one price for all
    price: Math.max(p.floor || 0, p.priceFromRrp && v.rrp ? retailFromCost(v.rrp, p.priceFromRrp) : p.price),
    costPrice: p.cost ?? undefined,
    ...(kiosk ? { stock: p.kioskStock ?? 1 } : {}),
    images: v.images.map((u) => uploadedByUrl.get(u)).filter(Boolean),
    supplier: { url: v.url, productId: v.productId, inStock: v.inStock, checkedAt: now },
  }));

  const products = db.collection('products');
  const skus = variants.map((v) => v.sku);
  const existing = await products.findOne(
    { $or: [{ 'variants.sku': { $in: skus } }, { sku: { $in: skus } }, { name: p.name, category: p.category }] },
    { projection: { _id: 1, variants: 1 } }
  );
  // Keep options from earlier imports that aren't in this one (e.g. the other size group).
  const kept = (existing?.variants || []).filter((v) => !skus.includes(v.sku));
  const allVariants = [...kept, ...variants];
  const devices = [...new Set(allVariants.flatMap((v) => v.models || []))];
  const images = [...new Set(allVariants.flatMap((v) => v.images || []))];
  const tags = typeTags(p.name, p.features);
  const anyAvailable = allVariants.some((v) => (kiosk ? (v.stock ?? 0) > 0 : v.supplier?.inStock !== false));

  const doc = {
    name: p.name,
    description: p.description.text,
    price: Math.min(...allVariants.map((v) => v.price)),
    imageUrl: images[0],
    images: images.slice(0, 24),
    category: p.category,
    stock: kiosk ? allVariants.reduce((t, v) => t + (v.stock ?? 0), 0) : anyAvailable ? 99 : 0,
    features: p.features,
    deviceCompatibility: devices,
    brand: brandOf(devices),
    ...tags,
    manufacturer: p.manufacturer || undefined,
    supplier: { name: 'Crazy Parts', url: p.urls[0], inStock: anyAvailable, checkedAt: now },
    fulfilment: p.fulfilment,
    variants: allVariants,
    sku: null,
    gtin: null,
    updatedAt: now,
  };
  if (existing) {
    await products.updateOne({ _id: existing._id }, { $set: doc, $unset: { costPrice: '' } });
    return { action: 'updated', id: String(existing._id) };
  }
  const r = await products.insertOne({ ...doc, mountTypes: [], chargerTypes: [], cableTypes: [], tags: [], specifications: {}, createdAt: now });
  return { action: 'created', id: String(r.insertedId) };
}

async function main() {
  // Each job is one design: all --capture files together, or one product per link/CSV row.
  const jobs = [];
  if (opt.dir) {
    // One job per design: pages whose titles reduce to the same design name.
    const files = fs.readdirSync(opt.dir).filter((f) => f.endsWith('.json')).sort();
    const groups = new Map();
    for (const f of files) {
      const c = readCapture(path.join(opt.dir, f));
      // Wholesale multi-packs (2 / 10 packs) aren't sold to walk-in customers.
      if (/\b\d+\s*packs?\b/i.test(String(c.name))) {
        console.log(`  skipped (multi-pack): ${c.name}`);
        continue;
      }
      const key = designName(String(c.name))
        .toLowerCase()
        .replace(/\bredefine\b/g, 'redefyne')
        .replace(/\bcase cover\b/g, 'case')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
      groups.set(key, [...(groups.get(key) || []), c]);
    }
    for (const [key, caps] of groups) jobs.push({ label: key, load: async () => caps, row: {} });
    if (opt.jobs) {
      const [a, b] = String(opt.jobs).split('-').map(Number);
      const keep = jobs.slice(a, (Number.isFinite(b) ? b : a) + 1);
      jobs.length = 0;
      jobs.push(...keep);
    }
  }
  if (opt.captures.length) {
    jobs.push({ label: opt.captures.join(' + '), load: async () => opt.captures.map(readCapture), row: {} });
  }
  const rows = opt.file ? readCsv(opt.file) : opt.urls.map((url) => ({ url }));
  for (const r of rows) {
    if (!/^https:\/\/(www\.)?crazyparts\.com\.au\/product\//.test(r.url)) die(`Not a Crazy Parts product URL: ${r.url}`);
    jobs.push({ label: r.url, load: async () => [await captureFromPage(r.url)], row: r });
  }
  if (!jobs.length) die('Give --capture file(s), a Crazy Parts product URL, or --file products.csv. Use --help for options.');

  console.log(`${opt.apply ? 'IMPORTING' : 'PREVIEW (nothing is saved; add --apply to import)'} · ${jobs.length} design(s) · markup ×${opt.markup}`);

  let db = null;
  let mongoose = null;
  if (opt.apply) {
    if (!process.env.MONGODB_URI) die('MONGODB_URI missing from .env.local / .env');
    mongoose = (await import('mongoose')).default;
    await mongoose.connect(process.env.MONGODB_URI);
    db = mongoose.connection.db;
  }

  let ok = 0;
  for (const job of jobs) {
    try {
      const p = await prepare(await job.load(), job.row);
      report(p);
      if (opt.apply) {
        const r = await save(p, db);
        console.log(`  ✓ ${r.action}: https://www.mobilearmour.com.au/products/${productSlug(p.name)}-${r.id}`);
      }
      ok++;
    } catch (e) {
      console.log(`\n✗ ${job.label}\n  ${e.message}`);
    }
    if (jobs.length > 1) await new Promise((r) => setTimeout(r, 800)); // be polite to the supplier's site
  }
  if (mongoose) await mongoose.disconnect();
  let note = '';
  if (opt.apply && ok) note = await refreshLiveSite();
  console.log(`\n${ok}/${jobs.length} done.${note}\n`);
}

/**
 * Ask the live site to drop its cached product pages so imports show straight
 * away. Needs REVALIDATE_SECRET in .env.local (the same value as on Vercel);
 * without it pages refresh within the hour.
 */
async function refreshLiveSite() {
  const secret = process.env.REVALIDATE_SECRET;
  const base = (process.env.REVALIDATE_URL || 'https://mobilearmour.com.au').replace(/\/$/, '');
  if (!secret) return ' Live pages refresh within the hour (set REVALIDATE_SECRET to refresh now).';
  try {
    const res = await fetch(`${base}/api/revalidate`, { method: 'POST', headers: { 'x-revalidate-secret': secret } });
    return res.ok ? ` Live site cache refreshed (${base}).` : ` Live refresh failed (HTTP ${res.status}); pages refresh within the hour.`;
  } catch (e) {
    return ` Live refresh failed (${e.message}); pages refresh within the hour.`;
  }
}

main().catch((e) => die(e.stack || e.message));
