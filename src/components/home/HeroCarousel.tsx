'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

export interface HeroSlide {
  id: string;
  image: string;
  /** Short label on the thumbnail button. */
  thumb: string;
  /** Thumbnail picture, when it should differ from the slide photo. */
  thumbImage?: string;
  kicker: string;
  /** The first slide's title is the page's h1; the rest are h2. */
  title: ReactNode;
  lead: ReactNode;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  /** CSS object-position for the background photo. */
  focus?: string;
}

const INTERVAL = 7000;

/**
 * Homepage hero: full-bleed slides with thumbnail tabs underneath.
 * Always auto-advances every 7s (clicking a thumbnail restarts the timer).
 * Stops only for the pause button, a hidden tab or reduced motion; swipe on
 * touch screens.
 */
export default function HeroCarousel({ slides, footer }: { slides: HeroSlide[]; footer?: ReactNode }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef<number | null>(null);
  const n = slides.length;
  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    if (paused || reduced || n < 2) return;
    const t = setTimeout(() => {
      if (!document.hidden) go(i + 1);
    }, INTERVAL);
    return () => clearTimeout(t);
  }, [i, paused, reduced, n, go]);

  return (
    <section
      className="ma-hero-c"
      aria-roledescription="carousel"
      aria-label="Mobile Armour highlights"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? i + 1 : i - 1);
        touchX.current = null;
      }}
    >
      <div className="ma-hero-c__stage">
        {slides.map((s, k) => {
          const Title = k === 0 ? 'h1' : 'h2';
          const on = k === i;
          return (
            <div
              key={s.id}
              id={`hero-slide-${s.id}`}
              className={`ma-hero-c__slide${on ? ' is-on' : ''}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${k + 1} of ${n}`}
              aria-hidden={!on}
              inert={!on}
            >
              <Image
                src={s.image}
                alt=""
                fill
                priority={k === 0}
                loading={k === 0 ? undefined : 'lazy'}
                sizes="100vw"
                className="ma-hero-c__bg"
                style={s.focus ? { objectPosition: s.focus } : undefined}
              />
              <div className="ma-hero-c__inner">
                <p className="ma-home__kicker">{s.kicker}</p>
                <Title className="ma-hero-c__title">{s.title}</Title>
                <p className="ma-home__lead">{s.lead}</p>
                <div className="ma-actions">
                  <Link href={s.primary.href} className="ma-btn ma-btn--primary">
                    {s.primary.label}
                  </Link>
                  {s.secondary && (
                    <Link href={s.secondary.href} className="ma-btn ma-btn--ghost">
                      {s.secondary.label}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="ma-hero-c__bar">
        {footer}
        {n > 1 && (
          <div className="ma-hero-c__controls">
            {!reduced && (
              <button
                type="button"
                className="ma-hero-c__pause"
                onClick={() => setPaused((v) => !v)}
                aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
              >
                {paused ? (
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 4l13 8-13 8z" />
                  </svg>
                ) : (
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                  </svg>
                )}
              </button>
            )}
            <div className="ma-hero-c__thumbs" role="tablist" aria-label="Choose a slide">
              {slides.map((s, k) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={k === i}
                  aria-controls={`hero-slide-${s.id}`}
                  className={`ma-hero-c__thumb${k === i ? ' is-on' : ''}`}
                  onClick={() => go(k)}
                >
                  <span className="ma-hero-c__thumb-img">
                    <Image src={s.thumbImage || s.image} alt="" fill sizes="96px" priority={k === 0} />
                  </span>
                  <span className="ma-hero-c__thumb-label">{s.thumb}</span>
                  {k === i && !paused && !reduced && <span className="ma-hero-c__progress" key={`p${i}`} />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
