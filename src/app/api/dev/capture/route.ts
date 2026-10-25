// DEVELOPMENT ONLY: receives Crazy Parts product captures from the browser
// (scripts/crazyparts-capture.js) and saves them in imports/ for the importer.
// Returns 404 in production, and only accepts requests from crazyparts.com.au.
import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

const ORIGIN = 'https://www.crazyparts.com.au';
const cors = {
  'Access-Control-Allow-Origin': ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Private-Network': 'true',
};
const disabled = () => process.env.NODE_ENV !== 'development';
const safe = (s: unknown, max = 60) =>
  String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, max);

export async function OPTIONS() {
  if (disabled()) return new NextResponse(null, { status: 404 });
  return new NextResponse(null, { status: 204, headers: cors });
}

export async function POST(req: NextRequest) {
  if (disabled()) return new NextResponse(null, { status: 404 });
  // From the supplier's page directly, or from our own /dev/capture inbox tab.
  const from = req.headers.get('origin') || '';
  if (from !== ORIGIN && from !== req.nextUrl.origin) return NextResponse.json({ error: 'origin' }, { status: 403 });
  const body = await req.json().catch(() => null);
  if (!body || body.source !== 'crazyparts' || typeof body.name !== 'string' || !Array.isArray(body.images)) {
    return NextResponse.json({ error: 'not a capture' }, { status: 400, headers: cors });
  }
  const folder = safe(body.folder || 'captures', 30) || 'captures';
  const dir = path.join(process.cwd(), 'imports', folder);
  await fs.mkdir(dir, { recursive: true });
  const file = `${safe(body.productId, 12) || 'x'}-${safe(body.name)}.json`;
  delete body.folder;
  await fs.writeFile(path.join(dir, file), JSON.stringify(body));
  return NextResponse.json({ ok: true, file: `imports/${folder}/${file}` }, { headers: cors });
}
