import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const getGreeting = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BC_API_URL}/greeting`
      );
      const { greeting } = await response.json();
      console.log('Greeting: ', greeting);
      setGreeting(greeting);
    };

    getGreeting();
  }, []);

  return <div className="btn">{greeting}</div>;
}

export default App;
