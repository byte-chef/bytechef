import React from 'react';
import { UserContext } from '../context/UserProvider';

export const useUser = () => {
  const { user, setUser } = React.useContext(UserContext);
  return { user, setUser };
};
