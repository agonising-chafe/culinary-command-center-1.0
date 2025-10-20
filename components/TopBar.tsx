"use client";

import { useRecipeStore } from "@/lib/useRecipeStore";

export default function TopBar() {
  const { refresh, initialize, mode, toggleMode, source, isLoading } = useRecipeStore();

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
      <h1 className="text-lg font-semibold text-gray-800">🍳 Culinary Command Center</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={refresh}
          className="px-3 py-1 rounded bg-primary text-white hover:opacity-90"
          disabled={isLoading}
        >
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
        <button
          onClick={toggleMode}
          className="px-3 py-1 rounded bg-accent text-white hover:opacity-90"
        >
          {mode === "view" ? "Edit Mode" : "View Mode"}
        </button>
        <span className="text-xs text-gray-500 italic">Source: {source?.toUpperCase()}</span>
      </div>
    </header>
  );
}

