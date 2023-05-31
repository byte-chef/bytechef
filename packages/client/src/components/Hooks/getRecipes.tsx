import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

//fetching recipes for users based on its login id
const fetchRecipes = async (loginId: string) => {
  const response = await axios.get(`api/users/${loginId}`);
  return response;
};

const useRecipes = (loginId: string) => {
  return useQuery(['recipes', loginId], () => fetchRecipes(loginId));
};

export { useRecipes };
