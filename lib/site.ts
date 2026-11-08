const fallbackSiteUrl = "https://nightowlssizzlogan.vercel.app";

function resolveSiteUrl(value: string | undefined, fallback: string) {
  if (!value) return fallback;
  const cleaned = value.trim().replace(/^["']|["']$/g, "");
  try {
    return new URL(cleaned).toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

export const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL, fallbackSiteUrl);

export const metaTitle = "Night Owls' Sizzlogan — Sizzling plates and rice meals in Palo, Leyte";

export const metaDescription =
  "Sizzling sisig, chicken, bangus, and liempo on cast iron with rice in Palo, Leyte. Delivery, takeout, and dine-in. Call or message to order.";
