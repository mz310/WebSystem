// src/components/Navbar.js

import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Navbar = () => {
  const { isAuthenticated, userId, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Home
        </Link>

        <button
          onClick={toggleMenu}
          className="text-white block md:hidden focus:outline-none"
        >
          ☰
        </button>

        <div className={`flex space-x-4 ${isOpen ? "block" : "hidden"} md:flex`}>
        
          {/* Conditionally render User Places if user is authenticated */}
          {isAuthenticated && (
            <Link to={`/user-places/${userId}`} className="text-white hover:text-blue-200">
              User Places
            </Link>
          )}

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-white hover:text-blue-200">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:text-blue-200">
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="text-white hover:text-blue-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
