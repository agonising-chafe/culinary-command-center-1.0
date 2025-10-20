import { Recipe } from "types/recipe";

const mockRecipes: Recipe[] = [
  {
    id: "1",
    name: "Lemon Garlic Salmon",
    image: "/recipe-images/salmon.jpg",
    calories: 420,
    time: 25,
    ingredients: [
      "2 salmon fillets",
      "1 lemon",
      "2 cloves garlic",
      "1 tbsp olive oil",
      "Salt, pepper"
    ],
    instructions: [
      "Preheat oven to 400°F (200°C).",
      "Place salmon on foil, drizzle with olive oil, lemon juice, and minced garlic.",
      "Bake 20 min until flaky."
    ]
  },
  {
    id: "2",
    name: "Avocado Chicken Salad",
    image: "/recipe-images/avocado-chicken.jpg",
    calories: 360,
    time: 15,
    ingredients: [
      "2 cups cooked chicken",
      "1 avocado",
      "1 tbsp Greek yogurt",
      "Lime juice",
      "Salt, pepper"
    ],
    instructions: [
      "Mash avocado with yogurt and lime juice.",
      "Stir in shredded chicken, season to taste."
    ]
  }
];

export default mockRecipes;

