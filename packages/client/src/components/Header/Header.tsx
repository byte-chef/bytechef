import logoUrl from '../../assets/bc-logo2.png';

const Header = () => {
  return (
    <header className="flex justify-center flex-wrap flex-col md:flex-row md:justify-between maxW">
      <div className="flex justify-center items-center p-2">
        <img src={logoUrl} className="h-8 md:h-10"></img>
        <span className="font-semibold font-mono text-gray-600 md:text-2xl tracking-tight pl-2">
          Byte-Chef
        </span>
      </div>
      <nav className="flex justify-center flex-wrap flex-col">
        <div className="text-xs md:text-sm font-semibold flex justify-center">
          <button className="btn btn-red md: mt-1">Generate</button>
          <button className="btn btn-slate md:mt-1 mx-4">Logout</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
