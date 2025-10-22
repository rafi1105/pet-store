import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { useSpring, animated } from '@react-spring/web';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaSignInAlt, FaPaw, FaCheckCircle } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Spring animation for the form
  const formSpring = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 280, friction: 60 }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!', {
        duration: 3000,
        position: 'top-center',
        icon: '❌',
      });
      return;
    }

    // Mock user data
    const userData = {
      displayName: formData.fullName,
      email: formData.email,
      avatar: 'https://i.pravatar.cc/150?img=3'
    };
    
    // Perform registration
    login(userData);
    
    // Show success message
    toast.success('Registration successful! Welcome to WarmPaws!', {
      duration: 3000,
      position: 'top-center',
      icon: '🎉',
    });

    // Redirect to home
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4">
      <Toaster />
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate__animated animate__fadeInDown">
          <div className="inline-block bg-secondary/10 p-6 rounded-3xl mb-4 hover:scale-110 transition-transform">
            <FaPaw className="text-6xl text-secondary animate-bounce" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Join WarmPaws
          </h2>
          <p className="text-gray-600">Create your account and start caring for your pets</p>
        </div>
        
        <animated.div style={formSpring}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="form-control animate__animated animate__fadeInLeft">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                    <FaUser className="text-secondary" />
                    Full Name
                  </span>
                </label>
                <div className="relative">
                  <input 
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name" 
                    className="input input-bordered w-full pl-12 focus:ring-4 focus:ring-secondary/20 focus:border-secondary rounded-xl bg-gray-50" 
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required 
                  />
                  <FaUser className="absolute left-4 top-4 text-gray-400" />
                </div>
              </div>

              <div className="form-control animate__animated animate__fadeInLeft animate__delay-1s">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                    <FaEnvelope className="text-secondary" />
                    Email Address
                  </span>
                </label>
                <div className="relative">
                  <input 
                    type="email"
                    name="email"
                    placeholder="your.email@example.com" 
                    className="input input-bordered w-full pl-12 focus:ring-4 focus:ring-secondary/20 focus:border-secondary rounded-xl bg-gray-50" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                  <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                </div>
              </div>
              
              <div className="form-control animate__animated animate__fadeInLeft animate__delay-2s">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                    <FaLock className="text-secondary" />
                    Password
                  </span>
                </label>
                <div className="relative">
                  <input 
                    type="password"
                    name="password"
                    placeholder="Create a strong password" 
                    className="input input-bordered w-full pl-12 focus:ring-4 focus:ring-secondary/20 focus:border-secondary rounded-xl bg-gray-50" 
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                  />
                  <FaLock className="absolute left-4 top-4 text-gray-400" />
                </div>
              </div>

              <div className="form-control animate__animated animate__fadeInLeft animate__delay-3s">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                    <FaCheckCircle className="text-secondary" />
                    Confirm Password
                  </span>
                </label>
                <div className="relative">
                  <input 
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password" 
                    className="input input-bordered w-full pl-12 focus:ring-4 focus:ring-secondary/20 focus:border-secondary rounded-xl bg-gray-50" 
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required 
                  />
                  <FaCheckCircle className="absolute left-4 top-4 text-gray-400" />
                </div>
              </div>
              
              <div className="form-control mt-2">
                <button type="submit" className="btn btn-secondary w-full rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all font-semibold text-lg gap-2">
                  <FaUserPlus className="text-xl" />
                  Create Account
                </button>
              </div>
            </form>

            <div className="divider my-6">OR</div>

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-secondary font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </animated.div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-secondary hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-secondary hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
