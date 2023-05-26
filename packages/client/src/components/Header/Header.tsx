const Header = () => {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-cyan-600 0">
        <span className="font-semibold text-2xl tracking-tight">Byte-Chef</span>

        <div className="text-sm font-semibold flex justify-end lg:flex-grow">
          <a
            href=""
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-yellow-200 mr-4"
          >
            Generate New Recipe
          </a>
          <a
            href="#"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-yellow-200"
          >
            Logout
          </a>
        </div>
      </nav>
    </>
  );
};

export default Header;
