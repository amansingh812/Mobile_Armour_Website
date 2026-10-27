#!/usr/bin/env node
/**
 * Show or create the MongoDB indexes the products and orders collections need.
 *
 *   node scripts/db-indexes.mjs            # list current indexes + what's missing
 *   node scripts/db-indexes.mjs --apply    # create the missing ones (never drops any)
 *
 * In production Mongoose no longer builds indexes on every cold start
 * (autoIndex is off), so run this after adding an index to src/models/Product.ts.
 * Reads MONGODB_URI from .env.local / .env.
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
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing from .env.local / .env');
  process.exit(1);
}

// Keep in step with the schema in src/models/Product.ts.
const WANTED = [
  { key: { category: 1 } },
  { key: { deviceCompatibility: 1 } },
  { key: { brand: 1 } },
  { key: { tags: 1 } },
  { key: { sku: 1 } },
  { key: { 'variants.sku': 1 } },
  { key: { createdAt: -1 } },
  { key: { category: 1, brand: 1 } },
  { key: { category: 1, price: 1 } },
  { key: { category: 1, createdAt: -1 } },
  { key: { category: 1, deviceCompatibility: 1, createdAt: -1 } },
];

const apply = process.argv.includes('--apply');
const { default: mongoose } = await import('mongoose');
await mongoose.connect(process.env.MONGODB_URI);
const col = mongoose.connection.db.collection('products');

const sig = (key) => JSON.stringify(key);
const have = await col.indexes();
const haveSigs = new Set(have.map((i) => sig(i.key)));
console.log(`products: ${await col.estimatedDocumentCount()} documents, ${have.length} indexes`);
for (const i of have) console.log(`  ✓ ${i.name}  ${sig(i.key)}`);

const missing = WANTED.filter((w) => !haveSigs.has(sig(w.key)));
if (!missing.length) console.log('\nNothing missing.');
for (const w of missing) {
  if (apply) {
    const name = await col.createIndex(w.key, { background: true });
    console.log(`  + created ${name}`);
  } else {
    console.log(`  - missing ${sig(w.key)}`);
  }
}
if (missing.length && !apply) console.log('\nRun with --apply to create them.');

// Orders (src/models/Order.ts). Unique session index is what stops a retried
// Stripe webhook from saving the same order twice. Sparse: the one legacy order
// from 2025 has no session id.
const ORDER_WANTED = [
  { key: { stripeSessionId: 1 }, opts: { unique: true, sparse: true } },
  { key: { orderNumber: 1 }, opts: { unique: true, sparse: true } },
  { key: { status: 1 } },
  { key: { createdAt: -1 } },
];
const orders = mongoose.connection.db.collection('orders');
const haveOrders = new Set((await orders.indexes()).map((i) => sig(i.key)));
for (const w of ORDER_WANTED.filter((w) => !haveOrders.has(sig(w.key)))) {
  if (apply) console.log(`  + orders: created ${await orders.createIndex(w.key, w.opts || {})}`);
  else console.log(`  - orders: missing ${sig(w.key)}`);
}

// How the busiest queries run now.
const plan = async (label, cursor) => {
  const e = await cursor.explain('executionStats');
  const s = e.executionStats;
  const stage = JSON.stringify(e.queryPlanner.winningPlan).match(/"stage":"(IXSCAN|COLLSCAN)"/)?.[1] || '?';
  console.log(`  ${label}: ${stage}, ${s.totalDocsExamined} docs read, ${s.executionTimeMillis} ms`);
};
console.log('\nQuery plans:');
await plan('all products newest first', col.find({}).sort({ createdAt: -1 }));
await plan('one category', col.find({ category: 'Cases' }).sort({ createdAt: -1 }));
await plan('category + phone', col.find({ category: 'Cases', deviceCompatibility: 'iPhone 18 Pro' }).sort({ createdAt: -1 }));

await mongoose.disconnect();
