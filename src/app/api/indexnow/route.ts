import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

// IndexNow tells Bing (which feeds ChatGPT search and Copilot), Yandex and
// others that pages changed, so they re-crawl within minutes, not weeks.
//
// The key is public by design: IndexNow verifies it by fetching
// /<key>.txt from our own domain (public/37b276ce24ddacd0a3ba98ac65371766.txt).
//
// Usage (after adding or editing products/posts):
//   curl -X POST https://www.mobilearmour.com.au/api/indexnow \
//     -H "x-indexnow-secret: $INDEXNOW_SECRET" \
//     -H "content-type: application/json" \
//     -d '{"urls":["/products/...","/blog/..."]}'
// With no "urls", the main pages are submitted.

const KEY = process.env.INDEXNOW_KEY || "37b276ce24ddacd0a3ba98ac65371766";
const HOST = new URL(SITE_URL).host;

const DEFAULT_PATHS = ["/", "/services", "/faq", "/contact", "/products", "/pricing", "/blog"];

export async function POST(req: NextRequest) {
  const secret = process.env.INDEXNOW_SECRET;
  if (!secret || req.headers.get("x-indexnow-secret") !== secret) {
    return NextResponse.json({ ok: false, error: "unauthorised" }, { status: 401 });
  }

  let paths: string[] = DEFAULT_PATHS;
  try {
    const body = await req.json();
    if (Array.isArray(body?.urls) && body.urls.length) paths = body.urls;
  } catch {
    // empty body: use defaults
  }

  const urlList = paths
    .slice(0, 10000)
    .map((p) => (p.startsWith("http") ? p : `${SITE_URL}${p.startsWith("/") ? p : `/${p}`}`))
    .filter((u) => new URL(u).host === HOST);

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `${SITE_URL}/${KEY}.txt`,
      urlList,
    }),
  });

  return NextResponse.json({ ok: res.ok, status: res.status, submitted: urlList.length });
}
