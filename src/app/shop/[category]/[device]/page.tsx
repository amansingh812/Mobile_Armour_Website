import { glassPairDevice } from '@/lib/pricing';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShopListing from '@/components/shop/ShopListing';
import { getShopCategory } from '@/data/shop-categories';
import { getCategoryProducts, devicesWithPages } from '@/lib/shop-data';
import { availability, deviceListingCopy, fromPrice } from '@/lib/shop-copy';

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
  // Cases: "& Covers" matches how people search ("iphone 18 pro max back cover").
  const title =
    cat.slug === 'cases'
      ? `${deviceName} Cases & Covers | Mobile Armour Heidelberg`
      : `${deviceName} ${cat.shortName} Heidelberg | Mobile Armour`;
  const from = fromPrice(products);
  const description = `${products.length} ${deviceName} ${cat.shortName.toLowerCase()} ${availability(products)}${from ? `, from ${from}` : ''}. Click & collect or delivery.`;
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
    ...['iPhone 18', 'iPhone 18 Pro', 'iPhone 18 Pro Max', 'iPhone 17', 'iPhone 17 Pro', 'iPhone 17 Pro Max'].map((device) => ({
      title: 'Will iPhone 17 cases fit the iPhone 18?',
      href: '/blog/will-iphone-17-cases-fit-iphone-18',
      device,
    })),
    ...['iPhone 18', 'iPhone 18 Pro', 'iPhone 18 Pro Max', 'iPhone 17', 'iPhone 17 Pro', 'iPhone 17 Pro Max'].map((device) => ({
      title: `Do you need a screen protector on a new iPhone?`,
      href: '/blog/do-you-need-a-screen-protector-iphone-17',
      device,
    })),
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
      glassPairDevice={cat.slug === 'screen-protectors' ? glassPairDevice([deviceName]) : undefined}
    />
  );
}
