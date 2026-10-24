import type { Metadata } from 'next';
import ShopListing from '@/components/shop/ShopListing';
import { getAllProducts } from '@/lib/shop-data';
import { collectFaq, fromPrice, isPrivacy, seeFaq } from '@/lib/shop-copy';
import { BUSINESS } from '@/data/business';
import { OG_IMAGE } from '@/lib/seo';

export const revalidate = 3600;

const PATH = '/shop/screen-protectors/privacy';
const TITLE = 'Privacy Screen Protectors for iPhone | Mobile Armour Heidelberg';

export async function generateMetadata(): Promise<Metadata> {
  const products = (await getAllProducts()).filter(isPrivacy);
  const from = fromPrice(products);
  const description = `Privacy glass for iPhone 17, 17 Pro, 17 Pro Max and iPhone 16 models${
    from ? ` from ${from}` : ''
  }. Hides your screen from the side. In stock at Warringal Shopping Centre, Heidelberg.`;
  return {
    title: TITLE,
    description,
    alternates: { canonical: PATH },
    openGraph: { images: [OG_IMAGE], title: TITLE, description, url: PATH, siteName: BUSINESS.name, locale: 'en_AU', type: 'website' },
  };
}

export default async function PrivacyScreenProtectorsPage() {
  const products = (await getAllProducts()).filter(isPrivacy);
  const from = fromPrice(products);
  const devices = Array.from(new Set(products.flatMap((p) => p.deviceCompatibility || [])));

  return (
    <ShopListing
      h1="Privacy screen protectors"
      intro={[
        `Privacy glass darkens your screen when it's viewed from the side, so the person next to you on the train can't read your messages. Looking straight on, you see the screen as normal.`,
        `${products.length} in stock at ${BUSINESS.address.centre}, Heidelberg${from ? `, from ${from}` : ''}${
          devices.length ? `, for ${devices.slice(0, 4).join(', ')}${devices.length > 4 ? ' and more' : ''}` : ''
        }.`,
      ]}
      products={products}
      path={PATH}
      breadcrumbs={[
        { name: 'Home', url: '/' },
        { name: 'Shop', url: '/products' },
        { name: 'Screen protectors', url: '/shop/screen-protectors' },
        { name: 'Privacy' },
      ]}
      bundleDevice={null}
      faqHeading="Privacy screen protectors: questions"
      guides={[{ title: 'Privacy, clear or matte: which should you get?', href: '/blog/privacy-vs-clear-vs-matte-screen-protector' }]}
      faqs={[
        {
          id: 'how',
          q: 'How does a privacy screen protector work?',
          short: 'A fine micro-louvre layer in the glass only lets light through straight ahead, so the screen looks dark from the side.',
          more: 'Most block the view from roughly 30 degrees either side; the exact angle depends on the glass.',
        },
        {
          id: 'dimmer',
          q: 'Does privacy glass make the screen darker?',
          short: 'Slightly. Straight on, the screen looks a little dimmer than with clear glass.',
          more: 'Most people turn brightness up a notch. If you often read outdoors or share your screen, clear glass may suit you better.',
        },
        {
          id: 'faceid',
          q: 'Does Face ID still work with privacy glass?',
          short: 'Yes. The glass is cut around the front camera and Face ID sensors.',
          more: 'Make sure you buy the one made for your exact iPhone model so the cut-out lines up.',
        },
        seeFaq('see', 'privacy glass'),
        collectFaq('collect'),
      ]}
    />
  );
}
