import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { useSpring, animated } from '@react-spring/web';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaSignInAlt, FaPaw, FaCheckCircle, FaImage } from 'react-icons/fa';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    photoURL: '',
    password: ''
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

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Log user data for debugging
      console.log('Google Sign-In Success:', {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber
      });
      
      const userData = {
        displayName: user.displayName || 'User',
        email: user.email,
        avatar: user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName || user.email) + '&background=0D8ABC&color=fff',
        phone: user.phoneNumber || 'Not provided',
        address: 'Not provided',
        memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      };
      
      login(userData);
      
      toast.success(`Welcome ${user.displayName}!`, {
        duration: 2000,
        position: 'top-center',
      });

      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1000);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      toast.error('Failed to sign in with Google. Please try again.', {
        duration: 3000,
        position: 'top-center',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate password (at least 6 characters)
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long!', {
        duration: 3000,
        position: 'top-center',
        icon: '❌',
      });
      return;
    }

    // Check if password has uppercase letter
    if (!/[A-Z]/.test(formData.password)) {
      toast.error('Password must contain at least one uppercase letter!', {
        duration: 3000,
        position: 'top-center',
        icon: '❌',
      });
      return;
    }

    // Check if password has lowercase letter
    if (!/[a-z]/.test(formData.password)) {
      toast.error('Password must contain at least one lowercase letter!', {
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
      avatar: formData.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName)}&background=0D8ABC&color=fff`,
      phone: 'Not provided',
      address: 'Not provided',
      memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
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
            <button 
              onClick={handleGoogleSignIn}
              type="button"
              className="btn btn-outline w-full rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all font-semibold text-lg gap-3 border-2 mb-6"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>

            <div className="divider my-6">OR</div>

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
                    <FaImage className="text-secondary" />
                    Photo URL
                  </span>
                </label>
                <div className="relative">
                  <input 
                    type="url"
                    name="photoURL"
                    placeholder="https://example.com/your-photo.jpg" 
                    className="input input-bordered w-full pl-12 focus:ring-4 focus:ring-secondary/20 focus:border-secondary rounded-xl bg-gray-50" 
                    value={formData.photoURL}
                    onChange={handleInputChange}
                  />
                  <FaImage className="absolute left-4 top-4 text-gray-400" />
                </div>
              </div>
              
              <div className="form-control animate__animated animate__fadeInLeft animate__delay-3s">
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
                <label className="label">
                  <span className="label-text-alt text-gray-500">Must be at least 6 characters with uppercase & lowercase</span>
                </label>
              </div>
              
              <div className="form-control mt-2">
                <button type="submit" className="btn btn-secondary w-full rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all font-semibold text-lg gap-2">
                  <FaUserPlus className="text-xl" />
                  Create Account
                </button>
              </div>
            </form>

            <div className="divider my-6"></div>

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
