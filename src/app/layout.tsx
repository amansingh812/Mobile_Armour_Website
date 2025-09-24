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
import ScrollToTop from "@/components/scroll-top/scroll-top";
import AuthProvider from "@/components/providers/AuthProvider";
import { CartProvider } from "@/hooks/useCart";

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
  title: "Mobile Armour",
  description: "Created by Aman",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dm_sans.className} ${audiowide.variable}`}>
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
            <ScrollToTop />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
