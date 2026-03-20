import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, setIsOpen, currentPath }) => {
  const { logout } = useAuth();
  
  const routes = [
    { name: 'Dashboard', path: '/dashboard', icon: 'fa-chart-pie', color: 'text-teal-400' },
    { name: 'Family', path: '/family', icon: 'fa-users', color: '' },
    { name: 'Medications', path: '/medications', icon: 'fa-pills', color: '', hasIndicator: true },
    { name: 'Appointments', path: '/appointments', icon: 'fa-calendar-check', color: '' },
    { name: 'Medical Records', path: '/records', icon: 'fa-folder-open', color: '' },
    { name: 'Hospitals', path: '/hospitals', icon: 'fa-hospital', color: '' },
    { name: 'Community', path: '/forum', icon: 'fa-globe', color: '' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`fixed lg:relative top-0 left-0 z-50 h-full bg-gradient-to-b from-sidebarTop to-sidebarBottom text-white flex flex-col transform transition-[width,transform] duration-300 ease-in-out lg:translate-x-0 overflow-hidden shrink-0 group ${isOpen ? 'translate-x-0 w-[260px]' : '-translate-x-full w-[260px] lg:w-[80px] hover:lg:w-[260px]'}`}>
        
        {/* Brand Header */}
        <div className="h-[70px] flex items-center justify-between px-6 border-b border-white/10 shrink-0">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-400 to-blue-400 flex items-center justify-center shadow-lg">
                <i className="fa-solid fa-notes-medical text-white text-sm"></i>
            </div>
            <span className="text-xl font-bold tracking-wide lg:opacity-0 group-hover:lg:opacity-100 transition-opacity duration-300 whitespace-nowrap">Medley</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-blue-200 hover:text-white">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <p className="px-3 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2 lg:opacity-0 group-hover:lg:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden">Main Menu</p>
          
          {routes.map((route) => {
            const isActive = currentPath === route.path || currentPath.startsWith(route.path + '/');
            return (
              <Link
                key={route.path}
                to={route.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-white/10 text-white border-l-4 border-secondary font-medium' 
                    : 'text-blue-100 hover:bg-white/5 hover:text-white font-medium'
                }`}
              >
                <div className="relative shrink-0">
                  <i className={`fa-solid ${route.icon} w-5 text-center ${isActive ? route.color : ''}`}></i>
                  {route.hasIndicator && (
                     <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-400"></span>
                  )}
                </div>
                <span className="lg:opacity-0 group-hover:lg:opacity-100 transition-opacity duration-300 whitespace-nowrap">{route.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-1">
          <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-blue-100 hover:bg-white/5 hover:text-white transition-all overflow-hidden">
              <i className="fa-regular fa-user w-5 text-center shrink-0"></i>
              <span className="font-medium lg:opacity-0 group-hover:lg:opacity-100 transition-opacity duration-300 whitespace-nowrap">Profile</span>
          </Link>
          <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-blue-100 hover:bg-white/5 hover:text-white transition-all overflow-hidden">
              <i className="fa-solid fa-gear w-5 text-center shrink-0"></i>
              <span className="font-medium lg:opacity-0 group-hover:lg:opacity-100 transition-opacity duration-300 whitespace-nowrap">Settings</span>
          </Link>
          <button onClick={logout} className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-blue-100 hover:bg-white/5 hover:text-white transition-all overflow-hidden">
              <i className="fa-solid fa-right-from-bracket w-5 text-center text-red-400 shrink-0"></i>
              <span className="font-medium lg:opacity-0 group-hover:lg:opacity-100 transition-opacity duration-300 whitespace-nowrap">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
