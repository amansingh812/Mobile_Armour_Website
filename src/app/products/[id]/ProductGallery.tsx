'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0);
  const main = images[i] || images[0];
  return (
    <div className="ma-gallery">
      <div className="ma-gallery__main">
        {main && (
          <Image
            src={main}
            alt={i === 0 ? name : `${name}, view ${i + 1}`}
            fill
            priority
            sizes="(max-width: 960px) 100vw, 640px"
          />
        )}
      </div>
      {images.length > 1 && (
        <ul className="ma-gallery__thumbs" aria-label="Product photos">
          {images.map((src, idx) => (
            <li key={src}>
              <button
                type="button"
                aria-label={`Show photo ${idx + 1}`}
                aria-pressed={idx === i}
                onClick={() => setI(idx)}
                className={idx === i ? 'is-on' : undefined}
              >
                <Image src={src} alt="" fill sizes="80px" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
