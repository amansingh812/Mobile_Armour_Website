'use client';

import { useEffect, useRef } from 'react';
import { gaOut, track, type GaListItem } from '@/lib/analytics';

/**
 * GA4 view_item_list for a product list, and select_item when one of its
 * products is clicked. Renders an invisible marker; clicks are caught on its
 * parent element, so drop it inside the list's container.
 */
export default function ListTracker({ id, name, items }: { id: string; name: string; items: GaListItem[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!items.length) return;
    track('view_item_list', { item_list_id: id, item_list_name: name, items: items.map(gaOut) });
    const root = ref.current?.parentElement;
    if (!root) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href*="/products/"]') as HTMLAnchorElement | null;
      if (!a) return;
      const path = new URL(a.href, location.href).pathname;
      const item = items.find((i) => i.path === path);
      if (item) track('select_item', { item_list_id: id, item_list_name: name, items: [gaOut(item)] });
    };
    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return <span ref={ref} hidden />;
}
