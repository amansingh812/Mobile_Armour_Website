// Custom next/image loader.
// Product photos live on Cloudinary, so Cloudinary resizes them (right width,
// AVIF/WebP via f_auto, auto quality) instead of Vercel's image optimiser,
// whose free allowance ran out (402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED).
// Our own /img files are already compressed WebP and are served as they are.
'use client';

type LoaderArgs = { src: string; width: number; quality?: number };

const UPLOAD = '/image/upload/';

export default function imageLoader({ src, width, quality }: LoaderArgs): string {
  if (src.includes('res.cloudinary.com') && src.includes(UPLOAD)) {
    const q = quality ? `q_${quality}` : 'q_auto';
    return src.replace(UPLOAD, `${UPLOAD}f_auto,${q},c_limit,w_${width}/`);
  }
  // Local and other images: original file (the width param keeps next/image happy).
  return `${src}${src.includes('?') ? '&' : '?'}w=${width}`;
}
