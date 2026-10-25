import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShopListing from '@/components/shop/ShopListing';
import { getShopCategory } from '@/data/shop-categories';
import { getCategoryProducts, devicesWithPages } from '@/lib/shop-data';
import { deviceListingCopy, fromPrice } from '@/lib/shop-copy';

export const revalidate = 3600;
// Device pages are created on demand from what is actually in stock.
export const dynamicParams = true;

interface Props {
  params: Promise<{ category: string; device: string }>;
}

export function generateStaticParams() {
  return [];
}

/** Resolves the category and device from the URL; null if either has no page. */
async function resolve(categorySlug: string, deviceSlug: string) {
  const cat = getShopCategory(categorySlug);
  if (!cat) return null;
  const all = await getCategoryProducts(cat.dbCategory);
  const match = devicesWithPages(all).find((d) => d.slug === deviceSlug);
  if (!match) return null;
  const products = all.filter((p) => p.deviceCompatibility?.includes(match.device));
  return { cat, device: match.device, products, siblings: devicesWithPages(all) };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, device } = await params;
  const r = await resolve(category, device);
  // notFound() here (before streaming starts) gives a real 404 status.
  if (!r) notFound();
  const { cat, device: deviceName, products } = r;
  const path = `/shop/${cat.slug}/${device}`;
  const title = `${deviceName} ${cat.shortName} Heidelberg | Mobile Armour`;
  const from = fromPrice(products);
  const description = `${products.length} ${deviceName} ${cat.shortName.toLowerCase()} in stock at Warringal Shopping Centre, Heidelberg${from ? `, from ${from}` : ''}. Try them in store, click & collect or delivery.`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: 'website',
      images: products[0]?.imageUrl ? [{ url: products[0].imageUrl, alt: `${deviceName} ${cat.shortName}` }] : undefined,
    },
  };
}

/** Guides linked from listing pages (device = only on that phone's page). */
const GUIDES: Record<string, { title: string; href: string; device?: string }[]> = {
  cases: [
    { title: 'Which iPhone 17 Pro Max case should you buy?', href: '/blog/which-iphone-17-pro-max-case', device: 'iPhone 17 Pro Max' },
  ],
  'screen-protectors': [
    { title: 'Privacy, clear or matte: which screen protector?', href: '/blog/privacy-vs-clear-vs-matte-screen-protector' },
  ],
};

export default async function ShopDevicePage({ params }: Props) {
  const { category, device } = await params;
  const r = await resolve(category, device);
  if (!r) notFound();
  const { cat, device: deviceName, products, siblings } = r;
  const copy = deviceListingCopy(cat.slug, deviceName, products);
  const guides = GUIDES[cat.slug]?.filter((g) => !g.device || g.device === deviceName) || [];

  return (
    <ShopListing
      h1={`${deviceName} ${cat.shortName}`}
      intro={copy.intro}
      faqs={copy.faqs}
      faqHeading={`${deviceName} ${cat.shortName.toLowerCase()}: questions`}
      guides={guides}
      products={products}
      path={`/shop/${cat.slug}/${device}`}
      breadcrumbs={[
        { name: 'Home', url: '/' },
        { name: 'Shop', url: '/products' },
        { name: cat.name, url: `/shop/${cat.slug}` },
        { name: deviceName },
      ]}
      phones={siblings.map((s) => ({
        device: s.device,
        href: `/shop/${cat.slug}/${s.slug}`,
        count: s.count,
        active: s.slug === device,
      }))}
      allPhonesHref={`/shop/${cat.slug}`}
      model={deviceName}
      buyingTips={cat.buyingTips}
      bundleDevice={cat.slug === 'cases' || cat.slug === 'screen-protectors' ? deviceName : undefined}
    />
  );
}
