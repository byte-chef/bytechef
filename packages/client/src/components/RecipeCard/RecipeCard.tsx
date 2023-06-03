import heart from '../../assets/love.png';
import { Recipe } from '../../types/recipe.ts';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="mx-auto ">
      <div className="relative w-72 h-80 bg-custom_white">
        <img src={recipe.imageUrl} className="h-4/7 drop-shadow-md"></img>
        <a>
          <img src={heart} className="absolute right-2 top-2" width="28"></img>
        </a>
        <p className="h-32 py-2 line-clamp-5 text-start">
          <div className="flex justify-between mb-2">
            <p className="text-custom_red font-semibold">
              {recipe.servings} servings ({recipe.time} mins)
            </p>
            <p>282 likes</p>
          </div>
          <h3 className="hover:border-custom_red hover:border-b-2">
            {recipe.name}
          </h3>
        </p>
      </div>
    </div>
  );
};
export default RecipeCard;
