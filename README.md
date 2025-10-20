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

## License

MIT

## Persistence (Supabase)`n`npm install @supabase/supabase-js``nAdd  .env.local  with  NEXT_PUBLIC_SUPABASE_URL  and  NEXT_PUBLIC_SUPABASE_KEY . Create a ecipes table with columns: id (uuid/int), name (text), time (int), calories (int), ingredients (text[]/json), instructions (text[]/text), image (text). The app will fall back to mock data if env is missing.\n
