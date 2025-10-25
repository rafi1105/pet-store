import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSpring, animated } from '@react-spring/web';
import AOS from 'aos';
import 'aos/dist/aos.css';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar, FaEdit, FaCheckCircle, FaClock, FaExclamationCircle, FaTimes, FaSave, FaImage } from 'react-icons/fa';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const MyProfile = () => {
  const { user, isLoggedIn, login } = useAuth();
  const [imgError, setImgError] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    photoURL: ''
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Handle update profile button click
  const handleUpdateProfile = () => {
    setFormData({
      displayName: user?.displayName || '',
      photoURL: user?.avatar || ''
    });
    setShowUpdateModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      // Update Firebase Auth profile if user is authenticated with Firebase
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: formData.displayName,
          photoURL: formData.photoURL
        });
      }

      // Update local user context
      const updatedUser = {
        ...user,
        displayName: formData.displayName,
        avatar: formData.photoURL
      };
      login(updatedUser);

      toast.success('Profile updated successfully! 🎉', {
        duration: 3000,
        position: 'top-center',
      });

      setShowUpdateModal(false);
      setImgError(false); // Reset image error state
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.', {
        duration: 3000,
        position: 'top-center',
      });
    } finally {
      setUpdating(false);
    }
  };

  // Default user data if not logged in
  const displayUser = user || {
    displayName: 'Guest User',
    email: 'guest@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Guest+User&background=0D8ABC&color=fff&size=200',
    phone: '+1 (555) 123-4567',
    address: '123 Pet Street, Animal City, PC 12345',
    memberSince: 'January 2024'
  };

  // Fallback avatar if image fails to load
  const handleImageError = () => {
    setImgError(true);
  };

  const getAvatarUrl = () => {
    if (imgError || !displayUser.avatar) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(displayUser.displayName || 'User')}&background=0D8ABC&color=fff&size=200`;
    }
    return displayUser.avatar;
  };

  const bookings = [
    {
      id: 1,
      serviceName: 'Winter Coat Fitting for Dogs',
      date: '2024-11-15',
      status: 'Confirmed'
    },
    {
      id: 2,
      serviceName: 'Winter Grooming & Paw Treatment',
      date: '2024-11-20',
      status: 'Pending'
    }
  ];

  // Spring animation for avatar
  const avatarSpring = useSpring({
    from: { transform: 'scale(0) rotate(-180deg)' },
    to: { transform: 'scale(1) rotate(0deg)' },
    config: { tension: 200, friction: 20 }
  });

  // Spring animation for profile card
  const cardSpring = useSpring({
    from: { opacity: 0, transform: 'translateX(-100px)' },
    to: { opacity: 1, transform: 'translateX(0px)' },
    delay: 200
  });

  return (
    <div className="min-h-screen py-16 px-4 bg-base-200">
      <div className="max-w-6xl mx-auto">
        <h1 
          className="text-5xl font-bold text-center mb-4 text-gray-900 animate__animated animate__fadeInDown"
        >
          My Profile
        </h1>
        <p className="text-center text-gray-700 text-lg mb-12 font-medium">Manage your account information and track your bookings</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <animated.div style={cardSpring}>
              <div className="bg-base-100 rounded-2xl shadow-xl border-2 border-primary/20 p-8" data-aos="fade-right">
                <div className="text-center">
                  <animated.div style={avatarSpring} className="avatar online mb-6">
                    <div className="w-32 rounded-full ring-4 ring-primary ring-offset-4 ring-offset-white hover:scale-110 transition-transform overflow-hidden bg-primary/10">
                      <img 
                        src={getAvatarUrl()} 
                        alt={displayUser.displayName}
                        onError={handleImageError}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </animated.div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{displayUser.displayName}</h2>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                    <FaCalendar className="text-primary" />
                    <p>Member since {displayUser.memberSince}</p>
                  </div>
                  <button 
                    onClick={handleUpdateProfile}
                    className="btn btn-primary w-full rounded-xl shadow-md hover:shadow-lg transition-all gap-2 hover:scale-105 mt-6"
                  >
                    <FaEdit />
                    Update Profile
                  </button>
                </div>
              </div>
            </animated.div>
          </div>

          {/* Details and Bookings */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <div className="bg-base-100 rounded-2xl shadow-xl border-2 border-primary/20 p-8" data-aos="fade-left" data-aos-delay="200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <FaUser className="text-primary text-xl" />
                </div>
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FaEnvelope className="text-xl text-primary" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 font-medium">Email Address</span>
                    <p className="font-bold text-gray-800">{displayUser.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FaPhone className="text-xl text-primary" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 font-medium">Phone Number</span>
                    <p className="font-bold text-gray-800">{displayUser.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-xl text-primary" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 font-medium">Home Address</span>
                    <p className="font-bold text-gray-800">{displayUser.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* My Bookings */}
            <div className="bg-base-100 rounded-2xl shadow-xl border-2 border-primary/20 p-8" data-aos="fade-left" data-aos-delay="400">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <FaCalendar className="text-secondary text-xl" />
                </div>
                My Bookings
              </h3>
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking, index) => (
                    <div 
                      key={booking.id} 
                      className="flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:shadow-md transition-all hover:-translate-y-1 border-2 border-gray-100"
                      data-aos="flip-up"
                      data-aos-delay={index * 200}
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-4 rounded-xl">
                          <FaClock className="text-2xl text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-800">{booking.serviceName}</h4>
                          <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                            <FaCalendar />
                            {booking.date}
                          </p>
                        </div>
                      </div>
                      <div>
                        {booking.status === 'Confirmed' ? (
                          <span className="bg-success text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 animate__animated animate__bounceIn shadow-md">
                            <FaCheckCircle />
                            {booking.status}
                          </span>
                        ) : (
                          <span className="bg-warning text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 animate__animated animate__bounceIn shadow-md">
                            <FaExclamationCircle />
                            {booking.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCalendar className="text-5xl text-gray-300" />
                  </div>
                  <p className="text-gray-600 text-xl font-semibold mb-2">No bookings yet</p>
                  <p className="text-gray-500">Start booking services to see them here!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate__animated animate__fadeIn">
          <div className="bg-base-100 rounded-2xl shadow-2xl max-w-md w-full p-8 animate__animated animate__zoomIn border-2 border-primary/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <FaEdit className="text-primary" />
                Update Profile
              </h3>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="btn btn-ghost btn-sm btn-circle hover:bg-gray-100"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmitUpdate} className="space-y-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                    <FaUser className="text-primary" />
                    Display Name
                  </span>
                </label>
                <input
                  type="text"
                  name="displayName"
                  placeholder="Enter your name"
                  className="input input-bordered w-full focus:ring-4 focus:ring-primary/20 focus:border-primary rounded-xl bg-gray-50"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                    <FaImage className="text-primary" />
                    Photo URL
                  </span>
                </label>
                <input
                  type="url"
                  name="photoURL"
                  placeholder="https://example.com/your-photo.jpg"
                  className="input input-bordered w-full focus:ring-4 focus:ring-primary/20 focus:border-primary rounded-xl bg-gray-50"
                  value={formData.photoURL}
                  onChange={handleInputChange}
                />
                <label className="label">
                  <span className="label-text-alt text-gray-500">Leave empty to use auto-generated avatar</span>
                </label>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="btn btn-ghost flex-1 rounded-xl"
                  disabled={updating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1 rounded-xl gap-2"
                  disabled={updating}
                >
                  {updating ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Updating...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
