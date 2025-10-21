"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRecipeStore } from "@/lib/useRecipeStore";
import { useEffect, useState } from "react";

export default function RecipeModal() {
  const { selected, clearSelection, saveRecipe, deleteRecipe, source, mode } = useRecipeStore();

  const [name, setName] = useState("");
  const [time, setTime] = useState<string | number>(0);
  const [calories, setCalories] = useState<string | number>(0);
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructionsText, setInstructionsText] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") clearSelection();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [clearSelection]);

  useEffect(() => {
    if (!selected) return;
    setName(selected.name || "");
    setTime(selected.time ?? 0);
    setCalories(selected.calories ?? 0);
    const ing = Array.isArray(selected.ingredients)
      ? selected.ingredients.join("\n")
      : selected.ingredients
      ? String(selected.ingredients)
      : "";
    setIngredientsText(ing);
    const instr = Array.isArray(selected.instructions)
      ? selected.instructions.join("\n")
      : selected.instructions
      ? String(selected.instructions)
      : "";
    setInstructionsText(instr);
  }, [selected]);

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
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              {mode === "edit" ? (
                <>
                  <input
                    className="w-full border rounded px-3 py-2 text-lg font-semibold text-gray-800"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Recipe name"
                  />
                  <div className="flex gap-4 text-sm text-gray-700">
                    <label className="flex items-center gap-2">
                      <span>⏱ Time</span>
                      <input
                        type="number"
                        className="w-20 border rounded px-2 py-1"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        min={0}
                      />
                      <span>min</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <span>🔥 Calories</span>
                      <input
                        type="number"
                        className="w-24 border rounded px-2 py-1"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        min={0}
                      />
                      <span>kcal</span>
                    </label>
                  </div>
                  <section>
                    <h3 className="font-semibold mb-1 text-gray-700">Ingredients</h3>
                    <textarea
                      className="w-full border rounded px-3 py-2 text-sm text-gray-700 h-28"
                      value={ingredientsText}
                      onChange={(e) => setIngredientsText(e.target.value)}
                      placeholder="One ingredient per line"
                    />
                  </section>
                  <section>
                    <h3 className="font-semibold mb-1 text-gray-700">Instructions</h3>
                    <textarea
                      className="w-full border rounded px-3 py-2 text-sm text-gray-700 h-36"
                      value={instructionsText}
                      onChange={(e) => setInstructionsText(e.target.value)}
                      placeholder="One step per line"
                    />
                  </section>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold text-gray-800">{selected.name}</h2>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>⏱ {selected.time} min</span>
                    <span>🔥 {selected.calories} kcal</span>
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
                </>
              )}

              <div className="flex justify-end gap-3 pt-3">
                <button
                  onClick={async () => {
                    if (!selected) return;
                    const payload = {
                      ...selected,
                      name: name || selected.name,
                      time: Number(time) || 0,
                      calories: Number(calories) || 0,
                      ingredients: ingredientsText
                        .split("\n")
                        .map((s) => s.trim())
                        .filter(Boolean),
                      instructions: instructionsText
                        .split("\n")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    } as any;
                    try {
                      await saveRecipe(payload);
                      showToast("Saved");
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
                    showToast("Deleted");
                    setTimeout(() => clearSelection(), 500);
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
                  Print
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
                  Share
                </button>
              </div>
              {toast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-md bg-gray-900 text-white px-3 py-2 text-sm shadow-lg" role="status">
                  {toast}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
