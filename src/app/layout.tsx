import type { Metadata } from "next";
import { DM_Sans, Audiowide } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/line-awesome.min.css";
import "./assets/css/fontAwesomePro.css";
import "./assets/css/animate.css";
import "./assets/css/barfiller.css";
import "./assets/css/flaticon.css";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import AuthProvider from "@/components/providers/AuthProvider";
import { CartProvider } from "@/hooks/useCart";
import ChatBot from "@/components/chatbot/ChatBot";
import Script from "next/script";
import { Analytics } from '@vercel/analytics/react';

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
  title: "Mobile Armour Heidelberg | Mobile Repair, iPad Repair & Battery Replacement",
  description: "Expert mobile repair in Heidelberg. Specializing in iPhone & iPad repair, LCD screen replacement, battery replacement, and phone accessories. Located at Warringal Shopping Centre. Fast, reliable service.",
  keywords: [
    "mobile repair heidelberg",
    "ipad repair heidelberg",
    "lcd repair heidelberg",
    "battery replacement heidelberg",
    "phone store heidelberg",
    "iphone repair heidelberg",
    "screen repair heidelberg",
    "phone repair warringal shopping centre",
    "mobile phone repair near me",
    "heidelberg phone repair",
  ],
  authors: [{ name: "Mobile Armour" }],
  openGraph: {
    title: "Mobile Armour Heidelberg - Expert Mobile & iPad Repair",
    description: "Professional mobile repair services in Heidelberg. iPhone, iPad, LCD repair, battery replacement & more at Warringal Shopping Centre.",
    url: "https://mobilearmour.com.au",
    siteName: "Mobile Armour",
    locale: "en_AU",
    type: "website",
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
  maximumScale: 1,
  userScalable: 'no',
} as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const GOOGLE_TAG_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
  const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || 'GTM-XXXXXXX';
  return (
    <html lang="en">
      {/* Google Tag Manager */}
      <Script id="gtm-base" strategy="afterInteractive">{`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `}</Script>
      {/* Google Analytics (gtag.js - GA4) temporarily disabled
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
      />
      <Script id="google-analytics-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GOOGLE_TAG_ID}');
      `}</Script>
      */}
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
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
            <ChatBot />
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
