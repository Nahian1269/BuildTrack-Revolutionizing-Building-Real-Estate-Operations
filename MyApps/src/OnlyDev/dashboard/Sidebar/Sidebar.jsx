import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Hammer, LogOut } from 'lucide-react';

const Sidebar = ({ menuItems, userRole, userName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-slate-800 text-white w-64 min-h-screen flex flex-col">
      
      {/* Header Section */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-500 w-10 h-10 rounded-lg flex items-center justify-center">
            <Hammer className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg">BuildTrack</h2>
            <p className="text-slate-400 text-sm capitalize">{userRole} Portal</p>
          </div>
        </div>
        <div className="bg-slate-700 rounded-lg p-3">
          <p className="text-sm text-slate-300">Welcome back,</p>
          <p className="font-semibold">{userName}</p>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map(({ id, label, icon: Icon, path, badge }) => (
            <li key={id}>
              <button
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                  isActive(path)
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
                {badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Upgrade CTA */}
      <div className="p-4 border-t border-slate-700">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 text-center">
          <h4 className="font-bold text-sm mb-2">Upgrade to Pro</h4>
          <p className="text-xs text-blue-100 mb-3">Get advanced features and priority support</p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-blue-50 transition-colors">
            Learn More
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
