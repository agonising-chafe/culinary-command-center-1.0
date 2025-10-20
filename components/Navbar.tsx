"use client";
import ExportMenu from "components/ExportMenu";
import { useRecipeStore } from "lib/useRecipeStore";

export default function Navbar() {
  const mode = useRecipeStore((s) => s.mode);
  const toggleMode = useRecipeStore((s) => s.toggleMode);
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Culinary Command Center</h1>
        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={toggleMode}
            className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50"
            aria-pressed={mode === "edit"}
            title="Toggle View/Edit"
          >
            {mode === "edit" ? "Edit Mode" : "View Mode"}
          </button>
          <ExportMenu />
        </div>
      </div>
    </header>
  );
}

