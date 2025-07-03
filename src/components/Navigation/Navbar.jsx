import React, { useState } from 'react';
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import ResponsiveMenu from "./ResponsiveMenu.jsx";

const NavLinks = [
  { id: "1", name: "HOME", link: "/#" },
  { id: "2", name: "CARS", link: "/#cars" },
  { id: "3", name: "ABOUT", link: "/#about" },
  { id: "4", name: "BOOKING", link: "/booking" },
  { id: "5", name: "LOGIN", link: "/login" },
  { id: "6", name: "SIGNUP", link: "/signup" },
];

const Navbar = ({ theme, setTheme }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className='shadow-md bg-white dark:bg-dark dark:text-white duration-300 relative z-40'>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className='text-3xl font-bold font-serif'>CarRental</h1>

          {/* Desktop Menu */}
          <ul className='hidden md:flex items-center gap-8'>
            {NavLinks.map((data) => (
              <li key={data.id}>
                {data.name === "LOGIN" ? (
                  <Link
                    to="/login"
                    className='py-4 px-3 hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500 text-lg font-medium dark:text-white dark:hover:text-primary dark:border dark:border-transparent dark:hover:border-primary'
                    className='py-4 hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500 text-lg font-medium dark:text-white dark:hover:text-primary'
                  >
                    {data.name}
                  </Link>
                ) : data.name === "CARS" ? (
                  <Link
                    to="/cars"
                    className='py-4 hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500 text-lg font-medium dark:text-white dark:hover:text-primary'
                  >
                    {data.name}
                  </Link>
                ) : data.name === "ABOUT" ? (
                  <Link
                    to="/about"
                    className='py-4 hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500 text-lg font-medium dark:text-white dark:hover:text-primary'
                  >
                    {data.name}
                  </Link>
                ) : data.name === "SIGNUP" ? (
                  <Link
                    to="/signup"
                    className='py-4 hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500 text-lg font-medium dark:text-white dark:hover:text-primary'
                  >
                    {data.name}
                  </Link>
                ) : data.name === "BOOKING" ? (
                  <Link
                    to="/booking"
                    className='py-4 hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500 text-lg font-medium dark:text-white dark:hover:text-primary'
                  >
                    {data.name}
                  </Link>
                ) : (
                  <a
                    href={data.link}
                    className='py-4 hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500 text-lg font-medium dark:text-white dark:hover:text-primary'
                  >
                    {data.name}
                  </a>
                )}
              </li>
            ))}
            {user && (
              <>
                <li>
                  <Link
                    to="/my-bookings"
                    className='py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 text-lg font-medium dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700'
                  >
                    Manage Bookings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className='py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300 text-lg font-medium dark:bg-red-600 dark:text-white dark:hover:bg-red-700'
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>

          {/* Theme Toggle & Mobile Menu Icon */}
          <div className="flex items-center gap-4">
            {theme === "dark" ? (
              <BiSolidSun onClick={() => setTheme("light")} className='text-2xl cursor-pointer' />
            ) : (
              <BiSolidMoon onClick={() => setTheme("dark")} className='text-2xl cursor-pointer' />
            )}
            {/* Mobile Menu Icon */}
            <div className='md:hidden'>
              {showMenu ? (
                <HiMenuAlt1 onClick={toggleMenu} size={30} className='cursor-pointer transition-all' />
              ) : (
                <HiMenuAlt3 onClick={toggleMenu} size={30} className='cursor-pointer transition-all' />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <ResponsiveMenu showMenu={showMenu} NavLinks={NavLinks} />
    </nav>
  );
};

export default Navbar;
