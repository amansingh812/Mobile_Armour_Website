import Image from 'next/image';
import './loader.css';

/**
 * The Mobile Armour mark (phone + shield) with a spinning orange ring.
 * Pure CSS, so it shows the moment the HTML arrives, before any JavaScript.
 */
export function BrandMark({ size = 'md' }: { size?: 'md' | 'lg' }) {
  return (
    <span className={`ma-loader__mark ma-loader__mark--${size}`} aria-hidden="true">
      <span className="ma-loader__ring" />
      <Image src="/img/logo-mark.webp" alt="" width={40} height={63} priority className="ma-loader__logo" />
    </span>
  );
}

export default function BrandLoader({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="ma-loader" role="status" aria-live="polite">
      <BrandMark />
      <span className="ma-loader__word">
        Mobile <b>Armour</b>
      </span>
      <span className="ma-loader__label">{label}…</span>
    </div>
  );
}
