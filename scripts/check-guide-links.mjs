#!/usr/bin/env node
/**
 * Checks every product link in the blog guides against the live database:
 * missing products (404s), out-of-stock products, and outdated slugs (which
 * still work via a 308 redirect, but are better updated). Also lists products
 * that no guide links to or covers with its "Shop this guide" rule.
 *
 *   node scripts/check-guide-links.mjs
 *
 * Reads MONGODB_URI from .env.local / .env. Read-only.
 */
import fs from 'node:fs';

for (const f of ['.env.local', '.env']) {
  if (!fs.existsSync(f)) continue;
  for (const line of fs.readFileSync(f, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m || process.env[m[1]] !== undefined) continue;
    process.env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
  }
}

const FILES = ['src/data/blog-posts-2026-b.ts', 'src/data/blog-posts-2026.ts', 'src/data/blog-posts.tsx'];
const slugify = (t) =>
  t.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/&/g, ' and ').replace(/\+/g, ' plus ')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// Every product link, with the post it's in.
const links = [];
const coveredCategories = new Set();
for (const file of FILES) {
  const text = fs.readFileSync(file, 'utf8');
  const posts = text.split(/\n\s*slug: '/).slice(1);
  for (const chunk of posts) {
    const post = chunk.slice(0, chunk.indexOf("'"));
    for (const m of chunk.matchAll(/(?:\/products\/|\$\{P\})([a-z0-9-]*?)-?([a-f0-9]{24})\b/g)) {
      links.push({ post, slug: m[1], id: m[2] });
    }
    for (const m of chunk.matchAll(/categories: \[([^\]]*)\]/g)) {
      for (const c of m[1].matchAll(/'([^']+)'/g)) coveredCategories.add(c[1]);
    }
  }
}

const { default: mongoose } = await import('mongoose');
await mongoose.connect(process.env.MONGODB_URI);
const docs = await mongoose.connection.db
  .collection('products')
  .find({}, { projection: { name: 1, category: 1, stock: 1, fulfilment: 1, supplier: 1, variants: 1 } })
  .toArray();
await mongoose.disconnect();

const available = (d) => {
  const orderIn = d.fulfilment === 'order-in';
  if (Array.isArray(d.variants) && d.variants.length)
    return d.variants.some((v) => (orderIn ? v.supplier?.inStock !== false : (v.stock ?? 1) > 0));
  return orderIn ? d.supplier?.inStock !== false : (d.stock ?? 1) > 0;
};
const byId = new Map(docs.map((d) => [String(d._id), d]));

let problems = 0;
console.log(`${links.length} product links in ${FILES.length} files\n`);
for (const l of links) {
  const d = byId.get(l.id);
  if (!d) { problems++; console.log(`✗ MISSING   ${l.post}: ${l.slug}-${l.id}`); continue; }
  if (!available(d)) { problems++; console.log(`✗ OUT       ${l.post}: ${d.name}`); continue; }
  if (l.slug && l.slug !== slugify(d.name)) console.log(`~ OLD SLUG  ${l.post}: ${l.slug} → ${slugify(d.name)} (redirects)`);
}
console.log(problems ? `\n${problems} link(s) to fix.` : '\nAll guide product links are live and available.');

const linked = new Set(links.map((l) => l.id));
const uncovered = docs.filter((d) => available(d) && !linked.has(String(d._id)) && !coveredCategories.has(d.category));
const notNamed = docs.filter((d) => available(d) && !linked.has(String(d._id)));
console.log(`\nAvailable products: ${docs.filter(available).length}. Named in a guide: ${docs.filter((d) => available(d) && linked.has(String(d._id))).length}. Covered only by a guide's category row: ${notNamed.length - uncovered.length}.`);
if (uncovered.length) {
  console.log('Not covered by any guide:');
  for (const d of uncovered) console.log(`  - [${d.category}] ${d.name}`);
}
process.exit(problems ? 1 : 0);
