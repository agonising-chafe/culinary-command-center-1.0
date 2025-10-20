"use client";

import { useEffect } from "react";
import { useRecipeStore } from "@/lib/useRecipeStore";
import RecipeCard from "@/components/RecipeCard";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function PlannerGrid() {
  const { recipes, initialize, selectRecipe, mode, isLoading } = useRecipeStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading recipes...
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 p-6">
      {daysOfWeek.map((day, idx) => {
        const recipe = recipes[idx % recipes.length];
        return (
          <div
            key={day}
            className={`rounded-xl p-4 bg-white shadow hover:shadow-md transition cursor-pointer ${
              mode === "edit" ? "ring-2 ring-accent" : ""
            }`}
            onClick={() => selectRecipe(recipe)}
          >
            <h2 className="text-center font-semibold text-gray-700 mb-3">
              {day}
            </h2>
            <RecipeCard recipe={recipe} />
          </div>
        );
      })}
    </section>
  );
}
