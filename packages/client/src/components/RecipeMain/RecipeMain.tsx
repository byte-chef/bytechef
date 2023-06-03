import { Recipe } from '../../types/recipe';
import CustomButton from '../CustomButton/CustomButton';

interface RecipeProps {
  recipe: Recipe;
}

const RecipeMain = ({ recipe }: RecipeProps) => {
  if (!recipe) {
    return <span>Loading...</span>;
  }

  return (
    <article aria-label={`Recipe for ${recipe.name}`} className="mb-10">
      <div className="flex flex-col flex-wrap maxW px-3 py-6">
        <div className=" text-start mx-auto rounded-md overflow-hidden shadow-md">
          <img
            src={recipe.imageUrl}
            alt={`Image for ${recipe.name}`}
            className="w-full sm:max-h-[600px] bg-white drop-shadow-md object-cover"
          />
          <div className="flex pt-10 bg-white flex-col p-5">
            <div className="">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="md:w-4/5">
                  <h2 className="text-4xl font-semibold mb-5">{recipe.name}</h2>
                  {/* <p className="prose prose-stone prose-sm text-custom_red">
                    Generated on Wednesday, June 1st, 2023
                  </p> */}
                  <p className="min-h-min my-2 text-xl prose prose-stone">
                    {recipe.description}
                  </p>
                </div>
                <div className="w-full md:w-1/6 justify-items-end  flex flex-col gap-3">
                  <CustomButton className="btn-red">Delete</CustomButton>
                  <CustomButton variant="outlined" className="btn-slate">
                    Like
                  </CustomButton>
                  <CustomButton variant="outlined" className="btn-slate">
                    Print
                  </CustomButton>
                  <CustomButton variant="outlined" className="btn-slate">
                    Share
                  </CustomButton>
                </div>
              </div>
            </div>
            <div className="w-100% border-y-2 border-custom_red border-dashed max-auto my-5 py-5">
              <h4>Time: {recipe.time} minutes</h4>
              <h4>Servings: {recipe.servings}</h4>
            </div>
            <div className="w-100% border-b-2 border-custom_red border-dashed max-auto pb-10 my-5">
              <h3 className="text-2xl font-semibold mb-5">Ingredients</h3>
              <ul className="prose prose-stone">
                {recipe.ingredients.map(function (ingredient, index) {
                  return <li key={index}>{ingredient}</li>;
                })}
              </ul>
            </div>
            <div className="w-fit max-auto">
              <h3 className="text-2xl font-semibold">Instructions</h3>
              <ul className="prose prose-stone">
                {recipe.instructions.map(function (instruction, index) {
                  return (
                    <li key={index}>
                      <h4>Step {index + 1}</h4>
                      <p>{instruction}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
export default RecipeMain;
