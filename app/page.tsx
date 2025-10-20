"use client";

import PlannerGrid from "components/PlannerGrid";
import RecipeModal from "components/RecipeModal";
import TopBar from "components/TopBar";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gray-50">
      <TopBar />
      <PlannerGrid />
      <RecipeModal />
    </main>
  );
}
