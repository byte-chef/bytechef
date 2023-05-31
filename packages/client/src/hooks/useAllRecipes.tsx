import axios from 'axios';
import { Recipe } from '../types/recipe.ts';
import { useQuery } from '@tanstack/react-query';

const fetchRecipes = async (): Promise<Recipe[]> => {
  const response = await axios.get(`${process.env.VITE_BC_API_URL}/recipe`);
  return response.data as Recipe[];
};

const useAllRecipes = () => {
  const { isLoading, data, error } = useQuery<Recipe[]>({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });

  return {
    recipes: data,
    loading: isLoading,
    error,
  };
};

export { useAllRecipes };
