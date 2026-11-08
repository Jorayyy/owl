# Night Owls' Sizzlogan

Marketing and menu website for **Night Owls' Sizzlogan**, a sizzling plates and rice meals restaurant in Palo, Leyte, Philippines. The site is a fast, SEO-friendly Next.js app that shows the live menu, opening hours, location, and contact channels. Menu and business data are stored in Postgres (Neon) and fall back to bundled content when the database is unavailable.

## Tech stack

- **Next.js 15** (App Router, React Server Components)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Neon serverless Postgres** via `@neondatabase/serverless`
- **Lucide** icons

## Features

- Sizzling menu board grouped by category, with prices, spice level, tags, and availability
- Live open/closed status computed from the visitor's local time
- Opening hours table
- Contact actions: call, Messenger, Facebook, and Google Maps
- Restaurant structured data (JSON-LD) for rich search results
- Auto-generated `sitemap.xml` and `robots.txt`
- Graceful fallback content when `DATABASE_URL` is missing or a query fails
- Incremental Static Regeneration (`revalidate = 300`)

## Project structure

```
app/            App Router pages, metadata, sitemap, robots
components/     UI sections (Hero, MenuBoard, Hours, Visit, Footer, etc.)
lib/            Data access, formatting, hours logic, types, fallback data
db/             Postgres schema and seed SQL
scripts/        Node scripts (database seed)
public/         Static assets
```

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env.local` and fill in the values:

```bash
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

`DATABASE_URL` is optional for local development. Without it, the site renders the fallback menu defined in `lib/fallback.ts`.

### 3. Set up the database (optional)

Create a Postgres database (Neon works well), then apply the schema and seed data:

```bash
npm run db:seed
```

This runs `db/schema.sql` followed by `db/seed.sql`. Both are idempotent and safe to re-run.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run db:seed` | Apply schema and seed data to `DATABASE_URL` |

## Database

The schema (`db/schema.sql`) has four tables:

- `business` — single-row restaurant profile (name, address, phone, social links, timezone)
- `opening_hours` — one row per day of the week
- `menu_groups` — menu categories such as Sizzling plates or Rice meals
- `menu_items` — dishes belonging to a group

`lib/data.ts` loads all of them in parallel and maps the rows to typed objects. Any error or empty result falls back to `lib/fallback.ts`, so the public site never renders blank.

## Deployment (Vercel)

1. Create a Neon Postgres database and copy the pooled connection string.
2. Import this repository at [vercel.com/new](https://vercel.com/new) — the Next.js framework is detected automatically.
3. Add environment variables in **Project → Settings → Environment Variables**:
   - `DATABASE_URL` — Neon pooled connection string
   - `NEXT_PUBLIC_SITE_URL` — the deployed URL, e.g. `https://your-project.vercel.app`
4. Deploy.
5. Apply the schema and seed data once, from your machine (with `.env.local` pointing at the production database):

   ```bash
   npm run db:seed
   ```

   Alternatively, paste `db/schema.sql` and `db/seed.sql` into the Neon SQL editor.

After the database has data, trigger a rebuild or wait for the next revalidation so the live menu replaces the fallback content.

## License

Private project. All rights reserved.
