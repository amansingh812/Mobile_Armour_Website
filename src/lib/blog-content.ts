// Helpers that turn a post's stored HTML into AEO-friendly output:
// heading anchors + table of contents, and FAQ pairs for FAQPage schema.

export interface TocItem {
  id: string;
  text: string;
}

const stripTags = (html: string) =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

/** Adds id="" to every <h2> and returns the table of contents. */
export function withHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (_m, attrs: string, inner: string) => {
    const text = stripTags(inner);
    let id = slug(text) || `section-${toc.length + 1}`;
    while (used.has(id)) id = `${id}-2`;
    used.add(id);
    toc.push({ id, text });
    return `<h2${attrs} id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}

/**
 * Finds "Q: ...?" <h3> headings followed by an answer <p> (the format our
 * posts use in their questions section) and returns them for FAQPage schema.
 */
export function extractFaqs(html: string): { q: string; a: string }[] {
  const faqs: { q: string; a: string }[] = [];
  const re = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const q = stripTags(m[1]).replace(/^Q:\s*/i, "");
    if (!/^Q:/i.test(stripTags(m[1])) || !q.endsWith("?")) continue;
    const a = stripTags(m[2]).replace(/^A:\s*/i, "");
    if (a) faqs.push({ q, a });
  }
  return faqs;
}

/** Plain text length in words, for reading time checks. */
export function wordCount(html: string): number {
  return stripTags(html).split(" ").filter(Boolean).length;
}
