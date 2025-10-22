import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaConciergeBell, FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaCog, FaPaw } from 'react-icons/fa';

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar bg-white shadow-md px-4 lg:px-8 sticky top-0 z-50 border-b-2 border-primary/10">
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
          <div className="bg-primary p-2 rounded-xl">
            <FaPaw className="text-3xl text-white" />
          </div>
          <div>
            <span className="text-2xl font-bold text-primary">WarmPaws</span>
            <p className="text-xs text-gray-500 hidden lg:block">Pet Care Services</p>
          </div>
        </Link>
      </div>
      
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-2 hidden md:flex">
          <li>
            <Link to="/" className="font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-xl transition-all flex items-center gap-2">
              <FaHome className="text-lg" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" className="font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-xl transition-all flex items-center gap-2">
              <FaConciergeBell className="text-lg" />
              Services
            </Link>
          </li>
          <li>
            <Link to="/my-profile" className="font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-xl transition-all flex items-center gap-2">
              <FaUser className="text-lg" />
              My Profile
            </Link>
          </li>
        </ul>

        <div className="ml-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar hover:ring-4 hover:ring-primary/20 transition-all">
                  <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 hover:scale-110 transition-transform">
                    <img src={user?.avatar} alt={user?.displayName} />
                  </div>
                </label>
                <ul tabIndex={0} className="mt-3 z-[1] p-3 shadow-2xl menu menu-sm dropdown-content bg-white rounded-2xl w-56 border border-gray-100">
                  <li className="menu-title px-4 py-2">
                    <span className="text-primary font-bold flex items-center gap-2">
                      <FaUser />
                      {user?.displayName}
                    </span>
                  </li>
                  <div className="divider my-1"></div>
                  <li>
                    <Link to="/my-profile" className="hover:bg-primary/10 text-gray-700 rounded-xl flex items-center gap-2 py-3">
                      <FaUser className="text-primary" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="hover:bg-primary/10 text-gray-700 rounded-xl flex items-center gap-2 py-3">
                      <FaCog className="text-primary" />
                      Settings
                    </Link>
                  </li>
                  <div className="divider my-1"></div>
                  <li>
                    <a onClick={logout} className="hover:bg-error/10 text-error rounded-xl flex items-center gap-2 py-3">
                      <FaSignOutAlt />
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-ghost btn-sm text-gray-700 hover:bg-primary/5 hover:text-primary rounded-xl flex items-center gap-2">
                <FaSignInAlt />
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm shadow-md hover:shadow-lg hover:scale-105 transition-all rounded-xl flex items-center gap-2">
                <FaUserPlus />
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
