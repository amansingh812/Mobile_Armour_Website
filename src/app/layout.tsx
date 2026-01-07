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
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";

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
  title: "Mobile Phone Repair Heidelberg | Mobile Armour - Same Day Service",
  description: "Expert smartphone repairs in Heidelberg VIC. iPhone, Samsung & all major brands. 6-month warranty • Same-day service • Certified technicians • 30-60 min repairs. Located at Warringal Shopping Centre. Call 0405-326-205 for free quote.",
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
    "mobile repair",
    "screen fix",
    "quick repair",
    "lcd cracked",
    "iphone repair",
    "samsung repair",
    "iphone 14 repair",
    "iphone 14 pro repair",
    "iphone 13 repair",
    "iphone 11 repair",
    "samsung s23 ultra repair",
    "iphone 13 pro repair",
    "samsung s23 repair",
    "iphone 14 plus repair",
    "samsung s22 repair",
    "samsung galaxy s23 ultra repair",
    "samsung s22 ultra repair",
    "iphone 13 mini repair",
    "apple watch series 8 repair",
    "apple watch ultra repair",
    "iphone se repair",
    "samsung galaxy s22 repair",
    "samsung galaxy s23 repair",
    "iphone xr repair",
    "iphone 15 repair",
    "galaxy z flip 4 repair",
    "samsung fold 4 repair",
    "samsung a53 repair",
    "samsung tablet repair",
    "galaxy watch 5 repair",
    "samsung phone repair",
    "iphone 11 pro repair",
    "apple watch 8 repair",
    "apple watch series 7 repair",
    "samsung z flip 4 repair",
    "iphone se 2022 repair",
    "samsung a13 repair",
    "samsung s21 repair",
    "samsung z fold 4 repair",
    "iphone x repair",
    "samsung a54 repair",
    "samsung watch 5 repair",
    "samsung galaxy watch 5 repair",
    "iphone 8 repair",
    "iphone 14 price",
    "samsung s20 repair",
    "apple watch 7 repair",
    "samsung flip repair",
    "samsung galaxy z fold 4 repair",
    "samsung s23 plus repair",
    "iphone se 2020 repair",
    "samsung s22 plus repair",
    "samsung s21 fe repair",
    "samsung galaxy watch repair",
    "iphone xs repair",
    "samsung galaxy a53 repair",
    "galaxy watch 4 repair",
    "galaxy watch 5 pro repair",
    "samsung galaxy s21 repair",
    "samsung galaxy a13 repair",
    "samsung a53 5g repair",
    "samsung fold repair",
    "samsung a23 repair",
    "samsung s20 fe repair",
    "samsung smartwatch repair",
    "samsung a14 repair",
    "samsung a33 repair",
    "galaxy flip 4 repair",
    "iphone 10 repair",
    "samsung flip 5 repair",
    "iphone 14 pro 256gb repair",
    "samsung s21 ultra repair",
    "samsung a32 repair",
    "samsung a52 repair",
    "samsung watch 5 pro repair",
    "samsung galaxy fold 4 repair",
    "samsung washing machine repair",
    "samsung galaxy s20 repair",
    "iphone 7 repair",
    "samsung watch 4 repair",
    "galaxy a53 repair",
    "samsung galaxy watch 5 pro repair",
    "apple watch series 6 repair",
    "iphone 13 deals",
    "new samsung phone",
    "galaxy tab s8 repair",
    "samsung fold 5 repair",
    "galaxy buds repair",
    "galaxy buds 2 pro repair",
    "samsung galaxy s22 plus repair",
    "samsung a54 5g repair",
    "samsung galaxy a54 repair",
    "samsung a34 repair",
    "samsung tab s8 repair",
    "samsung galaxy flip 4 repair",
    "samsung galaxy s21 fe repair",
    "samsung a14 5g repair",
    "samsung galaxy s21 ultra repair",
    "iphone 13 price",
    "samsung a73 repair",
    "galaxy a13 repair",
    "new iphone 14",
    "iphone mini repair",
    "samsung s23 ultra price",
    "galaxy z flip repair",
    "samsung a33 5g repair",
    "iphone 14 promax repair",
    "samsung s10 repair",
    "samsung buds repair",
    "iphone 14 mini repair",
    "samsung note 20 ultra repair",
    "z flip 5 repair",
    "s20 fe 5g repair",
    "samsung galaxy s20 fe repair",
    "iphone 13 pro 256gb repair",
    "note 20 ultra repair",
    "samsung z flip 3 repair",
    "samsung z flip 5 repair",
    "samsung galaxy a14 repair",
    "galaxy phones",
    "apple ultra watch repair",
    "samsung s20 fe 5g repair",
    "z flip repair",
    "flip 4 repair",
    "galaxy a53 5g repair",
    "samsung a22 repair",
    "z fold 5 repair",
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
      </body>
    </html>
  );
}
