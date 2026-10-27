#!/usr/bin/env node
/**
 * Weekly Crazy Parts stock check for order-in products.
 *
 * Crazy Parts sits behind Cloudflare, so the checking runs in a real browser:
 *
 *   1. node scripts/stock-check.mjs --ids
 *        prints the Crazy Parts product ids to check, as a JS array.
 *   2. On any crazyparts.com.au page, run scripts/crazyparts-stock.js in the
 *      console with that array as window.__MA_IDS. It returns compact JSON:
 *        {_out: [skus out of stock], _back: [skus back in], _missing: [ids gone], _skipped: [ids not checked]}
 *   3. node scripts/stock-check.mjs --apply '<that JSON>'      (preview)
 *      node scripts/stock-check.mjs --apply '<that JSON>' --write
 *        updates each option's supplier stock and refreshes the live site.
 *
 * Only stock flags change. Prices, names and copy are never touched here;
 * retail price changes are reported for a person to decide.
 * Reads MONGODB_URI (and REVALIDATE_SECRET for the live refresh) from .env.local / .env.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
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
const has = (f) => argv.includes(f);
const val = (f) => (argv.includes(f) ? argv[argv.indexOf(f) + 1] : undefined);

await mongoose.connect(process.env.MONGODB_URI);
const products = mongoose.connection.db.collection('products');
const orderIn = await products
  .find({ fulfilment: 'order-in' }, { projection: { name: 1, supplier: 1, variants: 1, price: 1 } })
  .toArray();

const sourceId = (s) => s?.productId || (String(s?.url || '').match(/-(\d+)$/) || [])[1] || null;

if (has('--ids')) {
  const ids = new Set();
  for (const p of orderIn) {
    for (const v of p.variants || []) {
      const id = sourceId(v.supplier);
      if (id) ids.add(id);
    }
    const id = sourceId(p.supplier);
    if (id) ids.add(id);
  }
  // Options we currently show as out: the browser reports any that are back.
  const watch = orderIn.flatMap((p) => (p.variants || []).filter((v) => v.supplier?.inStock === false).map((v) => v.sku));
  console.log(`window.__MA_IDS=${JSON.stringify([...ids].map(Number))};window.__MA_WATCH=${JSON.stringify(watch)};`);
  console.error(`${ids.size} Crazy Parts pages to check (${orderIn.length} order-in products), ${watch.length} options currently out`);
  process.exit(0);
}

if (has('--apply')) {
  let raw = val('--apply');
  if (raw && fs.existsSync(raw)) raw = fs.readFileSync(raw, 'utf8');
  // Compact browser result: {_out: [skus out of stock], _back: [watched skus now in stock], _missing: [ids]}
  const result = JSON.parse(raw || '{}');
  const missing = new Set((result._missing || []).map(String));
  const skipped = new Set((result._skipped || []).map(String)); // not checked this run: leave alone
  for (const sku of result._out || []) result[sku] = false;
  for (const sku of result._back || []) result[sku] = true;
  const now = new Date();
  const changes = [];
  const gone = [];
  for (const p of orderIn) {
    const set = {};
    const vs = p.variants || [];
    vs.forEach((v, i) => {
      if (skipped.has(String(sourceId(v.supplier)))) return;
      if (!(v.sku in result) && Array.isArray(result._out) && !missing.has(String(sourceId(v.supplier))) && v.supplier?.inStock !== false) {
        // compact result: not listed as out, and was already in stock -> still in stock
        set[`variants.${i}.supplier.checkedAt`] = now;
        return;
      }
      if (!(v.sku in result)) {
        if (missing.has(String(sourceId(v.supplier)))) gone.push(`${p.name} · ${v.colour || v.sku}`);
        return;
      }
      const inStock = !!result[v.sku];
      set[`variants.${i}.supplier.checkedAt`] = now;
      if ((v.supplier?.inStock !== false) !== inStock) {
        set[`variants.${i}.supplier.inStock`] = inStock;
        changes.push(`${inStock ? 'BACK IN ' : 'OUT     '} ${p.name} · ${v.colour || v.sku}`);
      }
    });
    if (vs.length && !vs.every((v) => skipped.has(String(sourceId(v.supplier))))) {
      // Product-level flag: available while any option is.
      const any = vs.some((v) => (v.sku in result ? !!result[v.sku] : v.supplier?.inStock !== false));
      set['supplier.inStock'] = any;
      set['supplier.checkedAt'] = now;
    }
    if (Object.keys(set).length && has('--write')) await products.updateOne({ _id: p._id }, { $set: set });
  }
  if (skipped.size) console.log(`${skipped.size} Crazy Parts pages were not checked this run (left as they were).`);
  console.log(changes.length ? changes.join('\n') : 'No stock changes.');
  if (gone.length) console.log(`\nNot found on Crazy Parts (removed or renamed? check by hand):\n${gone.join('\n')}`);
  if (Array.isArray(result._price)) {
    console.log(`\nCrazy Parts retail price changed (not applied):\n${result._price.join('\n')}`);
  }
  if (!has('--write')) console.log('\nPREVIEW only. Add --write to save.');
  else if (changes.length) {
    const site = process.env.NEXT_PUBLIC_APP_URL || 'https://www.mobilearmour.com.au';
    const r = await fetch(`${site}/api/revalidate`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-revalidate-secret': process.env.REVALIDATE_SECRET || '' },
      body: '{}',
    }).catch(() => null);
    console.log(r && r.ok ? 'Live site refreshed.' : 'Saved. Live site updates within the hour (set REVALIDATE_SECRET to refresh now).');
  }
  process.exit(0);
}

console.log('Usage: node scripts/stock-check.mjs --ids | --apply <json|file> [--write]');
process.exit(0);
