import './index.css';
import Header from './components/Header/Header';
import Recipe from './components/RecipeMain/RecipeMain';
import RecipeCard from './components/RecipeCard/RecipeCard';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRecipe } from './hooks/useRecipe';

// Create a client
const queryClient = new QueryClient();

function App() {
  // const [greeting, setGreeting] = useState('');

  // useEffect(() => {
  //   const getGreeting = async () => {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_BC_API_URL}/greeting`
  //     );
  //     const { greeting } = await response.json();
  //     console.log('Greeting: ', greeting);
  //     setGreeting(greeting);
  //   };

  //   getGreeting();
  // }, []);

  // const [currentRecipeId, setCurrentRecipeId] = React.useState<Recipe>(null);

  // const handleGenerate = (recipe) => {

  //   setCurrentRecipe(recipe);
  // }

  // const handleSelect = ()

  // const handleSubmit = () => {
  //   e.preventDefault();
  //   const recipe = await axios.post();

  //   onGenerate(recipe);
  // }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="border-b-2 border-slate-200 drop-shadow-md z-10 sticky top-0">
          <Header />
        </div>
        <Recipe recipe={useRecipe('123').recipe} />
        <div className="flex flex-wrap justify-between gap-2 w-5/6 mx-auto">
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
