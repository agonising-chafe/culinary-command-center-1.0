"use client";
import { useRecipeStore } from "lib/useRecipeStore";
import { AnimatePresence, motion } from "framer-motion";

export default function RecipeModal() {
  const { selected, clearSelection } = useRecipeStore();
  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl max-w-md w-full p-6 overflow-y-auto max-h-[90vh] shadow-lg"
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.6 }}
          >
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
            <button
              onClick={clearSelection}
              className="mt-6 px-4 py-2 rounded bg-gray-800 text-white transition hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
