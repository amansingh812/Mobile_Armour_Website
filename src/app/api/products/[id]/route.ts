import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import mongoose from 'mongoose';
import { isAdminRequest } from '@/lib/auth';
import { revalidateProducts } from '@/lib/revalidate-products';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
    }

    try {
        const product = await Product.findById(id).lean();
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!(await isAdminRequest())) return NextResponse.json({ error: 'Admin sign-in required' }, { status: 401 });
    await dbConnect();
    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
    }

    try {
        const result = await Product.findByIdAndDelete(id);
        if (!result) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        revalidateProducts();
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
