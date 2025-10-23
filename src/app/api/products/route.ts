import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    
    let query = {};
    if (category) {
      query = { category: category };
    }
    
    const products = await Product.find(query);
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    // Sanitize optional prices: if admin leaves them blank, avoid saving 0
    if (body && (body.oldPrice === 0 || body.oldPrice === '0' || body.oldPrice === '' || body.oldPrice === null)) {
      delete body.oldPrice;
    }
    if (body && (body.newPrice === 0 || body.newPrice === '0' || body.newPrice === '' || body.newPrice === null)) {
      delete body.newPrice;
    }
    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Sanitize optional prices on update: do not persist 0 as a value
    if (updateData && (updateData.oldPrice === 0 || updateData.oldPrice === '0' || updateData.oldPrice === '' || updateData.oldPrice === null)) {
      delete (updateData as any).oldPrice;
    }
    if (updateData && (updateData.newPrice === 0 || updateData.newPrice === '0' || updateData.newPrice === '' || updateData.newPrice === null)) {
      delete (updateData as any).newPrice;
    }

    const product = await Product.findByIdAndUpdate(_id, updateData, { 
      new: true, 
      runValidators: true 
    });
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}