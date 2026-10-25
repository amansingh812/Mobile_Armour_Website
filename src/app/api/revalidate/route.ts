import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/auth';
import { revalidateProducts } from '@/lib/revalidate-products';

/**
 * Refresh cached product data and pages. Used by the Crazy Parts importer after
 * it writes to the database (header x-revalidate-secret = REVALIDATE_SECRET),
 * or by a signed-in admin.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = req.headers.get('x-revalidate-secret');
  const ok = (secret && given && given === secret) || (await isAdminRequest());
  if (!ok) return NextResponse.json({ error: 'Not allowed' }, { status: 401 });
  revalidateProducts();
  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}
