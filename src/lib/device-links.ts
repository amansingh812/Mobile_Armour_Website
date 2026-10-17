// Maps a phone model to its repair and accessories pages.
import { modelRepairPages } from '@/data/model-repair-pages';
import { slugify } from '@/lib/products';

export function repairLinkFor(device: string): { label: string; href: string } {
  const exact = modelRepairPages.find((m) => m.model.toLowerCase() === device.toLowerCase());
  if (exact) return { label: `${exact.model} repairs`, href: `/repairs/${exact.slug}` };
  const d = device.toLowerCase();
  if (d.startsWith('iphone')) return { label: 'iPhone screen repair', href: '/services/iphone-screen-repair' };
  if (d.includes('samsung')) return { label: 'Samsung repairs', href: '/services/samsung-repair' };
  if (d.includes('pixel')) return { label: 'Google Pixel repairs', href: '/services/google-pixel-repair' };
  if (d.startsWith('ipad')) return { label: 'iPad screen repair', href: '/services/ipad-screen-repair' };
  return { label: 'Phone repairs', href: '/services' };
}

/** /phones/{slug} hub path for a device. */
export function phonePath(device: string): string {
  return `/phones/${slugify(device)}`;
}
