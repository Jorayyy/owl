import { Hero } from "@/components/Hero";
import { HoursSection } from "@/components/HoursSection";
import { MenuBoard } from "@/components/MenuBoard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Visit } from "@/components/Visit";
import { getSiteData } from "@/lib/data";
import { siteUrl } from "@/lib/site";

export const revalidate = 300;

export default async function Home() {
  const { business, hours, groups } = await getSiteData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: business.name,
    url: siteUrl,
    telephone: business.phone.e164,
    priceRange: "₱₱",
    servesCuisine: ["Filipino", "Sizzling plates"],
    sameAs: [business.facebookUrl],
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.line,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    openingHoursSpecification: hours
      .filter((day) => !day.closed && day.open && day.close)
      .map((day) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${day.day}`,
        opens: day.open,
        closes: day.close,
      })),
  };

  return (
    <>
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to menu
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader business={business} />
      <main>
        <Hero business={business} hours={hours} />
        <MenuBoard groups={groups} messengerUrl={business.messengerUrl} />
        <HoursSection business={business} hours={hours} />
        <Visit business={business} />
      </main>
      <SiteFooter business={business} hours={hours} />
    </>
  );
}
