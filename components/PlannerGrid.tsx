"use client";

import React from "react";
import { useRecipeStore } from "lib/useRecipeStore";
import RecipeCard from "components/RecipeCard";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const meals = ["Lunch", "Dinner"];

export default function PlannerGrid() {
  const { recipes, mode, isLoading, setLoading } = useRecipeStore();

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [setLoading]);

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

