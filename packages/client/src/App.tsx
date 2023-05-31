import './index.css';
import Header from './components/Header/Header';
import Recipe from './components/Recipe/Recipe';
import RecipeCard from './components/RecipeCard/RecipeCard';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

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

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Recipe />
        <RecipeCard />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
