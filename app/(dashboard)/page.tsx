import PlannerGrid from './PlannerGrid';
import RecipeModal from './RecipeModal';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-muted">
      <h1 className="text-3xl font-bold text-center py-6">
        Weekly Meal Planner
      </h1>
      <PlannerGrid />
      <RecipeModal />
    </main>
  );
}
