import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShopListing from '@/components/shop/ShopListing';
import { getShopCategory } from '@/data/shop-categories';
import { getCategoryProducts, devicesWithPages } from '@/lib/shop-data';

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
  const description = `${products.length} ${deviceName} ${cat.shortName.toLowerCase()} in stock at Mobile Armour, Warringal Shopping Centre, Heidelberg. Buy online or try them in store.`;
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

export default async function ShopDevicePage({ params }: Props) {
  const { category, device } = await params;
  const r = await resolve(category, device);
  if (!r) notFound();
  const { cat, device: deviceName, products, siblings } = r;

  return (
    <ShopListing
      h1={`${deviceName} ${cat.shortName}`}
      intro={[
        `${deviceName} ${cat.shortName.toLowerCase()} available from Mobile Armour at Warringal Shopping Centre, Heidelberg. Each one below is listed as compatible with the ${deviceName}.`,
      ]}
      products={products}
      path={`/shop/${cat.slug}/${device}`}
      breadcrumbs={[
        { name: 'Home', url: '/' },
        { name: 'Shop', url: '/products' },
        { name: cat.name, url: `/shop/${cat.slug}` },
        { name: deviceName },
      ]}
      subLinksHeading={`Other models`}
      subLinks={siblings
        .filter((s) => s.slug !== device)
        .map((s) => ({
          label: `${s.device} ${cat.shortName.toLowerCase()}`,
          href: `/shop/${cat.slug}/${s.slug}`,
          count: s.count,
        }))}
      buyingTips={cat.buyingTips}
    />
  );
}
