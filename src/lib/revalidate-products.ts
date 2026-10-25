// Server-only. Call after any product write so cached pages and queries refresh
// straight away instead of waiting out the hourly revalidate.
import { revalidatePath, revalidateTag } from 'next/cache';
import { PRODUCTS_TAG } from '@/lib/shop-data';

export function revalidateProducts() {
  try {
    revalidateTag(PRODUCTS_TAG);
    // Pages that list products (home, shop, phones, product pages) are cached
    // HTML; refresh them too.
    revalidatePath('/', 'layout');
  } catch (err) {
    console.error('[revalidateProducts] failed:', err);
  }
}
