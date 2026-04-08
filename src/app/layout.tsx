import type { Metadata } from "next";
import { DM_Sans, Audiowide } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
// line-awesome.min.css and fontAwesomePro.css moved to public/css/ and loaded
// via DeferredIconFonts (non-blocking) to eliminate 678 KB render-blocking CSS
// Removed unused CSS bundles: animate.css, barfiller.css, flaticon.css
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import AuthProvider from "@/components/providers/AuthProvider";
import { CartProvider } from "@/hooks/useCart";
import ChatBot from "@/components/chatbot/ChatBot";
import Script from "next/script";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import DeferredIconFonts from "@/components/shared/DeferredIconFonts";

const dm_sans = DM_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--default-font",
});

const audiowide = Audiowide({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--audiowide-font",
});

export const metadata: Metadata = {
  title: "Mobile Phone Repair Heidelberg Melbourne | Mobile Armour - Same Day Service",
  description: "Expert smartphone repairs in Heidelberg VIC 3084, serving Melbourne's northern suburbs. iPhone, Samsung, iPad & Apple Watch repair. 6-month warranty • Same-day service • Certified technicians • 30-60 min repairs. Located at Warringal Shopping Centre. Call 0405-326-205 for free quote.",
  keywords: [
    "mobile phone repair heidelberg",
    "iphone repair heidelberg",
    "samsung repair heidelberg",
    "screen repair warringal shopping centre",
    "phone repair melbourne northern suburbs",
    "battery replacement heidelberg",
    "ipad repair heidelberg",
    "mobile armour heidelberg",
    "same day phone repair melbourne",
    "phone accessories heidelberg",
    "phone repair ivanhoe",
    "phone repair rosanna",
    "phone repair eaglemont",
    "phone repair bulleen",
    "phone repair templestowe",
    "phone repair greensborough",
    "phone repair preston",
    "phone repair bundoora",
    "apple watch repair melbourne",
    "mobile repair near me melbourne vic",
  ],
  authors: [{ name: "Mobile Armour" }],
  openGraph: {
    title: "Mobile Armour Heidelberg - Expert Mobile & iPad Repair",
    description: "Professional mobile repair services in Heidelberg. iPhone, iPad, LCD repair, battery replacement & more at Warringal Shopping Centre.",
    url: "https://www.mobilearmour.com.au",
    siteName: "Mobile Armour",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://www.mobilearmour.com.au/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mobile Armour - Expert Phone Repair Heidelberg Melbourne",
        type: "image/jpeg",
      },
    ],
  },
  alternates: {
    canonical: "https://www.mobilearmour.com.au",
    languages: {
      "en-AU": "https://www.mobilearmour.com.au",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Armour Heidelberg - Mobile & iPad Repair",
    description: "Expert mobile repair in Heidelberg. iPhone, iPad, LCD & battery replacement services.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: 'yes',
} as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || 'GTM-XXXXXXX';
  return (
    <html lang="en-AU">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/img/logo-22.png" />
        <meta name="theme-color" content="#1B3A5C" />
        <meta name="geo.region" content="AU-VIC" />
        <meta name="geo.placename" content="Heidelberg" />
        <meta name="geo.position" content="-37.7547;145.0603" />
        <meta name="ICBM" content="-37.7547, 145.0603" />
        {/* Preload the LCP hero image so the browser fetches it immediately */}
        <link
          rel="preload"
          as="image"
          href="/img/slider/newImages/slider6.webp"
          // @ts-expect-error fetchpriority is a valid HTML attribute not yet in TS types
          fetchpriority="high"
        />
        {/* Cloudinary CDN — used for product/service images */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="//res.cloudinary.com" />
        {/* Google Tag Manager — loaded afterInteractive but prefetch speeds it up */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
      </head>
      {/* Google Tag Manager */}
      <Script id="gtm-base" strategy="afterInteractive">{`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `}</Script>
      <body className={`${dm_sans.className} ${audiowide.variable}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <LocalBusinessSchema />
        {/* Defers 678 KB of icon CSS (line-awesome + font-awesome) off critical path */}
        <DeferredIconFonts />
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
            <ChatBot />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
