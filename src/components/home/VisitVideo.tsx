'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Muted, looping video that only loads once it scrolls near the screen
 * (keeps the homepage fast). Respects reduced motion: shows the poster with
 * controls instead of autoplaying.
 */
export default function VisitVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (load && el && !reduced) el.play().catch(() => {});
  }, [load, reduced]);

  return (
    <video
      ref={ref}
      className="ma-visit__video"
      poster={poster}
      muted
      loop
      playsInline
      controls={reduced}
      preload="none"
      aria-label={label}
      src={load ? src : undefined}
    />
  );
}
