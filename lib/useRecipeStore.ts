import { create } from "zustand";
import { Recipe } from "types/recipe";
import mockRecipes from "lib/mockRecipes";
import { supabase } from "lib/supabaseClient";

type Mode = "view" | "edit";

interface RecipeState {
  recipes: Recipe[];
  selected: Recipe | null;
  mode: Mode;
  isLoading: boolean;
  source: "db" | "mock";
  selectRecipe: (recipe: Recipe) => void;
  clearSelection: () => void;
  toggleMode: () => void;
  setMode: (mode: Mode) => void;
  setLoading: (loading: boolean) => void;
  setRecipes: (recipes: Recipe[]) => void;
  initialize: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const useRecipeStore = create<RecipeState>((set) => ({
  recipes: [],
  selected: null,
  mode: "view",
  isLoading: true,
  source: "mock",
  selectRecipe: (recipe) => set({ selected: recipe }),
  clearSelection: () => set({ selected: null }),
  toggleMode: () => set((s) => ({ mode: s.mode === "view" ? "edit" : "view" })),
  setMode: (mode) => set({ mode }),
  setLoading: (loading) => set({ isLoading: loading }),
  setRecipes: (recipes) => set({ recipes }),
  initialize: async () => {
    set({ isLoading: true });
    try {
      if (supabase) {
        const schema = process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || "public";
        const { data, error } = await supabase
          .schema(schema)
          .from("recipes")
          .select("*");
        if (error) throw error;
        const fixText = (s: string) =>
          s
            // Replace mojibake replacement char before F/C with degree symbol
            .replace(/\uFFFD(?=[FC])/g, "°")
            // Also handle common mis-encodings like '400�F'
            .replace(/�(?=[FC])/g, "°");
        const mapped: Recipe[] = (data || []).map((r: any) => ({
          id: String(r.id),
          name: typeof r.name === "string" ? fixText(r.name) : r.name,
          image: r.image || "/placeholder.svg",
          time: typeof r.time === "number" ? r.time : parseInt(String(r.time || 0)),
          calories: r.calories ?? 0,
          ingredients: Array.isArray(r.ingredients) ? r.ingredients : r.ingredients ? [String(r.ingredients)] : [],
          instructions: Array.isArray(r.instructions)
            ? r.instructions.map((x: any) => (typeof x === "string" ? fixText(x) : x))
            : typeof r.instructions === "string"
            ? fixText(r.instructions)
            : "",
        }));
        console.info("Supabase recipes fetched:", mapped.length);
        if (mapped.length > 0) {
          set({ recipes: mapped, isLoading: false, source: "db" });
          return;
        }
        // Empty DB: fall back to mock for a better first-run experience
        console.info("Supabase returned 0 rows; using mock data");
        set({ recipes: mockRecipes, isLoading: false, source: "mock" });
        return;
      }
      // Fallback to mock data when Supabase is not configured
      console.info("Using mock recipes (no Supabase env detected)");
      set({ recipes: mockRecipes, isLoading: false, source: "mock" });
    } catch (err) {
      console.warn("Supabase fetch failed; falling back to mock.", err);
      set({ recipes: mockRecipes, isLoading: false, source: "mock" });
    }
  },
  refresh: async () => {
    try {
      if (!supabase) {
        set({ recipes: mockRecipes, source: "mock" });
        return;
      }
      const schema = process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || "public";
      const { data, error } = await supabase
        .schema(schema)
        .from("recipes")
        .select("*");
      if (error) throw error;
      const fixText = (s: string) => s.replace(/\uFFFD(?=[FC])/g, "°").replace(/�(?=[FC])/g, "°");
      const mapped: Recipe[] = (data || []).map((r: any) => ({
        id: String(r.id),
        name: typeof r.name === "string" ? fixText(r.name) : r.name,
        image: r.image || "/placeholder.svg",
        time: typeof r.time === "number" ? r.time : parseInt(String(r.time || 0)),
        calories: r.calories ?? 0,
        ingredients: Array.isArray(r.ingredients) ? r.ingredients : r.ingredients ? [String(r.ingredients)] : [],
        instructions: Array.isArray(r.instructions)
          ? r.instructions.map((x: any) => (typeof x === "string" ? fixText(x) : x))
          : typeof r.instructions === "string"
          ? fixText(r.instructions)
          : "",
      }));
      if (mapped.length > 0) {
        set({ recipes: mapped, source: "db" });
      } else {
        set({ recipes: mockRecipes, source: "mock" });
      }
    } catch (err) {
      console.warn("Supabase refresh failed; keeping existing state.", err);
    }
  },
}));
