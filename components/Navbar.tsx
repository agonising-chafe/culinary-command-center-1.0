"use client";
import ExportMenu from "components/ExportMenu";
import UpdateButton from "components/UpdateButton";
import { useRecipeStore } from "lib/useRecipeStore";

export default function Navbar() {
  const mode = useRecipeStore((s) => s.mode);
  const source = useRecipeStore((s) => s.source);
  const toggleMode = useRecipeStore((s) => s.toggleMode);
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Culinary Command Center</h1>
        <div className="ml-auto flex items-center gap-3">
          <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs text-gray-700 bg-white">
            Data: {source === "db" ? "Live DB" : "Mock Data"}
          </span>
          <button
            onClick={toggleMode}
            className="rounded-full border px-3 py-1 text-sm transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-pressed={mode === "edit"}
            title="Toggle View/Edit"
          >
            {mode === "edit" ? "Edit Mode" : "View Mode"}
          </button>
          <UpdateButton />
          <ExportMenu />
        </div>
      </div>
    </header>
  );
}
