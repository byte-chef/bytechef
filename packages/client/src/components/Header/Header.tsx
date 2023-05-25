import React from 'react';

const Header = () => {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-cyan-600 0 p-6">
        <div className="flex items-center flex-shrink-0 text-white font-mono mr-6">
          <span className="font-semibold text-2xl tracking-tight">
            Byte-Chef
          </span>
        </div>
        <div className="text-sm font-semibold flex justify-end lg:flex-grow">
          <a
            href=""
            className="block lg:inline-block lg:mt-0 text-teal-100 hover:text-yellow-200 mr-4"
          >
            Home
          </a>
          <a
            href=""
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-yellow-200 mr-4"
          >
            My Recipes
          </a>
          <a
            href="#"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-yellow-200"
          >
            Login
          </a>
        </div>
      </nav>
    </>
  );
};

export default Header;
