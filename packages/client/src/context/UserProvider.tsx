import axios from 'axios';
import React from 'react';
import AuthModal from '../components/AuthModal/AuthModal';

export interface UserData {
  id: string;
  displayName: string;
  email: string;
}

export interface UserContext {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}

export const UserContext = React.createContext<UserContext>({
  user: null,
  setUser: () => null,
});

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<UserData | null>(null);

  React.useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BC_API_URL}/auth/user`,
          { withCredentials: true }
        );
        setUser(data);
      } catch (error) {
        console.log('Please sign in to generate recipes.');
      }
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AuthModal />
      {children}
    </UserContext.Provider>
  );
};
