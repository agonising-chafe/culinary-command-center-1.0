import { NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const schema = process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || "public";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

function getClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET() {
  const env = {
    supabase_url_set: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    supabase_key_set: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    schema,
  };

  const client = getClient();
  if (!client) {
    return json({ ok: false, env, supabase: { reachable: false, error: "Missing env" } }, 200);
  }

  try {
    // Try a minimal query against the expected table; tolerate table-not-found as reachable=true
    const { data, error } = await client.schema(schema).from("recipes").select("id").limit(1);
    if (error) {
      // Treat PostgREST table-not-found as reachable but unprovisioned
      const msg = String(error.message || "");
      const tableMissing = /relation|not exist|PGRST/i.test(msg);
      return json({
        ok: true,
        env,
        supabase: {
          reachable: true,
          query_ok: !tableMissing && !error,
          error: error,
        },
        table: { name: "recipes", exists: !tableMissing },
      });
    }
    return json({ ok: true, env, supabase: { reachable: true, query_ok: true, count: data?.length ?? 0 } });
  } catch (err: any) {
    return json({ ok: false, env, supabase: { reachable: false, error: err?.message || String(err) } }, 200);
  }
}

