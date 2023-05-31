import React from 'react';
import TextField from '../TextField/TextField';

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

  return (
    <div className="relative z-20">
      <div className="absolute min-w-[300px] min-h-[300px] bg-slate-100 top-0 shadow-md left-0 p-6">
        <form className="flex flex-col gap-3">
          <TextField
            label="Ingredients"
            value={generateOptions.ingredients.join(', ')}
            onChange={(event) =>
              setGenerateOptions({
                ...generateOptions,
                ingredients: event.target.value.split(', '),
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
        </form>
      </div>
    </div>
  );
};

export default GenerateOverlay;
