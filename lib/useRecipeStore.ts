import { create } from "zustand";
import { Recipe } from "types/recipe";
import mockRecipes from "lib/mockRecipes";
import { getSupabase } from "lib/supabaseClient";

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
  setLoading: (loading: boolean) => void;
  setRecipes: (recipes: Recipe[]) => void;
  initialize: () => Promise<void>;
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
  setLoading: (loading) => set({ isLoading: loading }),
  setRecipes: (recipes) => set({ recipes }),
  initialize: async () => {
    set({ isLoading: true });
    try {
      const supabase = await getSupabase();
      if (supabase) {
        const { data, error } = await supabase.from("recipes").select("*");
        if (error) throw error;
        const mapped: Recipe[] = (data || []).map((r: any) => ({
          id: String(r.id),
          name: r.name,
          image: r.image || "/placeholder.svg",
          time: typeof r.time === "number" ? r.time : parseInt(String(r.time || 0)),
          calories: r.calories ?? 0,
          ingredients: Array.isArray(r.ingredients) ? r.ingredients : r.ingredients ? [String(r.ingredients)] : [],
          instructions: Array.isArray(r.instructions)
            ? r.instructions.join("\n")
            : r.instructions ?? "",
        }));
        console.info("Supabase recipes fetched:", mapped.length);
        set({ recipes: mapped, isLoading: false, source: "db" });
        return;
      }
      // Fallback to mock data when Supabase is not configured
      console.info("Using mock recipes (no Supabase env detected)");
      set({ recipes: mockRecipes, isLoading: false, source: "mock" });
    } catch {
      console.warn("Supabase fetch failed; falling back to mock.");
      set({ recipes: mockRecipes, isLoading: false, source: "mock" });
    }
  },
}));
