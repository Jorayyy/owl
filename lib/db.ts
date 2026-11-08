import { neon } from "@neondatabase/serverless";

export function getSql() {
  const raw = process.env.DATABASE_URL;
  if (!raw) return null;
  try {
    const url = new URL(raw.trim().replace(/^["']|["']$/g, ""));
    url.searchParams.delete("channel_binding");
    return neon(url.toString());
  } catch {
    console.error("Invalid DATABASE_URL, serving fallback content");
    return null;
  }
}
