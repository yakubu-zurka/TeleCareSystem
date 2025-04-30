import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg p-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* 🏥 Logo */}
        <Link to="/" className="text-3xl font-extrabold text-blue-600">
          TeleCare
        </Link>

        {/* 🌍 Desktop Navigation */}
        <ul className="hidden md:flex space-x-8">
          {[
            { path: "/", label: "Home" },
            { path: "/services", label: "Services" },
            { path: "/about", label: "About" },
            { path: "/contact", label: "Contact" },
          ].map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `relative text-lg font-medium transition duration-300 ${
                    isActive
                      ? "text-blue-600 after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-600 after:rounded-full"
                      : "text-gray-800 hover:text-green-600"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* 🔑 Auth Buttons (Desktop) */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="text-blue-600 border border-blue-600 px-5 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* 📱 Mobile Menu Button */}
        <button
          className="md:hidden text-blue-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* 📌 Mobile Navigation */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-5">
          <button
            onClick={() => setIsOpen(false)}
            className="text-blue-600 focus:outline-none"
          >
            <FiX size={32} />
          </button>
        </div>

        <ul className="flex flex-col items-center space-y-6 mt-10 text-xl">
          {[
            { path: "/", label: "Home" },
            { path: "/services", label: "Services" },
            { path: "/about", label: "About" },
            { path: "/contact", label: "Contact" },
          ].map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `block py-2 text-2xl font-semibold transition duration-300 ${
                    isActive ? "text-blue-400 border-blue-300" : "text-gray-800 hover:text-green-600"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
          {/* 🔑 Auth Buttons (Mobile) */}
          <li>
            <Link
              to="/login"
              className="block text-center text-blue-600 border border-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="block text-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
