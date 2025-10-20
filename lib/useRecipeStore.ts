import { create } from "zustand";  // Fix import for Zustand v5+

interface Recipe {
  id: number;
  title: string;
  image: string;
  time: string;
  calories: number;
  ingredients: string[];
  instructions: string[];
}

interface RecipeState {
  recipes: Recipe[];
  selected: Recipe | null;
  selectRecipe: (recipe: Recipe) => void;
}

export const useRecipeStore = create<RecipeState>((set: (partial: Partial<RecipeState>) => void) => ({
  recipes: [],
  selected: null,
  selectRecipe: (recipe: Recipe) => set({ selected: recipe }),
}));
