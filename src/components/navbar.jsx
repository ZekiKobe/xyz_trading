import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGlobe } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation(); // Get the current route

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#0a0f1f] text-white shadow-md">
      {/* Left Section - Logo & Links */}
      <div className="flex items-center space-x-8">
        <img src="/src/assets/logo.png" alt="Uniswap" className="h-8" />

        <div className="md:flex space-x-6 text-gray-400">
          <Link
            to="/home"
            className={`pb-1 ${
              location.pathname === "/home" ? "text-green-400 border-b-2 border-green-400" : "hover:text-white"
            }`}
          >
            Home
          </Link>

          <Link
            to="/staking"
            className={`pb-1 ${
              location.pathname === "/staking" ? "text-green-400 border-b-2 border-green-400" : "hover:text-white"
            }`}
          >
            Staking
          </Link>

          <Link
            to="/news"
            className={`pb-1 ${
              location.pathname === "/news" ? "text-green-400 border-b-2 border-green-400" : "hover:text-white"
            }`}
          >
            News
          </Link>
        </div>
      </div>

      {/* Right Section - Welcome, Menu, Profile */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 bg-[#131c35] px-4 py-2 rounded-full">
          <span className="text-sm">🔊 Welcome to the XYZ Trading platform</span>
        </button>

        {/* Clickable Avatar - Navigate to Profile Page */}
        <Link to="/profile">
          <img
            src="/src/assets/user.png"
            alt="Profile"
            className="h-8 w-8 rounded-full cursor-pointer"
          />
        </Link>

        <FaGlobe className="text-green-400 text-xl cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;
