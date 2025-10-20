"use client";

import React from "react";
import { useRecipeStore } from "lib/useRecipeStore";
import RecipeCard from "components/RecipeCard";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const meals = ["Lunch", "Dinner"];

export default function PlannerGrid() {
  const { recipes, mode, isLoading, initialize } = useRecipeStore();

  React.useEffect(() => {
    void initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="overflow-x-auto">
        <div className="min-w-[900px] grid grid-cols-8 gap-4">
          <div></div>
          {days.map((d) => (
            <div key={d} className="text-center font-semibold text-sm sm:text-base">
              {d}
            </div>
          ))}
          {meals.map((meal) => (
            <React.Fragment key={meal}>
              <div className="font-bold text-sm sm:text-base flex items-center">{meal}</div>
              {days.map((day, i) => {
                const recipe = recipes[(i + (meal === "Dinner" ? 1 : 0)) % recipes.length];
                return (
                  <div
                    key={`${day}-${meal}-${i}`}
                    className={
                      "relative" + (mode === "edit" ? " ring-1 ring-dashed ring-gray-300 rounded-xl" : "")
                    }
                  >
                    {isLoading ? (
                      <div className="rounded-xl border bg-white p-2">
                        <div className="animate-pulse h-32 w-full rounded-md bg-gray-200" />
                        <div className="mt-2 h-4 w-2/3 rounded bg-gray-200" />
                        <div className="mt-1 h-3 w-1/2 rounded bg-gray-200" />
                      </div>
                    ) : (
                      <RecipeCard recipe={recipe} disabled={mode === "edit"} />
                    )}
                    {mode === "edit" && (
                      <span className="pointer-events-none absolute right-2 top-2 rounded bg-gray-800/80 px-2 py-0.5 text-[10px] font-medium text-white">
                        Edit
                      </span>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
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
