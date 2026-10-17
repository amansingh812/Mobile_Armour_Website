import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShopListing from '@/components/shop/ShopListing';
import { SHOP_CATEGORIES, getShopCategory } from '@/data/shop-categories';
import { getCategoryProducts, devicesWithPages } from '@/lib/shop-data';

// Re-check the database at most once an hour, so new stock shows up without a redeploy.
export const revalidate = 3600;

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return SHOP_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const cat = getShopCategory(slug);
  if (!cat) notFound();
  const products = await getCategoryProducts(cat.dbCategory);
  const path = `/shop/${cat.slug}`;
  return {
    title: cat.title,
    description: cat.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: cat.title,
      description: cat.metaDescription,
      url: path,
      type: 'website',
      images: products[0]?.imageUrl ? [{ url: products[0].imageUrl, alt: cat.name }] : undefined,
    },
    // An empty category is a thin page: keep it out of Google until stock arrives.
    robots: products.length === 0 ? { index: false, follow: true } : undefined,
  };
}

export default async function ShopCategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const cat = getShopCategory(slug);
  if (!cat) notFound();

  const products = await getCategoryProducts(cat.dbCategory);
  const devices = devicesWithPages(products);

  return (
    <ShopListing
      h1={cat.name}
      intro={cat.intro}
      products={products}
      path={`/shop/${cat.slug}`}
      breadcrumbs={[
        { name: 'Home', url: '/' },
        { name: 'Shop', url: '/products' },
        { name: cat.name },
      ]}
      subLinksHeading="Phone model"
      subLinks={devices.map((d) => ({
        label: d.device,
        href: `/shop/${cat.slug}/${d.slug}`,
        count: d.count,
      }))}
      buyingTips={cat.buyingTips}
      bundleDevice={cat.slug === 'cases' || cat.slug === 'screen-protectors' ? null : undefined}
    />
  );
}
