import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Recipe } from '../types/recipe.ts';

// sample recipe that will be retrieved from database
const sampleRecipe: Recipe = {
  name: 'Banana Floaties',
  id: '12345',
  servings: 4,
  description:
    'Ice cream that reminds you of swimming arm floaties.Ice cream that reminds you of swimming arm floaties.',
  time: '15 minutes',
  ingredients: [
    '3 bananas, peeled and sliced',
    '8 large marshmallows',
    '1 quart vanilla ice cream',
    '4 tbsp chocolate syrup',
  ],
  instructions: [
    'JUICES Combine the orange juice, lemon juice and sugar, then divide among tall chilled glasses.',
    'BANANA "ICE CREAM" With a fork, mash together the bananas, sugar, vanilla, almond flavoring and half ‘n’ half. Divide among the glasses and refrigerate while whipping the cream.',
    'WHIPPED CREAM Whip the cream and sugar until soft peaks form, then dollop atop the banana mixture.',
    'Serve immediately and enjoy!',
  ],
  imagePrompt:
    'A bowl of ice cream topped with bananas, marshmallows, and choclate syrup, with a swimming pool in the background',
  imageUrl:
    'https://www.thespruceeats.com/thmb/3QatTcsVjKeDVCD-rIeUa4fSRAs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/perfect-banana-split-recipe-305712-hero-01-ef0482a539394da0b5ba64ade0c73b98.jpg',
};

//fetching recipes for users based on its login id
const fetchRecipe = async (recipeId: string): Promise<Recipe> => {
  const response = await axios.get(
    `${process.env.VITE_BC_API_URL}/recipe/${recipeId}`
  );
  return response.data as Recipe;
};

const useRecipe = (recipeId: string) => {
  // const { isLoading, data, error } = useQuery<Recipe>({
  //   queryKey: ['recipe', recipeId],
  //   queryFn: () => fetchRecipe(recipeId),
  // });

  return {
    recipe: sampleRecipe,
    loading: false,
    error: Error,
  };
};

export { useRecipe };
