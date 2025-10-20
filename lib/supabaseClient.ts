export async function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  if (!url || !key) return null;
  try {
    const mod: any = await import("@supabase/supabase-js");
    const client = mod.createClient(url, key);
    return client;
  } catch {
    return null;
  }
}

