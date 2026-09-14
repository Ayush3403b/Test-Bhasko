import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import { Providers } from "@/components/providers/Providers";
import { JsonLd } from "@/components/SEO";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Bhasko — Your Solar. Calculated for You.",
    template: "%s | Bhasko Solar",
  },
  description:
    "Premium rooftop solar for homes and businesses. Bhasko calculates the exact solar system you need based on your electricity bill — not on what we want to sell.",
  keywords: [
    "solar panels India", "rooftop solar", "PM Surya Ghar", "solar calculator",
    "solar subsidy", "solar EMI", "solar Patna", "solar Bihar", "5 kW solar",
    "Bhasko solar", "best solar company",
  ],
  openGraph: {
    title: "Bhasko — Your Solar. Calculated for You.",
    description: "Premium rooftop solar, calculated for you.",
    siteName: "Bhasko",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F4F8EE",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bhasko",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  logo: "/logo.svg",
  description: "Premium technology-led rooftop solar platform in India.",
  sameAs: ["[INSTAGRAM]", "[LINKEDIN]"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "[PHONE]",
    contactType: "customer service",
    areaServed: "IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Birthstone&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <JsonLd data={orgJsonLd} />
      </head>
      <body className="min-h-full flex flex-col bg-[#F4F8EE] text-[#183029]">
        <Providers>
          <Navbar />
          <main className="flex-1 pt-20 lg:pt-24">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}
