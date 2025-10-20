"use client";
import { Recipe } from "@/types/recipe";
import { useRecipeStore } from "@/lib/useRecipeStore";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const selectRecipe = useRecipeStore((s) => s.selectRecipe);
  return (
    <div
      className="cursor-pointer rounded-xl border bg-white shadow-sm hover:shadow-md transition"
      onClick={() => selectRecipe(recipe)}
    >
      <img src={recipe.image} alt={recipe.name} className="rounded-t-xl h-32 w-full object-cover" />
      <div className="p-2 text-sm">
        <p className="font-semibold">{recipe.name}</p>
        <p className="text-xs text-gray-500">{recipe.cookTime} · {recipe.calories} kcal</p>
      </div>
    </div>
  );
}
