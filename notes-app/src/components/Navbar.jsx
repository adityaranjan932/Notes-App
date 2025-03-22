import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-gradient-to-r from-blue-900 to-black border-b-2 border-gray-500 p-4 flex justify-center space-x-10 shadow-lg">
      <NavLink
        to="/"
        className="text-white text-lg font-semibold hover:text-gray-300 transition duration-300"
      >
        Home
      </NavLink>
      <NavLink
        to="/pastes"
        className="text-white text-lg font-semibold hover:text-gray-300 transition duration-300"
      >
        Pastes
      </NavLink>
    </nav>
  );
};

export default Navbar;
