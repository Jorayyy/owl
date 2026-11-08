import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

const envFile = await readFile(".env.local", "utf8").catch(() => "");

for (const line of envFile.split(/\r?\n/)) {
  const match = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
  if (!match) continue;
  const [, key, raw] = match;
  if (!process.env[key]) {
    process.env[key] = raw.replace(/^["']|["']$/g, "");
  }
}

const raw = process.env.DATABASE_URL;
if (!raw) {
  console.error("DATABASE_URL is not set. Add it to .env.local first.");
  process.exit(1);
}

const url = new URL(raw);
url.searchParams.delete("channel_binding");
const sql = neon(url.toString());

for (const file of ["db/schema.sql", "db/seed.sql"]) {
  const text = await readFile(file, "utf8");
  const statements = text
    .split(/;\s*\n/)
    .map((statement) => statement.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await sql(statement);
  }

  console.log(`applied ${file} (${statements.length} statements)`);
}
