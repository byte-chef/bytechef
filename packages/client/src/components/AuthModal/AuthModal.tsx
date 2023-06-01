import React from 'react';
import { useUser } from '../../hooks/useUser';
import Modal from '../Modal/Modal';
import TextField from '../TextField/TextField';
import CustomButton from '../CustomButton/CustomButton';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';
import axios from 'axios';

const AuthModal = () => {
  const { user, setUser } = useUser();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [displayName, setDisplayName] = React.useState('');
  const [signIn, setSignIn] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (signIn) {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BC_API_URL}/auth/signin`,
          {
            email,
            password,
          },
          { withCredentials: true }
        );

        setUser(data);
      } else {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BC_API_URL}/auth/signup`,
          {
            email,
            password,
            displayName,
          },
          { withCredentials: true }
        );

        setUser(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={user === null} className="p-8 w-auto h-auto">
      <LoadingOverlay
        loading={loading}
        message={signIn ? 'Signing in...' : 'Signing up...'}
      >
        <form
          onSubmit={handleSubmit}
          className="w-[250px] h-full flex flex-col gap-4 items-center justify-center relative"
        >
          <p className="mb-6 ">
            {signIn
              ? 'Sign in with your existing account'
              : 'Sign up for a new account to start generating recipes!'}
          </p>
          {!signIn && (
            <TextField
              label="Display Name"
              className="w-full"
              required={!signIn}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          )}
          <TextField
            label="Email"
            className="w-full"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            className="w-full"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <CustomButton type="submit">
            {signIn ? 'Sign In' : 'Sign Up'}
          </CustomButton>
          <a
            onClick={() => setSignIn(!signIn)}
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
          >
            {signIn ? 'Create New Account' : 'Already have an account?'}
          </a>
        </form>
      </LoadingOverlay>
    </Modal>
  );
};

export default AuthModal;
