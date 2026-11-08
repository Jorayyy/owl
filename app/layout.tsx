import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { metaDescription, metaTitle, siteUrl } from "@/lib/site";

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: metaTitle, template: "%s — Night Owls" },
  description: metaDescription,
  applicationName: "Night Owls' Sizzlogan",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: siteUrl,
    siteName: "Night Owls' Sizzlogan",
    title: metaTitle,
    description: metaDescription,
  },
  twitter: {
    card: "summary",
    title: metaTitle,
    description: metaDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#161513",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-PH" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
