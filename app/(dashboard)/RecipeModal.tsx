'use client';
import { useRecipeStore } from '../../lib/useRecipeStore';

export default function RecipeModal() {
  const { selected, selectRecipe } = useRecipeStore();
  if (!selected) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full relative">
        <h2 className="text-xl font-bold mb-2">{selected.title}</h2>

        <ul className="mb-3 text-sm list-disc pl-5">
          {selected.ingredients.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>

        <ol className="text-sm mb-4 list-decimal pl-5">
          {selected.instructions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            🖨 Print
          </button>
          <button
            onClick={() => selectRecipe(null)}
            className="px-3 py-1 bg-red-200 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
