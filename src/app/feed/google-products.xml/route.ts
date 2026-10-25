// Google Merchant Center product feed (RSS 2.0 + g: namespace).
// Add this URL in Merchant Center → Products → Feeds → "Scheduled fetch":
//   https://www.mobilearmour.com.au/feed/google-products.xml
// Shipping, returns and tax are set up in Merchant Center itself.

import { getAllProductsFull } from '@/lib/shop-data';
import { SITE_URL } from '@/lib/site';
import { productPath, currentPrice } from '@/lib/products';

export const revalidate = 3600;

// Google product taxonomy ids (https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt).
// 2353 = Mobile Phone Cases, 264 = Mobile Phone Accessories. Merchant Center
// can refine these automatically; check them there before going live.
const GOOGLE_CATEGORY: Record<string, string> = {
  Cases: '2353',
  'Screen Protectors': '264',
  'Cables & Adapters': '264',
  'Car Holders': '264',
  'Power Banks': '264',
};

function esc(text: string): string {
  return (text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function abs(src: string): string {
  return src.startsWith('http') ? src : `${SITE_URL}${src}`;
}

export async function GET() {
  const products = await getAllProductsFull();

  const items = products
    .filter((p) => p.imageUrl && p.price > 0)
    .map((p) => {
      const price = currentPrice(p);
      const hasSale = typeof p.oldPrice === 'number' && p.oldPrice > price;
      const inStock = typeof p.stock === 'number' ? p.stock > 0 : true;
      const extraImages = (p.images || []).filter((i) => i && i !== p.imageUrl).slice(0, 10);
      // Product.brand holds the PHONE brand (used by the shop filter), not the accessory
      // maker, so it must not be sent as g:brand. Add a manufacturer field later if needed.
      const brand = '';
      const gcat = GOOGLE_CATEGORY[p.category];
      return [
        '    <item>',
        `      <g:id>${esc(p._id)}</g:id>`,
        `      <g:title>${esc(p.name.slice(0, 150))}</g:title>`,
        `      <g:description>${esc(p.description.slice(0, 5000))}</g:description>`,
        `      <g:link>${esc(`${SITE_URL}${productPath(p)}`)}</g:link>`,
        `      <g:image_link>${esc(abs(p.imageUrl))}</g:image_link>`,
        ...extraImages.map((i) => `      <g:additional_image_link>${esc(abs(i))}</g:additional_image_link>`),
        `      <g:availability>${inStock ? 'in_stock' : 'out_of_stock'}</g:availability>`,
        hasSale
          ? `      <g:price>${p.oldPrice!.toFixed(2)} AUD</g:price>\n      <g:sale_price>${price.toFixed(2)} AUD</g:sale_price>`
          : `      <g:price>${price.toFixed(2)} AUD</g:price>`,
        '      <g:condition>new</g:condition>',
        brand ? `      <g:brand>${esc(brand)}</g:brand>` : '',
        '      <g:identifier_exists>no</g:identifier_exists>',
        `      <g:product_type>${esc(p.category)}</g:product_type>`,
        gcat ? `      <g:google_product_category>${gcat}</g:google_product_category>` : '',
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n');
    });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Mobile Armour</title>
    <link>${SITE_URL}</link>
    <description>Phone accessories from Mobile Armour, Warringal Shopping Centre, Heidelberg VIC</description>
${items.join('\n')}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
