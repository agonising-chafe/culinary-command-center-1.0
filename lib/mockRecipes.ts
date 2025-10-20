import rawData from "@/data/recipes.json";
import { Recipe } from "@/types/recipe";

export const mockRecipes: Recipe[] = (rawData as any[]).map((r: any) => ({
  id: r.id.toString(),
  name: r.title,
  image: r.image,
  time: parseInt(r.time),
  calories: r.calories,
  ingredients: r.ingredients,
  instructions: Array.isArray(r.instructions)
    ? r.instructions.join("\n")
    : r.instructions,
}));

export default mockRecipes;
