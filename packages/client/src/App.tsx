import { useEffect, useState } from 'react';
import './index.css';
import Header from './components/Header/Header';
import Recipe from './components/Recipe/Recipe';
import RecipeCard from './components/RecipeCard/RecipeCard';
import GenerateOverlay from './components/GenerateOverlay/GenerateOverlay';
import Modal from './components/Modal/Modal';
import AuthModal from './components/AuthModal/AuthModal';

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
      <Header />
      <Recipe />
      <GenerateOverlay onGenerate={(recipe) => console.log(recipe)} />
      <RecipeCard />
    </>
  );
}

export default App;
