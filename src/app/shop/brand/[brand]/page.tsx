import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShopListing from '@/components/shop/ShopListing';
import { getAllProducts, type ShopProduct } from '@/lib/shop-data';
import { collectFaq, fromPrice, isMagnetic, isPrivacy, listParts, seeFaq } from '@/lib/shop-copy';
import { BUSINESS } from '@/data/business';
import { OG_IMAGE } from '@/lib/seo';
import { BRANDS } from '@/data/brands';

export const revalidate = 3600;
export const dynamicParams = false;

interface Props {
  params: Promise<{ brand: string }>;
}

export function generateStaticParams() {
  return Object.keys(BRANDS).map((brand) => ({ brand }));
}

async function load(slug: string) {
  const b = BRANDS[slug];
  if (!b) return null;
  const products = (await getAllProducts()).filter((p) => b.match.test(p.name));
  return { b, products };
}

function summary(products: ShopProduct[]) {
  const cat = (c: string) => products.filter((p) => p.category === c).length;
  return listParts([
    [cat('Cases'), 'cases'],
    [cat('Screen Protectors'), 'screen and lens protectors'],
    [cat('Cables & Adapters'), 'chargers and cables'],
    [cat('Car Holders'), 'car accessories'],
    [cat('Power Banks'), 'power banks'],
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = await load((await params).brand);
  if (!r) notFound();
  const { b, products } = r;
  const from = fromPrice(products);
  const title = `${b.name} ${b.what.replace(/^./, (c) => c.toUpperCase())} Heidelberg | Mobile Armour`;
  const description = `${products.length} ${b.name} ${b.what} in stock at Warringal Shopping Centre, Heidelberg${
    from ? `, from ${from}` : ''
  }. See them in store, click & collect or delivery.`;
  const path = `/shop/brand/${(await params).brand}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { images: [OG_IMAGE], title, description, url: path, siteName: BUSINESS.name, locale: 'en_AU', type: 'website' },
  };
}

export default async function BrandPage({ params }: Props) {
  const slug = (await params).brand;
  const r = await load(slug);
  if (!r) notFound();
  const { b, products } = r;
  const from = fromPrice(products);
  const devices = Array.from(new Set(products.flatMap((p) => p.deviceCompatibility || [])));
  const parts = summary(products);
  const mag = products.filter(isMagnetic).length;
  const priv = products.filter(isPrivacy).length;
  const extra = [mag ? `${mag} magnetic for MagSafe` : '', priv ? `${priv} privacy glass` : ''].filter(Boolean).join(', ');

  return (
    <ShopListing
      h1={`${b.name} ${b.what}`}
      intro={[
        `We stock ${products.length} ${b.name} products at ${BUSINESS.address.centre}, Heidelberg${from ? `, from ${from}` : ''}${
          parts ? `: ${parts}` : ''
        }${extra ? ` (${extra})` : ''}.`,
        devices.length
          ? `Made for ${devices.slice(0, 5).join(', ')}${devices.length > 5 ? ' and more' : ''}. Each product page lists the exact models it fits.`
          : 'Each product page lists the phones it works with.',
      ]}
      products={products}
      path={`/shop/brand/${slug}`}
      breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Shop', url: '/products' }, { name: b.name }]}
      bundleDevice={null}
      faqHeading={`${b.name}: questions`}
      guides={b.guide ? [b.guide] : undefined}
      faqs={[
        {
          id: 'stock',
          q: `Where can I buy ${b.name} ${b.what} in Melbourne?`,
          short: `At Mobile Armour, ${BUSINESS.address.unit}, ${BUSINESS.address.centre}, Heidelberg, or online here.`,
          more: `Everything on this page was in stock when the page last updated; call ${BUSINESS.phoneDisplay} to check a specific item.`,
        },
        seeFaq('see', `${b.name} range`),
        collectFaq('collect'),
      ]}
    />
  );
}
