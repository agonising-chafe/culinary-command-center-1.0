import { create } from "zustand";
import recipes from "../data/recipes.json";

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
  selectRecipe: (r: Recipe | null) => void;
}

export const useRecipeStore = create<RecipeState>((set) => ({
  recipes,
  selected: null,
  selectRecipe: (r) => set({ selected: r }),
}));
