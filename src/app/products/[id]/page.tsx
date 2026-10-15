import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import { productIdFromParam } from '@/lib/products';
import { getProductById } from '@/lib/shop-data';

interface Props {
  params: Promise<{ id: string }>;
}

// Server wrapper: fetches the product so its name, price and description are in
// the HTML Google crawls, then hands it to the interactive client component.
// (Redirects from old id-only URLs happen in layout.tsx.)
export default async function ProductDetailPage({ params }: Props) {
  const { id: param } = await params;
  const id = productIdFromParam(param);
  if (!id) notFound();
  const product = await getProductById(id);
  if (!product) notFound();
  return <ProductDetailClient productId={id} initialProduct={product} />;
}
