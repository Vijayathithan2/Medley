import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
    setIsDark(!isDark);
  };

  return (
    <header className="h-[70px] bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-8 z-10 shrink-0">
      {/* Mobile Menu Button & Search */}
      <div className="flex items-center gap-6 flex-1">
          <button onClick={toggleSidebar} className="lg:hidden text-gray-500 hover:text-primary transition-colors">
              <i className="fa-solid fa-bars text-xl"></i>
          </button>
          
          <div className="relative w-full max-w-md hidden sm:block">
              <i className="fa-solid fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input 
                type="text" 
                placeholder="Search doctors, hospitals, medicines..." 
                className="w-full bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-teal-300 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-teal-100 rounded-full py-2.5 pl-11 pr-4 text-sm outline-none transition-all shadow-sm dark:text-gray-100"
              />
          </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-5">
          <button onClick={toggleTheme} className="text-gray-400 hover:text-primary transition-colors w-10 h-10 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 flex flex-col items-center justify-center">
              {isDark ? <i className="fa-regular fa-sun text-lg"></i> : <i className="fa-regular fa-moon text-lg"></i>}
          </button>
          
          <div className="relative">
              <button className="text-gray-400 hover:text-primary transition-colors w-10 h-10 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-center relative">
                  <i className="fa-regular fa-bell text-lg"></i>
                  <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
              </button>
          </div>

          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

          <button className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full p-1 pr-3 transition-all">
              <img src="https://i.pravatar.cc/150?u=a042581f4e" alt="User Avatar" className="w-9 h-9 rounded-full object-cover border-2 border-teal-100 dark:border-teal-900" />
              <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 leading-tight capitalize">{user?.firstName || 'Sarah'} {user?.lastName || 'Jenkins'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role || 'Premium Plan'}</p>
              </div>
              <i className="fa-solid fa-chevron-down text-gray-400 text-xs hidden sm:block ml-1"></i>
          </button>
      </div>
    </header>
  );
};

export default Navbar;
