"use client";
import PlannerGrid from "@/components/PlannerGrid";
import RecipeModal from "@/components/RecipeModal";
import ExportMenu from "@/components/ExportMenu";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gray-50">
      <h1 className="text-center text-3xl font-bold pt-8">🍳 Culinary Command Center</h1>
      <ExportMenu />
      <PlannerGrid />
      <RecipeModal />
    </main>
  );
}
