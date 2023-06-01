import React from 'react';

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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
