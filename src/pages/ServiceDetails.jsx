import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import servicesData from '../data/services.json';
import toast, { Toaster } from 'react-hot-toast';
import { useSpring, animated, useTrail } from '@react-spring/web';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = servicesData.find(s => s.serviceId === parseInt(id));

  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Spring animation for image
  const imageSpring = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 280, friction: 60 }
  });

  // Spring animation for form
  const formSpring = useSpring({
    from: { opacity: 0, transform: 'translateX(100px)' },
    to: { opacity: 1, transform: 'translateX(0px)' },
    delay: 300
  });

  // Trail animation for info cards
  const infoItems = [
    { label: 'Service Provider', value: service?.providerName, icon: '🏢' },
    { label: 'Contact Email', value: service?.providerEmail, icon: '📧' },
    { label: 'Price', value: `$${service?.price}`, icon: '💰' },
    { label: 'Available Slots', value: `${service?.slotsAvailable} slots`, icon: '📅' }
  ];

  const trail = useTrail(infoItems.length, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 600
  });

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate__animated animate__fadeIn">
          <h2 className="text-3xl font-bold mb-4">Service Not Found</h2>
          <button onClick={() => navigate('/services')} className="btn btn-primary">
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Show success toast
    toast.success(
      <div>
        <strong>🎉 Booking Confirmed!</strong>
        <p>{service.serviceName}</p>
        <p className="text-sm">We'll contact you at {formData.email}</p>
      </div>,
      {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#10b981',
          color: '#fff',
        },
      }
    );

    // Clear form
    setFormData({
      name: '',
      email: ''
    });
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/services')} 
          className="btn btn-ghost mb-6 animate__animated animate__fadeInLeft"
        >
          ← Back to Services
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Details */}
          <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl" data-aos="fade-right">
              <animated.figure style={imageSpring} className="h-80">
                <img 
                  src={service.image} 
                  alt={service.serviceName}
                  className="w-full h-full object-cover"
                />
              </animated.figure>
              <div className="card-body">
                <div className="flex items-center gap-2 mb-2 animate__animated animate__bounceIn">
                  <div className="badge badge-primary badge-lg">{service.category}</div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-xl">⭐</span>
                    <span className="font-bold text-lg">{service.rating}</span>
                  </div>
                </div>
                
                <h1 className="card-title text-3xl font-bold mb-4 animate__animated animate__fadeInUp">
                  {service.serviceName}
                </h1>
                
                <p className="text-gray-600 text-lg mb-6 animate__animated animate__fadeIn animate__delay-1s">
                  {service.description}
                </p>

                <div className="divider"></div>

                <div className="space-y-4">
                  {trail.map((style, index) => {
                    const item = infoItems[index];
                    return (
                      <animated.div
                        key={index}
                        style={style}
                        className={`flex items-center justify-between p-4 rounded-lg ${
                          index === 2 ? 'bg-primary/10 border-2 border-primary' :
                          index === 3 ? 'bg-success/10 border-2 border-success' :
                          'bg-base-200'
                        }`}
                      >
                        <div>
                          <p className="text-sm text-gray-500">{item.label}</p>
                          <p className={`font-bold ${
                            index === 2 ? 'text-3xl text-primary' :
                            index === 3 ? 'text-2xl text-success' :
                            'text-lg'
                          }`}>
                            {item.value}
                          </p>
                        </div>
                        <div className="text-4xl">{item.icon}</div>
                      </animated.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <animated.div style={formSpring}>
              <div className="card bg-base-100 shadow-xl sticky top-6" data-aos="fade-left">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4 animate__animated animate__fadeInDown">
                    Book This Service
                  </h2>
                  <p className="text-gray-600 mb-6 animate__animated animate__fadeIn">
                    Fill in your details below to book {service.serviceName}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control animate__animated animate__fadeInLeft">
                      <label className="label">
                        <span className="label-text font-semibold">Full Name</span>
                      </label>
                      <input 
                        type="text"
                        name="name"
                        placeholder="Enter your full name" 
                        className="input input-bordered w-full" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>

                    <div className="form-control animate__animated animate__fadeInRight">
                      <label className="label">
                        <span className="label-text font-semibold">Email Address</span>
                      </label>
                      <input 
                        type="email"
                        name="email"
                        placeholder="your@email.com" 
                        className="input input-bordered w-full" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>

                    <div className="divider"></div>

                    <div className="bg-base-200 p-4 rounded-lg animate__animated animate__fadeIn">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Service:</span>
                        <span>{service.serviceName}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Provider:</span>
                        <span>{service.providerName}</span>
                      </div>
                      <div className="flex justify-between items-center text-xl">
                        <span className="font-bold">Total:</span>
                        <span className="text-primary font-bold">${service.price}</span>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary w-full btn-lg animate__animated animate__pulse animate__infinite"
                      disabled={service.slotsAvailable === 0}
                    >
                      {service.slotsAvailable > 0 ? '🎉 Book Now' : 'No Slots Available'}
                    </button>
                  </form>

                  <div className="alert alert-info mt-4 animate__animated animate__bounceIn animate__delay-2s">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-sm">We'll contact you within 24 hours to confirm your booking!</span>
                  </div>
                </div>
              </div>
            </animated.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
