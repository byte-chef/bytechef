import './index.css';
import Header from './components/Header/Header';
import RecipeMain from './components/RecipeMain/RecipeMain';
import RecipeCard from './components/RecipeCard/RecipeCard';
import React from 'react';
import { Recipe } from './types/recipe.ts';
import GenerateOverlay from './components/GenerateOverlay/GenerateOverlay.tsx';
import { useUser } from './hooks/useUser.ts';
import axios from 'axios';

const sampleRecipe: Recipe = {
  name: 'Banana Floaties',
  id: '12345',
  servings: 4,
  description:
    'Ice cream that reminds you of swimming arm floaties.Ice cream that reminds you of swimming arm floaties.',
  time: '15 minutes',
  ingredients: [
    '3 bananas, peeled and sliced',
    '8 large marshmallows',
    '1 quart vanilla ice cream',
    '4 tbsp chocolate syrup',
  ],
  instructions: [
    'JUICES Combine the orange juice, lemon juice and sugar, then divide among tall chilled glasses.',
    'BANANA "ICE CREAM" With a fork, mash together the bananas, sugar, vanilla, almond flavoring and half ‘n’ half. Divide among the glasses and refrigerate while whipping the cream.',
    'WHIPPED CREAM Whip the cream and sugar until soft peaks form, then dollop atop the banana mixture.',
    'Serve immediately and enjoy!',
  ],
  imagePrompt:
    'A bowl of ice cream topped with bananas, marshmallows, and choclate syrup, with a swimming pool in the background',
  imageUrl:
    'https://www.thespruceeats.com/thmb/3QatTcsVjKeDVCD-rIeUa4fSRAs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/perfect-banana-split-recipe-305712-hero-01-ef0482a539394da0b5ba64ade0c73b98.jpg',
};

function App() {
  const [recipes, setRecipes] = React.useState<Recipe[]>([sampleRecipe]);
  const [featuredRecipe, setFeaturedRecipe] =
    React.useState<Recipe>(sampleRecipe);
  const [showGeneratePrompt, setShowGeneratePrompt] =
    React.useState<boolean>(false);
  const { user } = useUser();

  React.useEffect(() => {
    console.log('In useEffect');

    const getRecipes = async () => {
      if (!user) return;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BC_API_URL}/recipes`,
          {
            withCredentials: true,
          }
        );

        const returnedRecipes = response.data as Recipe[];
        setRecipes(returnedRecipes);

        //type guarding lastRecipe
        const lastRecipe = returnedRecipes.at(-1);

        if (lastRecipe) {
          setFeaturedRecipe(lastRecipe);
        } else {
          setShowGeneratePrompt(true);
        }
      } catch (error) {
        console.error('Error fetching recipes.');
      }
    };

    if (!user) {
      setRecipes([sampleRecipe]);
      setFeaturedRecipe(sampleRecipe);
    }
    getRecipes();

    return () => {
      setRecipes([sampleRecipe]);
      setFeaturedRecipe(sampleRecipe);
    };
  }, [user]);

  const handleGenerate = (newRecipe: Recipe) => {
    setFeaturedRecipe(newRecipe);
    setShowGeneratePrompt(false);
    setRecipes((recipes) => {
      return [...recipes, newRecipe];
    });
  };

  return (
    <>
      <div className="border-b-2 border-slate-200 drop-shadow-md bg-gray-200 z-10 sticky top-0">
        <Header onGenerateClicked={() => setShowGeneratePrompt(true)} />
      </div>
      {showGeneratePrompt && (
        <GenerateOverlay
          onGenerate={handleGenerate}
          onClose={() => setShowGeneratePrompt(false)}
        />
      )}
      <RecipeMain recipe={featuredRecipe} />
      <div className="flex flex-wrap justify-between gap-2 maxW mb-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onSelect={() => {
              setFeaturedRecipe(recipe);
              window.scrollTo(0, 0);
            }}
          />
        ))}
      </div>
    </>
  );
}

export default App;
