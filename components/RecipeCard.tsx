"use client";
import { Recipe } from "types/recipe";
import { useRecipeStore } from "lib/useRecipeStore";

export default function RecipeCard({ recipe, disabled = false }: { recipe: Recipe; disabled?: boolean }) {
  const selectRecipe = useRecipeStore((s) => s.selectRecipe);
  return (
    <div
      className={
        "rounded-xl border bg-white shadow-sm transition " +
        (disabled ? "opacity-70 cursor-default" : "cursor-pointer hover:shadow-md")
      }
      onClick={() => !disabled && selectRecipe(recipe)}
      aria-disabled={disabled}
    >
      <img
        src={recipe.image}
        alt={recipe.name}
        className="rounded-t-xl h-32 w-full object-cover"
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          if (img.src.endsWith("/placeholder.svg")) return;
          img.src = "/placeholder.svg";
        }}
      />
      <div className="p-2 text-sm">
        <p className="font-semibold">{recipe.name}</p>
        <p className="text-xs text-gray-500">{recipe.time} • {recipe.calories} kcal</p>
      </div>
    </div>
  );
}

