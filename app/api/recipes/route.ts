import { NextRequest, NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
export const runtime = 'nodejs';
export const preferredRegion = ["pdx1", "sfo1", "lhr1"];

const schema = process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || "public";
const imageColumn = process.env.NEXT_PUBLIC_SUPABASE_IMAGE_COLUMN || "image_url";

function sanitizeRecipe(body: any) {
  return {
    id: body.id || crypto.randomUUID(),
    name: body.name?.trim() || "Untitled Recipe",
    image_url: body.image_url || "/placeholder.svg",
    time: typeof body.time === "number" ? body.time : parseInt(String(body.time || 0)),
    calories:
      typeof body.calories === "number" ? body.calories : parseInt(String(body.calories || 0)),
    ingredients: Array.isArray(body.ingredients)
      ? body.ingredients
      : body.ingredients
      ? [String(body.ingredients)]
      : [],
    instructions: Array.isArray(body.instructions)
      ? body.instructions
      : body.instructions
      ? [String(body.instructions)]
      : [],
    created_at: body.created_at || new Date().toISOString(),
  };
}

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
  try {
    const client = getClient();
    if (!client) return json({ ok: false, error: "Missing Supabase env: NEXT_PUBLIC_SUPABASE_URL/ANON_KEY" }, 500);
    const { data, error } = await client
      .schema(schema)
      .from("recipes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return json({ ok: true, data });
  } catch (err: any) {
    console.error("GET /recipes error:", err.message);
    return json({ ok: false, error: err.message }, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const recipe = sanitizeRecipe(body);
    const client = getClient();
    if (!client) return json({ ok: false, error: "Missing Supabase env: NEXT_PUBLIC_SUPABASE_URL/ANON_KEY" }, 500);
    const { data, error } = await client
      .schema(schema)
      .from("recipes")
      .insert([
        {
          name: recipe.name,
          [imageColumn]: recipe.image_url,
          time: recipe.time,
          calories: recipe.calories,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return json({ ok: true, data }, 201);
  } catch (err: any) {
    console.error("POST /recipes error:", err.message);
    return json({ ok: false, error: err.message }, 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id) return json({ ok: false, error: "Missing recipe ID" }, 400);

    const recipe = sanitizeRecipe(body);
    const client = getClient();
    if (!client) return json({ ok: false, error: "Missing Supabase env: NEXT_PUBLIC_SUPABASE_URL/ANON_KEY" }, 500);
    const { data, error } = await client
      .schema(schema)
      .from("recipes")
      .update({
        name: recipe.name,
        [imageColumn]: recipe.image_url,
        time: recipe.time,
        calories: recipe.calories,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
      })
      .eq("id", recipe.id)
      .select()
      .single();

    if (error) throw error;
    return json({ ok: true, data });
  } catch (err: any) {
    console.error("PUT /recipes error:", err.message);
    return json({ ok: false, error: err.message }, 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return json({ ok: false, error: "Missing recipe ID" }, 400);
    const client = getClient();
    if (!client) return json({ ok: false, error: "Missing Supabase env: NEXT_PUBLIC_SUPABASE_URL/ANON_KEY" }, 500);
    const { error } = await client.schema(schema).from("recipes").delete().eq("id", id);
    if (error) throw error;

    return json({ ok: true, message: `Recipe ${id} deleted.` });
  } catch (err: any) {
    console.error("DELETE /recipes error:", err.message);
    return json({ ok: false, error: err.message }, 500);
  }
}
