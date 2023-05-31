import { useQuery } from '@tanstack/react-query';
import { useRecipe } from '../../hooks/useRecipe';
import { Recipe } from '../../types/recipe';
import axios from 'axios';

interface RecipeProps {
  recipe: Recipe;
}

const RecipeMain = ({ recipe }: RecipeProps) => {
  if (!recipe) {
    return <span>Loading...</span>;
  }

  return (
    <article aria-label={`Recipe for ${recipe.name}`}>
      <div>picture</div>
      <div>
        <div>
          <div>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
          </div>
          <ul>Instructions of Recipe</ul>
        </div>
        <button>Delete this recipe</button>
        <button>Favorite this recipe</button>
      </div>
    </article>
  );
};
export default RecipeMain;
