/*
 * Crazy Parts stock check: paste into the console on any crazyparts.com.au page
 * after running the line printed by `node scripts/stock-check.mjs --ids` (sets __MA_IDS, __MA_WATCH).
 * Reads only public product data (stock flags per option). Never logs in.
 * Result {_out, _back, _missing} (compact JSON) is left in window.__MA_STOCK and copied to the clipboard.
 */
(async () => {
  const ids = window.__MA_IDS || [];
  const out = {};
  const missing = [];
  const flightOf = (doc) => {
    let f = '';
    for (const s of doc.querySelectorAll('script:not([src])')) {
      const m = s.textContent.match(/^self\.__next_f\.push\((\[[\s\S]*\])\)$/);
      if (m) {
        try {
          const a = JSON.parse(m[1]);
          if (typeof a[1] === 'string') f += a[1];
        } catch {}
      }
    }
    return f;
  };
  const variantsOf = (flight) => {
    const at = flight.indexOf('"variants":[');
    if (at < 0) return [];
    const s = at + 11;
    let d = 0, e = s, inS = false, esc = false;
    for (; e < flight.length; e++) {
      const c = flight[e];
      if (inS) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === '"') inS = false; continue; }
      if (c === '"') inS = true;
      else if (c === '[' || c === '{') d++;
      else if (c === ']' || c === '}') { d--; if (d === 0) { e++; break; } }
    }
    try { return JSON.parse(flight.slice(s, e)); } catch { return []; }
  };
  const skipped = [];
  let blocked = false;
  for (const id of ids) {
    // Cloudflare: if it starts challenging, stop and report what was checked.
    // Never try to get past it; run the rest another time.
    if (blocked) { skipped.push(id); continue; }
    try {
      const r = await fetch(`/product/p-${id}`);
      if (r.status === 403 || r.status === 429 || r.status === 503) { blocked = true; skipped.push(id); continue; }
      const doc = new DOMParser().parseFromString(await r.text(), 'text/html');
      const ld = [...doc.querySelectorAll('script[type="application/ld+json"]')]
        .map((s) => { try { return JSON.parse(s.textContent); } catch { return null; } })
        .flat()
        .find((x) => x && x['@type'] === 'Product');
      if (!ld) { missing.push(id); continue; }
      const vs = variantsOf(flightOf(doc)).filter((v) => v && v.is_active !== 0);
      if (vs.length) {
        for (const v of vs) {
          if (!v.sku) continue;
          out[v.sku] = (v.branch_inventory || []).some((b) => /^(mel|syd)$/.test(b.branch_code || '') && b.inventory > 0);
        }
      } else if (ld.sku) {
        out[ld.sku] = /InStock/i.test(ld.offers?.availability || '');
      }
    } catch {
      missing.push(id);
    }
    await new Promise((res) => setTimeout(res, 4000)); // slow on purpose: about 15 pages a minute
  }
  const watch = new Set(window.__MA_WATCH || []);
  const compact = {
    _out: Object.keys(out).filter((k) => out[k] === false),
    _back: Object.keys(out).filter((k) => out[k] === true && watch.has(k)),
    _missing: missing,
    _skipped: skipped,
  };
  const json = JSON.stringify(compact);
  window.__MA_STOCK = json;
  try { await navigator.clipboard.writeText(json); } catch {}
  console.log(`Checked ${ids.length - skipped.length} of ${ids.length} pages, ${Object.keys(out).length} options, ${missing.length} not found${blocked ? ', stopped: Cloudflare check (run the rest later)' : ''}.`);
  return json.length;
})();
