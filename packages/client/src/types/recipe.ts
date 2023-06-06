export interface Recipe {
  name: string;
  id: string;
  description: string;
  servings: number;
  time: string;
  ingredients: string[];
  instructions: string[];
  imagePrompt: string;
  imageUrl: string;
}
