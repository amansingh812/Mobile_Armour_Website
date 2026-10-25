/*
 * Crazy Parts product capture: run in the browser on a crazyparts.com.au product page
 * (paste into DevTools > Console, or save as a bookmark with "javascript:" in front).
 *
 * It copies one JSON object to the clipboard with the PUBLIC product details:
 * name, description, photos, and every colour option (SKU, barcode, retail
 * price, in stock yes/no). It never reads cost, trade or business prices.
 *
 * Save the clipboard as imports/<name>.json and run:
 *   npm run import:crazyparts -- --capture imports/<name>.json [--cost 12] [--apply]
 */
(() => {
  const ld = [...document.querySelectorAll('script[type="application/ld+json"]')]
    .map((s) => {
      try {
        return JSON.parse(s.textContent);
      } catch {
        return null;
      }
    })
    .flat()
    .find((x) => x && x['@type'] === 'Product');
  if (!ld) {
    console.warn('Mobile Armour capture: no product found on this page.');
    return 0;
  }

  // The page's own data stream holds the colour options.
  const flight = (self.__next_f || []).map((x) => x[1] || '').join('');
  let raw = [];
  const at = flight.indexOf('"variants":[');
  if (at >= 0) {
    const s = at + 11;
    let depth = 0;
    let e = s;
    let inStr = false;
    let esc = false;
    for (; e < flight.length; e++) {
      const c = flight[e];
      if (inStr) {
        if (esc) esc = false;
        else if (c === '\\') esc = true;
        else if (c === '"') inStr = false;
        continue;
      }
      if (c === '"') inStr = true;
      else if (c === '[' || c === '{') depth++;
      else if (c === ']' || c === '}') {
        depth--;
        if (depth === 0) {
          e++;
          break;
        }
      }
    }
    try {
      raw = JSON.parse(flight.slice(s, e));
    } catch {
      raw = [];
    }
  }

  const images = [];
  const idx = (url) => {
    const u = String(url).split('?')[0];
    let i = images.indexOf(u);
    if (i < 0) i = images.push(u) - 1;
    return i;
  };
  (Array.isArray(ld.image) ? ld.image : [ld.image]).filter(Boolean).forEach(idx);

  const variants = raw
    .filter((v) => v && v.is_active !== 0)
    .map((v) => {
      const colourAttr = (v.attributes || []).find((a) => /colou?r/i.test(a.code || a.name || ''));
      const branches = v.branch_inventory || [];
      return {
        sku: v.sku,
        gtin: v.upc || v.barcode || null,
        colour: (colourAttr && colourAttr.value) || String(v.title || '').replace(/^colou?r:\s*/i, '') || null,
        // Public retail price shown on the page (ex GST there), converted to inc GST.
        rrp: typeof v.retail_price_ex_tax === 'number' ? Math.round(v.retail_price_ex_tax * 110) / 100 : null,
        inStock: branches.some((b) => /^(mel|syd)$/.test(b.branch_code || '') && b.inventory > 0),
        img: (v.images || []).map((im) => idx(im.url)),
      };
    });

  const out = {
    source: 'crazyparts',
    url: location.origin + location.pathname,
    productId: (location.pathname.match(/-(\d+)$/) || [])[1] || null,
    name: ld.name,
    description: ld.description || '',
    rrp: Number(ld.offers && ld.offers.price) || null,
    inStock: /InStock/i.test((ld.offers && ld.offers.availability) || ''),
    sku: ld.sku || null,
    gtin: ld.gtin || null,
    images,
    variants,
    capturedAt: new Date().toISOString(),
  };
  const json = JSON.stringify(out);
  window.__maCapture = json;
  try {
    navigator.clipboard.writeText(json);
  } catch {}
  console.log(`Captured ${variants.length || 1} option(s), ${images.length} photos. JSON copied to the clipboard.`);
  return json.length;
})();
