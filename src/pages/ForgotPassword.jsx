import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FaEnvelope, FaKey, FaPaw, FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get email from location state if passed from login page
  const [email, setEmail] = useState(location.state?.email || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address', {
        duration: 3000,
        position: 'top-center',
      });
      return;
    }

    // Show success message
    toast.success('Password reset link sent! Redirecting to Gmail...', {
      duration: 2000,
      position: 'top-center',
      icon: '📧',
    });

    // Redirect to Gmail after a short delay
    setTimeout(() => {
      window.open('https://mail.google.com', '_blank');
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4">
      <Toaster />
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate__animated animate__fadeInDown">
          <div className="inline-block bg-primary/10 p-6 rounded-3xl mb-4 hover:scale-110 transition-transform shadow-lg">
            <FaKey className="text-6xl text-primary animate-bounce" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Forgot Password?
          </h2>
          <p className="text-gray-700 font-medium text-lg">No worries! We'll send you reset instructions</p>
        </div>
        
        <div className="bg-base-100 rounded-2xl shadow-2xl p-8 border-2 border-primary/20 animate__animated animate__fadeInUp">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
              </div>
              <label className="label">
                <span className="label-text-alt text-gray-500">
                  We'll send you a password reset link via email
                </span>
              </label>
            </div>
            
            <div className="form-control mt-2">
              <button type="submit" className="btn btn-primary w-full rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all font-semibold text-lg gap-2">
                <FaKey className="text-xl" />
                Reset Password
              </button>
            </div>
          </form>

          <div className="divider my-6"></div>

          <div className="text-center">
            <Link to="/login" className="text-gray-600 hover:text-primary font-semibold flex items-center justify-center gap-2">
              <FaArrowLeft />
              Back to Login
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Remember your password?{' '}
            <Link to="/login" className="text-primary hover:underline font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
