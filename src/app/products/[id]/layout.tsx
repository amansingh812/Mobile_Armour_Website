import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { SITE_URL } from '@/lib/site';
import { productIdFromParam, productSegment, productPath, currentPrice } from '@/lib/products';
import { getProductById } from '@/lib/shop-data';
import { getShopCategoryByDb } from '@/data/shop-categories';

interface Props {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

function shortDescription(text: string, max = 150): string {
  const clean = (text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, clean.lastIndexOf(' ', max)).replace(/[,.;:]$/, '') + '…';
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: param } = await params;
  const id = productIdFromParam(param);
  // notFound() in metadata runs before streaming, so missing products get a real 404.
  if (!id) notFound();
  const p = await getProductById(id);
  if (!p) notFound();

  const price = currentPrice(p);
  const path = productPath(p);
  const title = `${p.name} | $${price} | Mobile Armour Heidelberg`;
  const description = `${shortDescription(p.description, 110)} $${price} AUD at Mobile Armour, Warringal Shopping Centre, Heidelberg.`;
  const image = p.imageUrl?.startsWith('http') ? p.imageUrl : p.imageUrl ? `${SITE_URL}${p.imageUrl}` : undefined;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${p.name} - Mobile Armour Heidelberg`,
      description,
      url: path,
      siteName: 'Mobile Armour',
      locale: 'en_AU',
      type: 'website',
      images: image ? [{ url: image, width: 800, height: 800, alt: p.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${p.name} - Mobile Armour`,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductDetailLayout({ params, children }: Props) {
  const { id: param } = await params;
  const id = productIdFromParam(param);
  const p = id ? await getProductById(id) : null;

  if (p) {
    // One URL per product: old /products/{id} links and outdated slugs 308 to the current one.
    const expected = productSegment(p);
    if (decodeURIComponent(param) !== expected) permanentRedirect(productPath(p));
  }

  if (!p) return <>{children}</>;

  const url = `${SITE_URL}${productPath(p)}`;
  const images = [p.imageUrl, ...(p.images || [])]
    .filter(Boolean)
    .map((src) => (src.startsWith('http') ? src : `${SITE_URL}${src}`));
  const inStock = typeof p.stock === 'number' ? p.stock > 0 : true;
  const shopCat = getShopCategoryByDb(p.category);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: Array.from(new Set(images)),
    sku: p._id,
    // No `brand`: Product.brand is the phone brand (e.g. Apple), not the accessory maker.
    category: p.category,
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'AUD',
      price: currentPrice(p).toFixed(2),
      itemCondition: 'https://schema.org/NewCondition',
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: { '@id': `${SITE_URL}/#business` },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/products` },
      ...(shopCat
        ? [{ '@type': 'ListItem', position: 3, name: shopCat.name, item: `${SITE_URL}/shop/${shopCat.slug}` }]
        : []),
      { '@type': 'ListItem', position: shopCat ? 4 : 3, name: p.name },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      {children}
    </>
  );
}
