'use client';

import { useEffect, useState } from 'react';
import { BrandMark } from './BrandLoader';

// Once shown in this browser tab, client-side visits back to Home skip it.
let shownThisLoad = false;

/**
 * Brief Mobile Armour splash on the first Home visit of a session. It fades out
 * on its own via CSS (no waiting on data), never blocks clicks, and the inline
 * script hides it straight away on later full page loads in the same session.
 */
export default function HomeSplash() {
  const [on, setOn] = useState(() => !shownThisLoad);

  useEffect(() => {
    shownThisLoad = true;
    const t = setTimeout(() => setOn(false), 1400);
    return () => clearTimeout(t);
  }, []);

  if (!on) return null;
  return (
    <>
      <div id="ma-splash" className="ma-splash" aria-hidden="true" suppressHydrationWarning>
        <BrandMark size="lg" />
        <span className="ma-loader__word ma-loader__word--light">
          Mobile <b>Armour</b>
        </span>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html:
            "try{var s=document.getElementById('ma-splash');if(sessionStorage.getItem('ma-splash')){s&&(s.style.display='none')}else{sessionStorage.setItem('ma-splash','1')}}catch(e){}",
        }}
      />
    </>
  );
}
