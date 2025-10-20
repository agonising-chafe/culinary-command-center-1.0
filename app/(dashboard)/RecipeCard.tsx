'use client';
import { useRecipeStore } from '../../lib/useRecipeStore';

export default function RecipeCard({ recipe }: { recipe: any }) {
  const selectRecipe = useRecipeStore((s) => s.selectRecipe);

  return (
    <div
      onClick={() => selectRecipe(recipe)}
      className="cursor-pointer hover:shadow-lg transition rounded-lg overflow-hidden border"
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-28 object-cover"
      />
      <div className="p-2">
        <h4 className="font-semibold text-sm sm:text-base">{recipe.title}</h4>
        <p className="text-xs text-gray-500">
          {recipe.time} · {recipe.calories} cal
        </p>
      </div>
    </div>
  );
}
