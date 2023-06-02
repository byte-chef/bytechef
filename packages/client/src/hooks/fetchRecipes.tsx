import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Recipe } from '../types/recipe.ts';
/*
sample recipe that will be retrieved from database
{
  name: "Banana Floaties",
  description: "Ice cream that reminds you of swimming arm floaties.",
  servings: 4,
  time: "15 minutes",
  ingredients: [
    "3 bananas, peeled and sliced",
    "8 large marshmallows",
    "1 quart vanilla ice cream",
    "4 tbsp chocolate syrup"
  ],
  instructions: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, autem quibusdam, a sed, sequi aut eligendi dolorem ipsam necessitatibus et pariatur obcaecati doloremque modi ullam dolor eaque doloribus eveniet iure?", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, autem quibusdam, a sed, sequi aut eligendi dolorem ipsam necessitatibus et pariatur obcaecati doloremque modi ullam dolor eaque doloribus eveniet iure?", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, autem quibusdam, a sed, sequi aut eligendi dolorem ipsam necessitatibus et pariatur obcaecati doloremque modi ullam dolor eaque doloribus eveniet iure?", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, autem quibusdam, a sed, sequi aut eligendi dolorem ipsam necessitatibus et pariatur obcaecati doloremque modi ullam dolor eaque doloribus eveniet iure?"],
  imagePrompt: "A bowl of ice cream topped with bananas, marshmallows, and choclate syrup, with a swimming pool in the background",
  imageUrl: "https://www.thespruceeats.com/thmb/3QatTcsVjKeDVCD-rIeUa4fSRAs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/perfect-banana-split-recipe-305712-hero-01-ef0482a539394da0b5ba64ade0c73b98.jpg"
}
*/

//fetching recipes for users based on its login id
const fetchRecipes = async (recipeId: string): Promise<Recipe> => {
  const response = await axios.get(`recipe/${recipeId}`);
  return response.data as Recipe;
};

const useGetRecipe = (recipeId: string) => {
  const { isLoading, data, error } = useQuery<Recipe>({
    queryKey: ['recipe', recipeId],
    queryFn: () => fetchRecipes(recipeId),
  });

  return {
    recipe: data,
    loading: isLoading,
    error,
  };
};

export { useGetRecipe };
