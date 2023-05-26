import logoUrl from '../../assets/bc-logo2.png'

const Header = () => {
  return (
    <header className="flex flex-wrap justify-center phone:justify-between">
      <div className = "flex items-center p-2">
          <img src={logoUrl} className="h-10"></img>
          <span className="font-semibold font-mono text-gray-600 phone:text-2xl tracking-tight pl-2">Byte-Chef</span>
        </div>
      <nav className="flex">
        
        <div className="text-sm font-semibold flex justify-center tablet: h-10">
          <button
            
            className="btn btn-red block tablet: mt-2"
          >
            Generate
          </button>
          <button
            
            className="btn btn-slate mt-2 mx-4"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
