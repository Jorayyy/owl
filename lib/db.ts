import { neon } from "@neondatabase/serverless";

export function getSql() {
  const raw = process.env.DATABASE_URL;
  if (!raw) return null;
  const url = new URL(raw);
  url.searchParams.delete("channel_binding");
  return neon(url.toString());
}
