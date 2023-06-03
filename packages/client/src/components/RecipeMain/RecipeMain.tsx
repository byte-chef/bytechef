import { Recipe } from '../../types/recipe';

interface RecipeProps {
  recipe: Recipe;
}

const RecipeMain = ({ recipe }: RecipeProps) => {
  if (!recipe) {
    return <span>Loading...</span>;
  }

  return (
    <article aria-label={`Recipe for ${recipe.name}`} className="mb-10">
      <div className="flex flex-col flex-wrap">
        <div className="w-fit">
          <img
            src="https://www.thespruceeats.com/thmb/3QatTcsVjKeDVCD-rIeUa4fSRAs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/perfect-banana-split-recipe-305712-hero-01-ef0482a539394da0b5ba64ade0c73b98.jpg"
            alt={`Image for ${recipe.name}`}
            className="mx-auto w-2/3 min-h-fit mt-10 bg-white drop-shadow-md"
          ></img>
        </div>
        <div className="w-2/3 text-start mx-auto ">
          <div className="flex pt-10 bg-white flex-col p-5">
            <div className="">
              <div className="md:flex justify-between">
                <div className="md:w-4/5">
                  <h2 className="text-4xl font-semibold mb-5">{recipe.name}</h2>
                  <p className="prose prose-stone prose-sm text-custom_red">
                    Generated on Wednesday, June 1st, 2023
                  </p>
                  <p className="min-h-min my-2 text-xl prose prose-stone">
                    {recipe.description}
                  </p>
                </div>
                <div className="md:w-1/6 justify-items-end  flex flex-col gap-3">
                  <button className="btn-red">Delete</button>
                  <button className="btn-slate">Like</button>
                  <button className="btn-slate">Print</button>
                  <button className="btn-slate">Share</button>
                </div>
              </div>
            </div>
            <div className="w-100% border-y-2 border-custom_red border-dashed max-auto my-5 py-5">
              <h4>Prep Time:</h4>
              <h4>Cook Time:</h4>
              <h4>Total Time:</h4>
              <h4>Serving:</h4>
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
