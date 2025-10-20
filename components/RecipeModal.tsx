"use client";
import { useRecipeStore } from "lib/useRecipeStore";

export default function RecipeModal() {
  const { selected, clearSelection } = useRecipeStore();
  if (!selected) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl max-w-md w-full p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
        <p className="text-gray-500 mb-4">{selected.time} • {selected.calories} kcal</p>
        <h3 className="font-semibold">Ingredients</h3>
        <ul className="list-disc list-inside mb-4 text-sm">
          {selected.ingredients?.map((i: string, index: number) => <li key={index}>{i}</li>)}
        </ul>
        <h3 className="font-semibold">Instructions</h3>
        <ol className="list-decimal list-inside text-sm space-y-1">
          {typeof selected.instructions === "string" ? (
            <li>{selected.instructions}</li>
          ) : Array.isArray(selected.instructions) ? (
            selected.instructions.map((i: string, index: number) => <li key={index}>{i}</li>)
          ) : null}
        </ol>
        <button onClick={clearSelection} className="mt-6 px-4 py-2 rounded bg-gray-800 text-white">Close</button>
      </div>
    </div>
  );
}

