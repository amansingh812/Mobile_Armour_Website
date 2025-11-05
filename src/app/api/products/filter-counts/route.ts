import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET(req: NextRequest) {
  await dbConnect();
  
  try {
    // Get all products to calculate counts
    const products = await Product.find({}, {
      deviceCompatibility: 1,
      brand: 1,
      accessoryTypes: 1,
      caseTypes: 1,
      chargerTypes: 1,
      mountTypes: 1,
      cableTypes: 1,
      screenProtectorTypes: 1,
      category: 1
    });

    // Initialize counters
    const filterCounts = {
      device: {} as Record<string, number>,
      brand: {} as Record<string, number>,
      accessory: {} as Record<string, number>,
      cases: {} as Record<string, number>,
      chargers: {} as Record<string, number>,
      mounts: {} as Record<string, number>,
      cables: {} as Record<string, number>,
      screenProtectors: {} as Record<string, number>
    };

    // Count occurrences
    products.forEach(product => {
      // Device compatibility counts
      if (product.deviceCompatibility) {
        product.deviceCompatibility.forEach((device: string) => {
          const deviceKey = device.toLowerCase().replace(/\s+/g, '-');
          filterCounts.device[deviceKey] = (filterCounts.device[deviceKey] || 0) + 1;
        });
      }

      // Brand counts
      if (product.brand) {
        const brandKey = product.brand.toLowerCase();
        filterCounts.brand[brandKey] = (filterCounts.brand[brandKey] || 0) + 1;
      }

      // Accessory types counts
      if (product.accessoryTypes) {
        product.accessoryTypes.forEach((type: string) => {
          const typeKey = type.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
          filterCounts.accessory[typeKey] = (filterCounts.accessory[typeKey] || 0) + 1;
        });
      }

      // Case types counts
      if (product.caseTypes) {
        product.caseTypes.forEach((type: string) => {
          const typeKey = type.toLowerCase().replace(/\s+/g, '-');
          filterCounts.cases[typeKey] = (filterCounts.cases[typeKey] || 0) + 1;
        });
      }

      // Charger types counts
      if (product.chargerTypes) {
        product.chargerTypes.forEach((type: string) => {
          const typeKey = type.toLowerCase().replace(/\s+/g, '-').replace(/\+/g, '');
          filterCounts.chargers[typeKey] = (filterCounts.chargers[typeKey] || 0) + 1;
        });
      }

      // Mount types counts
      if (product.mountTypes) {
        product.mountTypes.forEach((type: string) => {
          const typeKey = type.toLowerCase().replace(/\s+/g, '-');
          filterCounts.mounts[typeKey] = (filterCounts.mounts[typeKey] || 0) + 1;
        });
      }

      // Cable types counts
      if (product.cableTypes) {
        product.cableTypes.forEach((type: string) => {
          const typeKey = type.toLowerCase().replace(/\s+/g, '-');
          filterCounts.cables[typeKey] = (filterCounts.cables[typeKey] || 0) + 1;
        });
      }

      // Screen protector types counts
      if (product.screenProtectorTypes) {
        product.screenProtectorTypes.forEach((type: string) => {
          const typeKey = type.toLowerCase().replace(/\s+/g, '-');
          filterCounts.screenProtectors[typeKey] = (filterCounts.screenProtectors[typeKey] || 0) + 1;
        });
      }
    });

    return NextResponse.json(filterCounts, { status: 200 });
  } catch (error) {
    console.error('Filter counts API error:', error);
    return NextResponse.json({ error: 'Failed to fetch filter counts' }, { status: 500 });
  }
}
