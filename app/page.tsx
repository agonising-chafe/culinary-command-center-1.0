"use client";

import PlannerGrid from "components/PlannerGrid";
import RecipeModal from "components/RecipeModal";
import Navbar from "components/Navbar";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gray-50">
      <Navbar />
      <PlannerGrid />
      <RecipeModal />
    </main>
  );
}
