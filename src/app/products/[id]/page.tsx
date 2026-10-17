import { notFound } from 'next/navigation';
import ProductView from './ProductView';
import { productIdFromParam } from '@/lib/products';
import { getProductById, getAllProducts } from '@/lib/shop-data';

interface Props {
  params: Promise<{ id: string }>;
}

// Re-check stock and prices at most once an hour.
export const revalidate = 3600;

// Server-rendered product page: name, price, description, compatibility and
// related products are all in the HTML Google and AI crawlers read.
// (Redirects from old id-only URLs happen in layout.tsx.)
export default async function ProductDetailPage({ params }: Props) {
  const { id: param } = await params;
  const id = productIdFromParam(param);
  if (!id) notFound();
  const product = await getProductById(id);
  if (!product) notFound();

  const all = await getAllProducts();
  const devices = product.deviceCompatibility || [];
  const related = all
    .filter((p) => p._id !== product._id && p.category !== product.category)
    .filter((p) => !devices.length || (p.deviceCompatibility || []).some((d) => devices.includes(d)))
    .slice(0, 4);
  const sameCategory = all
    .filter((p) => p._id !== product._id && p.category === product.category)
    .filter((p) => !devices.length || (p.deviceCompatibility || []).some((d) => devices.includes(d)))
    .slice(0, 4);

  return <ProductView product={product} related={related} alternatives={sameCategory} />;
}
