import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ResponsiveMenu = ({ showMenu, NavLinks }) => {
  const { user, logout } = useAuth();

  const getLinkComponent = (data) => {
    switch (data.name) {
      case "LOGIN":
        return (
          <Link to="/login" className='block hover:text-primary transition-all dark:text-white dark:hover:text-primary dark:border-b dark:border-transparent dark:hover:border-primary'>
            {data.name}
          </Link>
        );
      case "SIGNUP":
        return (
          <Link to="/signup" className='block hover:text-primary transition-all dark:text-white dark:hover:text-primary dark:border-b dark:border-transparent dark:hover:border-primary'>
            {data.name}
          </Link>
        );
      case "CARS":
        return (
          <Link to="/cars" className='block hover:text-primary transition-all dark:text-white dark:hover:text-primary dark:border-b dark:border-transparent dark:hover:border-primary'>
            {data.name}
          </Link>
        );
      case "ABOUT":
        return (
          <Link to="/about" className='block hover:text-primary transition-all dark:text-white dark:hover:text-primary dark:border-b dark:border-transparent dark:hover:border-primary'>
            {data.name}
          </Link>
        );
      case "BOOKING":
        return (
          <Link to="/booking" className='block hover:text-primary transition-all dark:text-white dark:hover:text-primary dark:border-b dark:border-transparent dark:hover:border-primary'>
            {data.name}
          </Link>
        );
      default:
        return (
          <a href={data.link} className='block hover:text-primary transition-all dark:text-white dark:hover:text-primary dark:border-b dark:border-transparent dark:hover:border-primary'>
            {data.name}
          </a>
        );
    }
  };

  return (
    <div
      className={`${showMenu ? "left-0" : "-left-full"} fixed top-0 z-50 bg-white dark:bg-gray-900 h-screen w-[75%] md:hidden rounded-r-xl shadow-md flex flex-col justify-between px-8 pb-6 pt-16 transition-all duration-300`}
    >
      <div>
        {/* User Info */}
        <div className='flex items-center gap-3 mb-8'>
          <FaUserCircle size={50} />
          <div>
            <h1>{user ? `Hello, ${user.name}` : 'Hello User'}</h1>
            <h1 className='text-sm text-gray-500 dark:text-gray-400'>{user ? user.email : 'Premium User'}</h1>
          </div>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className='space-y-6 text-xl font-medium'>
            {NavLinks.map((data) => (
              <li key={data.id}>
                {getLinkComponent(data)}
              </li>
            ))}
            {user && (
              <li>
                <Link to="/my-bookings" className='block hover:text-primary transition-all dark:text-white dark:hover:text-primary dark:font-bold dark:border-b dark:border-primary'>
                  Manage Bookings
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Footer */}
      <div className='text-sm text-center'>
        Made with ❤️ by <a href="https://github.com/mdkhalidgithub" className='underline'>MD KHALID</a>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
