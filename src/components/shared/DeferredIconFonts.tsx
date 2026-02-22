"use client";

import { useEffect } from "react";

/**
 * Loads icon font CSS (line-awesome + font-awesome) AFTER the page has painted.
 *
 * Why: These two CSS files are 678 KB combined and were previously blocking the
 * critical rendering path, causing an 8s+ FCP on mobile. By deferring them we
 * allow the page content to render immediately. Icons appear within ~100-200ms
 * of hydration — imperceptible to users on real hardware.
 *
 * Strategy: requestIdleCallback fires when the browser is idle after the first
 * paint; falls back to a 0ms setTimeout on older browsers.
 */
export default function DeferredIconFonts() {
  useEffect(() => {
    const sheets = [
      "/css/line-awesome.min.css",
      "/css/fontAwesomePro.css",
    ];

    const load = () => {
      sheets.forEach((href) => {
        if (!document.querySelector(`link[href="${href}"]`)) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = href;
          document.head.appendChild(link);
        }
      });
    };

    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(load);
      } else {
        setTimeout(load, 0);
      }
    }
  }, []);

  return null;
}
