# Culinary Command Center 1.0

This project is a Next.js application designed as a culinary command center for planning recipes and managing culinary tasks.

## Project Structure

- **app/**: Contains the main application pages and layout.
- **components/**: Reusable UI components.
- **data/**: JSON data files, including recipes.
- **lib/**: Custom hooks and configuration files.
- **next.config.js**: Next.js configuration.
- **package.json**: Project dependencies and scripts.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to view the app.

## Features

- Dashboard with recipe planning.
- Recipe cards and modals.
- Export menu for data handling.
- PWA support with manifest configuration.

## Supabase Persistence

Enable live data via Supabase. The app falls back to bundled mock data if env vars are missing or the API fails.

1) Install client library (already in package.json, run install if needed):

```bash
npm install @supabase/supabase-js
```

2) Create `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
NEXT_PUBLIC_SUPABASE_SCHEMA=public        # optional
NEXT_PUBLIC_SUPABASE_IMAGE_COLUMN=image_url  # or "image" if your column uses that name
```

3) Create `recipes` table with sensible defaults (Postgres):

```sql
-- basic structure (adjust types as needed)
create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image_url text,
  time int default 0,
  calories int default 0,
  ingredients jsonb default '[]'::jsonb,
  instructions jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

-- if migrating from text/text[] columns
alter table public.recipes
  alter column time drop not null,
  alter column time set default 0,
  alter column calories drop not null,
  alter column calories set default 0;

alter table public.recipes
  alter column ingredients drop default,
  alter column instructions drop default;

alter table public.recipes
  alter column ingredients type jsonb using to_jsonb(ingredients),
  alter column instructions type jsonb using to_jsonb(instructions);

alter table public.recipes
  alter column ingredients set default '[]'::jsonb,
  alter column instructions set default '[]'::jsonb;
```

4) Test locally

```bash
npm run dev
```

- GET: http://localhost:3000/api/recipes
- POST/PUT/DELETE: see docs/BLUEPRINT.md for examples and API contract.

## Deployment

- Full architecture and data flow: see `docs/BLUEPRINT.md:1`.

Vercel settings (recommended)
- Framework preset: `Next.js`
- Node.js version: `20`
- Install Command: `npm ci` (or `npm install`)
- Build Command: `next build`
- Output Directory: default (managed by Next.js)

Environment variables (Project Settings → Environment)
- `NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>`
- `NEXT_PUBLIC_SUPABASE_SCHEMA=public` (optional)
- `NEXT_PUBLIC_SUPABASE_IMAGE_COLUMN=image_url` (or `image` if your column is named that)

PWA notes
- PWA is enabled in production builds (`next build && next start`) and disabled in dev.
- Service worker is generated at build by `next-pwa`; do not commit `public/sw.js`.
- The app includes a dev safeguard to unregister old SWs and a production update prompt/refresh button to activate new versions safely.

Troubleshooting deploys
- If Vercel fails during “Deploying outputs…”, retry the deployment (often transient). If it recurs, contact Vercel Support with the deployment ID.
- If clients fetch missing chunks after a deploy, use the in‑app Refresh button or hard refresh to clear stale caches and activate the new SW.

## License

MIT
