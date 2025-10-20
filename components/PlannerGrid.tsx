"use client";
import { useRecipeStore } from "@/lib/useRecipeStore";
import RecipeCard from "@/components/RecipeCard";

const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const meals = ["Lunch","Dinner"];

export default function PlannerGrid() {
  const recipes = useRecipeStore((s) => s.recipes);
  return (
    <div className="grid grid-cols-8 gap-4 p-6">
      <div></div>
      {days.map((d) => <div key={d} className="text-center font-semibold">{d}</div>)}
      {meals.map((meal) => (
        <>
          <div className="font-bold">{meal}</div>
          {days.map((day,i) => (
            <RecipeCard key={`${day}-${meal}-${i}`} recipe={recipes[(i+ (meal==="Dinner"?1:0)) % recipes.length]} />
          ))}
        </>
      ))}
    </div>
  );
}
