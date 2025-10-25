import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaConciergeBell, FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaCog, FaPaw } from 'react-icons/fa';

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const [imgError, setImgError] = useState(false);

  // Fallback avatar if image fails to load
  const handleImageError = () => {
    setImgError(true);
  };

  const getAvatarUrl = () => {
    if (imgError || !user?.avatar) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=0D8ABC&color=fff&size=200`;
    }
    return user.avatar;
  };

  return (
    <nav className="navbar bg-base-100 shadow-lg px-4 lg:px-8 sticky top-0 z-50 border-b-2 border-primary/20">
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
          <div className="bg-primary p-2 rounded-xl shadow-md">
            <FaPaw className="text-3xl text-white" />
          </div>
          <div>
            <span className="text-2xl font-bold text-primary">WarmPaws</span>
            <p className="text-xs text-gray-600 hidden lg:block font-medium">Pet Care Services</p>
          </div>
        </Link>
      </div>
      
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-2 hidden md:flex">
          <li>
            <Link to="/" className="font-semibold text-gray-800 hover:text-primary hover:bg-primary/10 rounded-xl transition-all flex items-center gap-2">
              <FaHome className="text-lg" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" className="font-semibold text-gray-800 hover:text-primary hover:bg-primary/10 rounded-xl transition-all flex items-center gap-2">
              <FaConciergeBell className="text-lg" />
              Services
            </Link>
          </li>
          <li>
            <Link to="/my-profile" className="font-semibold text-gray-800 hover:text-primary hover:bg-primary/10 rounded-xl transition-all flex items-center gap-2">
              <FaUser className="text-lg" />
              My Profile
            </Link>
          </li>
        </ul>

        <div className="ml-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              {/* User Avatar with Display Name on Hover */}
              <div className="dropdown dropdown-end">
                <label 
                  tabIndex={0} 
                  className="btn btn-ghost btn-circle avatar hover:ring-4 hover:ring-primary/20 transition-all group relative"
                  title={user?.displayName}
                >
                  <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 hover:scale-110 transition-transform overflow-hidden bg-primary/10">
                    <img 
                      src={getAvatarUrl()} 
                      alt={user?.displayName}
                      onError={handleImageError}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Tooltip showing display name on hover */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                    {user?.displayName}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                  </div>
                </label>
                <ul tabIndex={0} className="mt-3 z-[1] p-3 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-64 border-2 border-gray-200">
                  <li className="menu-title px-4 py-3 bg-primary/10 rounded-xl mb-2">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 rounded-full ring-2 ring-primary overflow-hidden bg-primary/10">
                          <img 
                            src={getAvatarUrl()} 
                            alt={user?.displayName}
                            onError={handleImageError}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="text-primary font-bold block text-sm">
                          {user?.displayName}
                        </span>
                        <span className="text-gray-600 text-xs block truncate">
                          {user?.email}
                        </span>
                      </div>
                    </div>
                  </li>
                  <div className="divider my-1"></div>
                  <li>
                    <Link to="/my-profile" className="hover:bg-primary/10 text-gray-800 rounded-xl flex items-center gap-2 py-3 font-medium">
                      <FaUser className="text-primary" />
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="hover:bg-primary/10 text-gray-800 rounded-xl flex items-center gap-2 py-3 font-medium">
                      <FaCog className="text-primary" />
                      Settings
                    </Link>
                  </li>
                  <div className="divider my-1"></div>
                  <li>
                    <button 
                      onClick={logout} 
                      className="hover:bg-error/10 text-error rounded-xl flex items-center gap-2 py-3 w-full text-left font-semibold"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-ghost btn-sm text-gray-800 hover:bg-primary/10 hover:text-primary rounded-xl flex items-center gap-2 font-semibold">
                <FaSignInAlt />
                <span className="hidden sm:inline">Login</span>
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all rounded-xl flex items-center gap-2 font-semibold">
                <FaUserPlus />
                <span className="hidden sm:inline">Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
