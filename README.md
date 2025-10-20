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

## Persistence (Supabase)`n`npm install @supabase/supabase-js``nAdd  .env.local  with  NEXT_PUBLIC_SUPABASE_URL  and  NEXT_PUBLIC_SUPABASE_KEY . Create a ecipes table with columns: id (uuid/int), name (text), time (int), calories (int), ingredients (text[]/json), instructions (text[]/text), image (text). The app will fall back to mock data if env is missing.\n
