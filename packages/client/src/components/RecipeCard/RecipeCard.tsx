import { Recipe } from '../../types/recipe.ts';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: () => void;
}

const RecipeCard = ({ recipe, onSelect }: RecipeCardProps) => {
  return (
    <div
      className="mx-auto hover:scale-105 cursor-pointer transition-all duration-200"
      onClick={() => onSelect()}
    >
      <div className="relative w-72 bg-custom_white">
        <img
          src={recipe.imageUrl}
          className="h-4/7 drop-shadow-md rounded-md"
        ></img>
        <a>
          <img
            src="/images/love.png"
            className="absolute right-2 top-2"
            width="28"
          ></img>
        </a>
        <div className="h-32 py-2 text-start">
          <div className="flex justify-between mb-2">
            <p className="text-custom_red font-semibold">
              {recipe.servings} servings ({recipe.time} mins)
            </p>
            {/* <p>282 likes</p> */}
          </div>
          <h3 className="hover:border-custom_red hover:border-b-2">
            {recipe.name}
          </h3>
        </div>
      </div>
    </div>
  );
};
export default RecipeCard;
