import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { FaEnvelope, FaLock, FaSignInAlt, FaUserPlus, FaPaw } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Get the page user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock user data
    const userData = {
      displayName: 'John Doe',
      email: formData.email,
      avatar: 'https://i.pravatar.cc/150?img=3'
    };
    
    // Perform login
    login(userData);
    
    // Show success message
    toast.success('Login successful! Welcome back!', {
      duration: 2000,
      position: 'top-center',
    });

    // Redirect to the page they were trying to access, or home
    setTimeout(() => {
      navigate(from, { replace: true });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4">
      <Toaster />
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate__animated animate__fadeInDown">
          <div className="inline-block bg-primary/10 p-6 rounded-3xl mb-4 hover:scale-110 transition-transform">
            <FaPaw className="text-6xl text-primary animate-bounce" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-600">Sign in to access your pet care dashboard</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-100 animate__animated animate__fadeInUp">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                  <FaEnvelope className="text-primary" />
                  Email Address
                </span>
              </label>
              <div className="relative">
                <input 
                  type="email"
                  name="email"
                  placeholder="Enter your email" 
                  className="input input-bordered w-full pl-12 focus:ring-4 focus:ring-primary/20 focus:border-primary rounded-xl bg-gray-50" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
              </div>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                  <FaLock className="text-primary" />
                  Password
                </span>
              </label>
              <div className="relative">
                <input 
                  type="password"
                  name="password"
                  placeholder="Enter your password" 
                  className="input input-bordered w-full pl-12 focus:ring-4 focus:ring-primary/20 focus:border-primary rounded-xl bg-gray-50" 
                  value={formData.password}
                  onChange={handleInputChange}
                  required 
                />
                <FaLock className="absolute left-4 top-4 text-gray-400" />
              </div>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover text-primary font-medium">Forgot password?</a>
              </label>
            </div>
            
            <div className="form-control mt-2">
              <button type="submit" className="btn btn-primary w-full rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all font-semibold text-lg gap-2">
                <FaSignInAlt className="text-xl" />
                Sign In
              </button>
            </div>
          </form>

          <div className="divider my-6">OR</div>

          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            By signing in, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
