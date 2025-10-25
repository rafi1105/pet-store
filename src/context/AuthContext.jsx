import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage to persist on reload
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('warmPawsUser');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      return null;
    }
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const savedUser = localStorage.getItem('warmPawsUser');
      return savedUser ? true : false;
    } catch (error) {
      console.error('Error checking login status:', error);
      return false;
    }
  });

  // Save user to localStorage whenever it changes
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('warmPawsUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('warmPawsUser');
      }
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    toast.success('Logged out successfully!', {
      duration: 2000,
      position: 'top-center',
    });
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
