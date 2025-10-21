import { supabase } from "@/lib/supabaseClient";
export const runtime = 'nodejs';
export const preferredRegion = ["pdx1", "sfo1", "lhr1"];

export async function GET() {
  if (!supabase) {
    return Response.json(
      { ok: false, connected: false, error: "Missing NEXT_PUBLIC_SUPABASE_URL/KEY env" },
      { status: 500 }
    );
  }

  const schema = process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || "public";
  // Try querying the expected table; if it's missing, still confirm connectivity.
  const { data, error } = await supabase.schema(schema).from("recipes").select("*").limit(1);

  if (error) {
    // PGRST205 = table not found; treat as connected=false to recipes but Supabase reachable
    return Response.json({ ok: true, connected: true, table: "recipes", data: [], error }, { status: 200 });
  }
  return Response.json({ ok: true, connected: true, table: "recipes", count: data?.length ?? 0, data });
}
