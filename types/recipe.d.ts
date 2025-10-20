export interface Recipe {
  id: string;
  name: string;
  image: string;
  time: number;
  calories: number;
  ingredients?: string[];
  instructions?: string | string[];
}
