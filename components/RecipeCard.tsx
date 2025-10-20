"use client";

import Image from "next/image";
import { Recipe } from "@/lib/useRecipeStore";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  if (!recipe) return null;

  return (
    <div className="flex flex-col items-center text-center bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition">
      <div className="w-full relative mb-3 overflow-hidden rounded-lg" style={{ height: "8rem" }}>
        <Image
          src={recipe.image || "/placeholder.svg"}
          alt={recipe.name}
          width={400}
          height={128}
          className="w-full h-32 object-cover"
          priority={false}
        />
      </div>

      <h3 className="font-medium text-gray-800 truncate w-full">{recipe.name}</h3>

      <div className="text-xs text-gray-500 mt-1">
        ⏱ {recipe.time} min • 🔥 {recipe.calories} cal
      </div>
    </div>
  );
}
