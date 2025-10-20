import { create } from "zustand";
import { Recipe } from "types/recipe";
export type { Recipe } from "types/recipe";
import mockRecipes from "lib/mockRecipes";

type Mode = "view" | "edit";
type Source = "db" | "mock";

interface RecipeState {
  recipes: Recipe[];
  selected: Recipe | null;
  mode: Mode;
  isLoading: boolean;
  source: Source;
  error: string | null;

  selectRecipe: (recipe: Recipe) => void;
  clearSelection: () => void;
  toggleMode: () => void;
  setMode: (mode: Mode) => void;
  setLoading: (loading: boolean) => void;
  setRecipes: (recipes: Recipe[]) => void;

  initialize: () => Promise<void>;
  refresh: () => Promise<void>;
  saveRecipe: (recipe: Partial<Recipe>) => Promise<void>;
  deleteRecipe: (id: string) => Promise<void>;
}

function fixText(s: string) {
  return s
    // Replace mojibake replacement char before F/C with degree symbol
    .replace(/\uFFFD(?=[FC])/g, "\u00B0")
    // Also handle common mis-encodings like '400?F'
    .replace(/\?(?=[FC])/g, "\u00B0");
}

function mapRowToRecipe(r: any): Recipe {
  return {
    id: String(r.id),
    name: typeof r.name === "string" ? fixText(r.name) : r.name,
    image: r.image || r.image_url || "/placeholder.svg",
    time: typeof r.time === "number" ? r.time : parseInt(String(r.time || 0)),
    calories: r.calories ?? 0,
    ingredients: Array.isArray(r.ingredients)
      ? r.ingredients
      : r.ingredients
      ? [String(r.ingredients)]
      : [],
    instructions: Array.isArray(r.instructions)
      ? r.instructions.map((x: any) => (typeof x === "string" ? fixText(x) : x))
      : typeof r.instructions === "string"
      ? fixText(r.instructions)
      : "",
  };
}

export const useRecipeStore = create<RecipeState>((set) => ({
  recipes: [],
  selected: null,
  mode: "view",
  isLoading: true,
  source: "mock",
  error: null,

  selectRecipe: (recipe) => set({ selected: recipe }),
  clearSelection: () => set({ selected: null }),
  toggleMode: () => set((s) => ({ mode: s.mode === "view" ? "edit" : "view" })),
  setMode: (mode) => set({ mode }),
  setLoading: (loading) => set({ isLoading: loading }),
  setRecipes: (recipes) => set({ recipes }),

  initialize: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/recipes");
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to fetch recipes");
      const mapped: Recipe[] = (json.data || []).map(mapRowToRecipe);
      set({ recipes: mapped, isLoading: false, source: "db", error: null });
    } catch (err) {
      console.warn("API fetch failed; falling back to mock.", err);
      set({ recipes: mockRecipes, isLoading: false, source: "mock", error: (err as any)?.message || String(err) });
    }
  },

  refresh: async () => {
    try {
      const res = await fetch("/api/recipes");
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to fetch");
      const mapped: Recipe[] = (json.data || []).map(mapRowToRecipe);
      set({ recipes: mapped, source: "db", error: null });
    } catch (err) {
      console.warn("API refresh failed; keeping existing state.", err);
      set({ error: (err as any)?.message || String(err) });
    }
  },

  saveRecipe: async (recipe) => {
    set({ isLoading: true, error: null });
    const isNew = !recipe.id;
    try {
      const payload: any = {
        ...recipe,
        image_url: (recipe as any).image_url || recipe.image,
      };
      const res = await fetch("/api/recipes", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to save recipe");
      const mapped = mapRowToRecipe(json.data);
      set((state) => {
        const list = [...state.recipes];
        const idx = list.findIndex((x) => x.id === mapped.id);
        if (idx >= 0) list[idx] = mapped;
        else list.unshift(mapped);
        return { recipes: list, isLoading: false, source: "db", error: null };
      });
    } catch (err) {
      console.error("Save failed", err);
      set({ isLoading: false, error: (err as any)?.message || String(err) });
    }
  },

  deleteRecipe: async (id) => {
    if (!id) return;
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`/api/recipes?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to delete recipe");
      set((state) => ({
        recipes: state.recipes.filter((r) => r.id !== id),
        isLoading: false,
        source: "db",
        error: null,
      }));
    } catch (err) {
      console.error("Delete failed", err);
      set({ isLoading: false, error: (err as any)?.message || String(err) });
    }
  },
}));
