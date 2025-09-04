import { Link, useLocation } from 'react-router-dom';
import { Home, User, Users, Dumbbell, CreditCard, BarChart3 } from 'lucide-react';

const Sidebar = () => {
  const { pathname } = useLocation();

  const links = [
    { label: 'Dashboard', path: '/admin-dashboard', icon: <Home size={18} /> },
    { label: 'Admin Profile', path: '/admin-profile', icon: <User size={18} /> },
    { label: 'Members', path: '/admin-members', icon: <Users size={18} /> },
    { label: 'Coaches', path: '/admin-coaches', icon: <Dumbbell size={18} /> },
    { label: 'Plans', path: '/admin-plans', icon: <BarChart3 size={18} /> },
    { label: 'Payments', path: '/admin-payments', icon: <CreditCard size={18} /> },
    { label: 'Reports', path: '/admin-reports', icon: <BarChart3 size={18} /> },
  ];

  return (
    <div className="w-64 min-h-screen bg-[#0b0b0b] text-white px-6 py-8 border-r border-gray-800 shadow-lg">
      <div className="mb-10 text-center">
        <h1 className="text-2xl font-extrabold text-green-500">🏋️ Stamina Admin</h1>
        <p className="text-xs text-gray-500 mt-1 tracking-wider">Manage Everything</p>
      </div>

      <nav className="flex flex-col gap-2">
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              pathname === link.path
                ? 'bg-green-500 text-black'
                : 'text-gray-300 hover:bg-green-700 hover:text-white'
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
