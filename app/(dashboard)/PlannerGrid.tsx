'use client';
import RecipeCard from './RecipeCard';
import { useRecipeStore } from '../../lib/useRecipeStore';

export default function PlannerGrid() {
  const { recipes } = useRecipeStore();
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 p-4">
      {days.map((day, i) => (
        <div key={day} className="border rounded-lg p-3 bg-white shadow-sm">
          <h3 className="font-semibold mb-2">{day}</h3>
          <RecipeCard recipe={recipes[i % recipes.length]} />
        </div>
      ))}
    </div>
  );
}
