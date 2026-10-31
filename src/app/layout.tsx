import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { business } from "@/config/business";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppPill } from "@/components/layout/WhatsAppPill";
import { jsonLdString, legalServiceSchema } from "@/lib/schema";
import { kebab, siteUrl } from "@/lib/utils";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// business.colors -> :root { --brand-navy: …; } (Tailwind maps these in globals.css)
const brandColorVars = `:root{${Object.entries(business.colors)
  .map(([name, value]) => `--brand-${kebab(name)}:${value};`)
  .join("")}}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} | ${business.tagline}`,
    template: `%s | ${business.name}`,
  },
  description: `${business.strapline} ${business.pillars.join(" ")}`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: business.name,
    title: business.name,
    description: business.tagline,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: `${business.name} logo` }],
  },
  twitter: { card: "summary_large_image", images: ["/images/og-image.jpg"] },
};

export const viewport: Viewport = {
  themeColor: business.colors.navy,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-KE" className={`${display.variable} ${sans.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: brandColorVars }} />
      </head>
      <body className="flex min-h-dvh flex-col pb-[calc(3rem+env(safe-area-inset-bottom))] lg:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-navy"
        >
          {business.copy.ui.skipLink}
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(legalServiceSchema()) }}
        />
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <WhatsAppPill />
      </body>
    </html>
  );
}
