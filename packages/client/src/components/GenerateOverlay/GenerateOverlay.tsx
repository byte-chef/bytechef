import React from 'react';
import TextField from '../TextField/TextField';
import DynamicList from '../DynamicList/DynamicList';

interface GenerateOptions {
  ingredients: string[];
  allowOtherIngredients: boolean;
  cuisine?: string;
  theme?: string;
  servings?: number;
}

const GenerateOverlay = () => {
  const [generateOptions, setGenerateOptions] = React.useState<GenerateOptions>(
    {
      ingredients: [],
      allowOtherIngredients: true,
      cuisine: undefined,
      theme: undefined,
      servings: undefined,
    }
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setGenerateOptions({
      ...generateOptions,
      [key]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const submission = { ...generateOptions };
    if (!submission.cuisine) delete submission.cuisine;
    if (!submission.theme) delete submission.theme;
    if (!submission.servings) delete submission.servings;

    console.log(submission);
  };

  return (
    <div className="relative z-20 m-1">
      <div className="absolute max-w-[95%] w-[400px] min-h-[300px] bg-slate-100 top-0 shadow-md left-0 p-6 md:w-auto md:max-w-auto rounded-lg">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h2 className="mb-2 md:text-left">Generate New Recipe</h2>
          <div className="flex flex-col gap-6 md:flex-row ">
            <div className="flex flex-col gap-2  md:min-w-[300px]">
              <DynamicList
                label="Ingredients"
                values={generateOptions.ingredients}
                onChange={(values) =>
                  setGenerateOptions({
                    ...generateOptions,
                    ingredients: values,
                  })
                }
              />
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="allow-other-ingredients"
                  checked={generateOptions.allowOtherIngredients}
                  onChange={(event) =>
                    setGenerateOptions({
                      ...generateOptions,
                      allowOtherIngredients: event.target.checked,
                    })
                  }
                />
                <label
                  htmlFor="allow-other-ingredients"
                  className="text-sm font-medium text-gray-900 dark:text-white"
                >
                  Allow other ingredients
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:min-w-[300px]">
              <TextField
                label="Cuisine"
                value={generateOptions.cuisine}
                onChange={(event) => handleChange(event, 'cuisine')}
              />
              <TextField
                label="Theme"
                value={generateOptions.theme}
                onChange={(event) => handleChange(event, 'theme')}
              />
              <TextField
                label="Servings"
                value={generateOptions.servings}
                onChange={(event) => handleChange(event, 'servings')}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mt-4"
          >
            Generate
          </button>
        </form>
      </div>
    </div>
  );
};

export default GenerateOverlay;
