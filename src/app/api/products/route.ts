import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { ALL_FILTER_OPTIONS } from '@/data/filterOptions';

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    
    // Build MongoDB query based on filters
    let query: any = {};
    
    // Legacy category filter
    if (category) {
      query.category = category;
    }
    
    // Advanced filters
    const deviceFilters = searchParams.get('device');
    const brandFilters = searchParams.get('brand');
    const accessoryFilters = searchParams.get('accessory');
    const casesFilters = searchParams.get('cases');
    const chargersFilters = searchParams.get('chargers');
    const mountsFilters = searchParams.get('mounts');
    const cablesFilters = searchParams.get('cables');
    const screenProtectorsFilters = searchParams.get('screenProtectors');
    
    // Map URL ids to exact DB values using central filter options
    const mapIdsToValues = (sectionId: keyof typeof ALL_FILTER_OPTIONS, ids: string) => {
      const idList = ids.split(',');
      const options = ALL_FILTER_OPTIONS[sectionId] as Array<{ id: string; value: string }>;
      const values = idList
        .map((id) => options.find((o) => o.id === id)?.value)
        .filter((v): v is string => Boolean(v));
      return values;
    };
    
    // Device compatibility filter
    if (deviceFilters) {
      const devices = mapIdsToValues('device', deviceFilters);
      if (devices.length) query.deviceCompatibility = { $in: devices };
    }
    
    // Brand filter
    if (brandFilters) {
      const brands = mapIdsToValues('brand', brandFilters);
      if (brands.length) query.brand = { $in: brands };
    }
    
    // Accessory type filters
    if (accessoryFilters) {
      const accessories = mapIdsToValues('accessory', accessoryFilters);
      if (accessories.length) query.accessoryTypes = { $in: accessories };
    }
    
    if (casesFilters) {
      const cases = mapIdsToValues('cases', casesFilters);
      if (cases.length) query.caseTypes = { $in: cases };
    }
    
    if (chargersFilters) {
      const chargers = mapIdsToValues('chargers', chargersFilters);
      if (chargers.length) query.chargerTypes = { $in: chargers };
    }
    
    if (mountsFilters) {
      const mounts = mapIdsToValues('mounts', mountsFilters);
      if (mounts.length) query.mountTypes = { $in: mounts };
    }
    
    if (cablesFilters) {
      const cables = mapIdsToValues('cables', cablesFilters);
      if (cables.length) query.cableTypes = { $in: cables };
    }
    
    if (screenProtectorsFilters) {
      const protectors = mapIdsToValues('screenProtectors', screenProtectorsFilters);
      if (protectors.length) query.screenProtectorTypes = { $in: protectors };
    }
    
    // Use .lean() for plain JS objects (skip Mongoose hydration = ~3x faster)
    // Select only fields needed for product listing (exclude heavy specs/descriptions for list view)
    const products = await Product.find(query)
      .lean()
      .sort({ createdAt: -1 });

    const response = NextResponse.json(products, { status: 200 });
    // Cache product listings for 60 seconds, stale-while-revalidate for 5 minutes
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return response;
  } catch (error) {
    console.error('Products API error:', error);
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
  } catch (error: any) {
    // Map Mongoose ValidationError to fieldErrors for client highlighting
    if (error?.name === 'ValidationError' && error?.errors) {
      const fieldErrors: Record<string, string> = {};
      Object.keys(error.errors).forEach((key) => {
        fieldErrors[key] = error.errors[key]?.message || 'Invalid value';
      });
      return NextResponse.json({ error: 'Validation failed', fieldErrors }, { status: 400 });
    }
    console.error('Create product error:', error);
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