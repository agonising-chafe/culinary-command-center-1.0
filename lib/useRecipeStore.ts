import { create } from "zustand";
import { Recipe } from "types/recipe";
import mockRecipes from "lib/mockRecipes";

type Mode = "view" | "edit";

interface RecipeState {
  recipes: Recipe[];
  selected: Recipe | null;
  mode: Mode;
  isLoading: boolean;
  selectRecipe: (recipe: Recipe) => void;
  clearSelection: () => void;
  toggleMode: () => void;
  setLoading: (loading: boolean) => void;
}

export const useRecipeStore = create<RecipeState>((set) => ({
  recipes: mockRecipes,
  selected: null,
  mode: "view",
  isLoading: true,
  selectRecipe: (recipe) => set({ selected: recipe }),
  clearSelection: () => set({ selected: null }),
  toggleMode: () => set((s) => ({ mode: s.mode === "view" ? "edit" : "view" })),
  setLoading: (loading) => set({ isLoading: loading }),
}));

