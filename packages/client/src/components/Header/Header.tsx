import axios from 'axios';
import { useUser } from '../../hooks/useUser';
import CustomButton from '../CustomButton/CustomButton';

interface HeaderProps {
  onGenerateClicked: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGenerateClicked }) => {
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BC_API_URL}/auth/signout`,
        null,
        {
          withCredentials: true,
        }
      );
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="flex justify-center items-center flex-wrap flex-col md:flex-row md:justify-between maxW">
      <div className="flex justify-center items-center p-2">
        <img src="/images/bc-logo2.png" className="h-8 md:h-10"></img>
        <span className="font-semibold font-mono text-gray-600 md:text-2xl tracking-tight pl-2">
          Byte-Chef
        </span>
      </div>
      <nav className="flex justify-center items-center h-full">
        <div className="text-xs md:text-sm font-semibold flex justify-center gap-4 items-center h-full">
          <CustomButton onClick={() => onGenerateClicked()}>
            Generate
          </CustomButton>
          {user && (
            <CustomButton onClick={handleLogout} variant="outlined">
              Logout
            </CustomButton>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
