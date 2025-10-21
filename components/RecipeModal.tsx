"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRecipeStore } from "@/lib/useRecipeStore";
import { useEffect } from "react";

export default function RecipeModal() {
  const { selected, clearSelection, saveRecipe, deleteRecipe, source } = useRecipeStore();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") clearSelection();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [clearSelection]);

  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={selected.image || "/placeholder.svg"}
                alt={selected.name}
                className="object-cover w-full h-full"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  if (!img.src.endsWith("/placeholder.svg")) img.src = "/placeholder.svg";
                }}
              />
              <button
                onClick={clearSelection}
                className="absolute top-3 right-3 rounded-full bg-black/60 text-white px-2 py-1 text-sm hover:bg-black/80 transition"
              >
                ?
              </button>
            </div>

            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">{selected.name}</h2>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>? {selected.time} min</span>
                <span>?? {selected.calories} kcal</span>
              </div>

              <section>
                <h3 className="font-semibold mb-1 text-gray-700">Ingredients</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-0.5">
                  {selected.ingredients?.length ? (
                    selected.ingredients.map((ing: string, i: number) => <li key={i}>{ing}</li>)
                  ) : (
                    <li className="italic text-gray-400">No ingredients listed.</li>
                  )}
                </ul>
              </section>

              <section>
                <h3 className="font-semibold mb-1 text-gray-700">Instructions</h3>
                <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                  {Array.isArray(selected.instructions) ? (
                    selected.instructions.map((step: string, i: number) => <li key={i}>{step}</li>)
                  ) : (
                    <li>{selected.instructions || "No instructions provided."}</li>
                  )}
                </ol>
              </section>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  onClick={async () => {
                    if (!selected) return;
                    try {
                      await saveRecipe(selected);
                    } catch {}
                  }}
                  className="px-3 py-1.5 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
                  disabled={!selected || source !== "db"}
                  title={source === "db" ? "Save to database" : "Connect DB to enable save"}
                >
                  Save
                </button>
                <button
                  onClick={async () => {
                    if (!selected) return;
                    await deleteRecipe(selected.id);
                    clearSelection();
                  }}
                  className="px-3 py-1.5 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
                  disabled={!selected || source !== "db"}
                  title={source === "db" ? "Delete from database" : "Connect DB to enable delete"}
                >
                  Delete
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  ??? Print
                </button>
                <button
                  onClick={async () => {
                    try {
                      await navigator.share?.({
                        title: selected.name,
                        text: "Check out this recipe!",
                        url: window.location.href,
                      });
                    } catch (e) {
                      console.log("Share cancelled or unsupported.");
                    }
                  }}
                  className="px-3 py-1.5 rounded bg-primary text-white hover:opacity-90"
                >
                  ?? Share
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

