import { Recipe } from "@/lib/useRecipeStore";

const mockRecipes: Recipe[] = [
  {
    id: "1",
    name: "Lemon Garlic Chicken",
    image: "/images/chicken.jpg",
    time: 35,
    calories: 420,
    ingredients: [
      "2 chicken breasts",
      "2 cloves garlic, minced",
      "1 lemon (zest + juice)",
      "2 tbsp olive oil",
      "Salt & pepper to taste",
    ],
    instructions: [
      "Preheat oven to 400°F (200°C).",
      "Whisk lemon juice, zest, garlic, and olive oil.",
      "Marinate chicken for 15 minutes.",
      "Bake for 25 minutes until golden brown.",
    ],
  },
  {
    id: "2",
    name: "Veggie Stir Fry",
    image: "/images/stirfry.jpg",
    time: 20,
    calories: 310,
    ingredients: [
      "1 cup broccoli florets",
      "1 bell pepper, sliced",
      "1 carrot, julienned",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
    ],
    instructions: [
      "Heat oil in a wok.",
      "Add veggies and stir-fry 5–7 min.",
      "Pour soy sauce and toss well.",
      "Serve with rice or noodles.",
    ],
  },
  {
    id: "3",
    name: "Pasta Primavera",
    image: "/images/pasta.jpg",
    time: 25,
    calories: 450,
    ingredients: [
      "8 oz penne pasta",
      "1 zucchini, sliced",
      "1 cup cherry tomatoes",
      "1/2 cup parmesan cheese",
      "2 tbsp olive oil",
    ],
    instructions: [
      "Boil pasta until al dente.",
      "Sauté zucchini and tomatoes in olive oil.",
      "Toss with pasta and parmesan.",
      "Serve warm with basil garnish.",
    ],
  },
];

export default mockRecipes;
