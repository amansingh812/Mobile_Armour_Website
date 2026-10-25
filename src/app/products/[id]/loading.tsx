import BrandLoader from '@/components/site/loader/BrandLoader';

// Shown straight away when a product is clicked, until its page is ready.
export default function Loading() {
  return <BrandLoader label="Loading product" />;
}
