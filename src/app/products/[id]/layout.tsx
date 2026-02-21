import { Metadata } from 'next';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import mongoose from 'mongoose';

const BASE_URL = 'https://www.mobilearmour.com.au';

interface Props {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  // Validate ObjectId
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return {
      title: 'Product Not Found | Mobile Armour',
      description: 'The product you are looking for could not be found.',
    };
  }

  try {
    await dbConnect();
    const product = await Product.findById(id).lean();

    if (!product) {
      return {
        title: 'Product Not Found | Mobile Armour',
        description: 'The product you are looking for could not be found.',
      };
    }

    const p = product as any;
    const productName = p.name || 'Product';
    const productDesc = p.description || '';
    const showPrice = p.newPrice && p.newPrice > 0 ? p.newPrice : p.price;
    const productImage = p.imageUrl || '';
    const category = p.category || '';

    // Build SEO-optimized title: "Product Name | Category | Mobile Armour Heidelberg"
    const title = `${productName} | ${category ? category + ' | ' : ''}Mobile Armour Heidelberg`;

    // Build rich description with location keywords
    const description = productDesc.length > 120
      ? `${productDesc.substring(0, 120)}... Available at Mobile Armour, Warringal Shopping Centre, Heidelberg VIC 3084. $${showPrice} AUD.`
      : `${productDesc} Available at Mobile Armour, Warringal Shopping Centre, Heidelberg VIC 3084. $${showPrice} AUD.`;

    const productUrl = `${BASE_URL}/products/${id}`;
    const imageUrl = productImage.startsWith('http') ? productImage : `${BASE_URL}${productImage}`;

    return {
      title,
      description,
      keywords: [
        `${productName.toLowerCase()}`,
        `${category.toLowerCase()} heidelberg`,
        `buy ${category.toLowerCase()} melbourne`,
        'mobile accessories heidelberg',
        'phone accessories warringal shopping centre',
        'mobile armour products',
      ],
      openGraph: {
        title: `${productName} - Mobile Armour Heidelberg`,
        description,
        url: productUrl,
        siteName: 'Mobile Armour',
        locale: 'en_AU',
        type: 'website',
        images: productImage
          ? [
              {
                url: imageUrl,
                width: 800,
                height: 800,
                alt: `${productName} - Available at Mobile Armour Heidelberg`,
              },
            ]
          : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${productName} - Mobile Armour`,
        description: description.substring(0, 200),
        images: productImage ? [imageUrl] : undefined,
      },
      alternates: {
        canonical: productUrl,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },
      },
    };
  } catch {
    return {
      title: 'Products | Mobile Armour Heidelberg',
      description: 'Browse mobile phone accessories and repair parts at Mobile Armour, Warringal Shopping Centre, Heidelberg.',
    };
  }
}

export default async function ProductDetailLayout({ params, children }: Props) {
  const { id } = await params;

  // Generate Product schema JSON-LD for SEO
  let productSchema = null;

  if (id && mongoose.Types.ObjectId.isValid(id)) {
    try {
      await dbConnect();
      const product = await Product.findById(id).lean();

      if (product) {
        const p = product as any;
        const showPrice = p.newPrice && p.newPrice > 0 ? p.newPrice : p.price;
        const inStock = typeof p.stock === 'number' ? p.stock > 0 : true;
        const imageUrl = p.imageUrl?.startsWith('http') ? p.imageUrl : `${BASE_URL}${p.imageUrl}`;

        productSchema = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: p.name,
          description: p.description,
          image: imageUrl,
          brand: {
            '@type': 'Brand',
            name: p.brand || 'Mobile Armour',
          },
          category: p.category,
          offers: {
            '@type': 'Offer',
            url: `${BASE_URL}/products/${id}`,
            priceCurrency: 'AUD',
            price: showPrice,
            availability: inStock
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
            seller: {
              '@type': 'LocalBusiness',
              name: 'Mobile Armour',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Warringal Shopping Centre',
                addressLocality: 'Heidelberg',
                addressRegion: 'VIC',
                postalCode: '3084',
                addressCountry: 'AU',
              },
            },
          },
        };
      }
    } catch {
      // Fail silently - page still renders without schema
    }
  }

  // BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: `${BASE_URL}/products`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Product Details',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      {children}
    </>
  );
}
