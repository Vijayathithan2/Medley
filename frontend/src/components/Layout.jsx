import { useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="font-sans antialiased text-gray-800 dark:text-gray-100 bg-bglight dark:bg-gray-900 flex h-screen overflow-hidden selection:bg-teal-100 selection:text-teal-900">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} currentPath={location.pathname} />
      
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <Navbar toggleSidebar={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 h-[calc(100vh-70px)] custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
