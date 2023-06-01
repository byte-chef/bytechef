import React from 'react';
import TextField from '../TextField/TextField';
import DynamicList from '../DynamicList/DynamicList';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';
import axios from 'axios';
import CustomButton from '../CustomButton/CustomButton';

interface GenerateOptions {
  ingredients: string[];
  allowOtherIngredients: boolean;
  cuisine?: string;
  theme?: string;
  servings?: number;
}

interface GenerateOverlayProps {
  onGenerate: (recipe: any) => void;
}

const GenerateOverlay: React.FC<GenerateOverlayProps> = ({ onGenerate }) => {
  const [loadingRecipe, setLoadingRecipe] = React.useState(false);
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoadingRecipe(true);

    const submission = { ...generateOptions };
    if (!submission.cuisine) delete submission.cuisine;
    if (!submission.theme) delete submission.theme;
    if (!submission.servings) delete submission.servings;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BC_API_URL}/generate`,
        submission,
        {
          timeout: 60000,
        }
      );

      setLoadingRecipe(false);
      onGenerate(response.data);
    } catch (error) {
      console.log(error);
      setLoadingRecipe(false);
    }
  };

  return (
    <div className="relative z-20 m-1">
      <div className="absolute max-w-[95%] w-[400px] min-h-[300px] bg-slate-100 top-0 shadow-md left-0 p-6 md:w-auto md:max-w-auto rounded-lg">
        <LoadingOverlay loading={loadingRecipe} message="Generating...">
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
                  type="number"
                  value={generateOptions.servings}
                  onChange={(event) => handleChange(event, 'servings')}
                />
              </div>
            </div>
            <CustomButton type="submit">Generate</CustomButton>
          </form>
        </LoadingOverlay>
      </div>
    </div>
  );
};

export default GenerateOverlay;
