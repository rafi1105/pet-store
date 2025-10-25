import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import servicesData from '../data/services.json';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSpring, animated } from '@react-spring/web';
import { FaStar, FaDollarSign, FaArrowRight, FaSnowflake, FaShieldAlt, FaCheckCircle, FaClock, FaSearch, FaFilter } from 'react-icons/fa';

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredServices, setFilteredServices] = useState(servicesData);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Get unique categories
  const categories = ['All', ...new Set(servicesData.map(service => service.category))];

  // Filter services based on search and category
  useEffect(() => {
    let filtered = servicesData;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    setFilteredServices(filtered);
  }, [searchTerm, selectedCategory]);

  // Spring animation for the title
  const titleSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 60 }
  });

  return (
    <div className="min-h-screen py-16 px-4 bg-base-200">
      <div className="max-w-7xl mx-auto">
        <animated.h1 
          style={titleSpring}
          className="text-5xl font-bold text-center text-gray-900 mb-6"
        >
          Our Winter Pet Care Services
        </animated.h1>
        <p 
          className="text-center text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed animate__animated animate__fadeIn font-medium"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Discover our comprehensive range of professional winter care services designed to keep your pets comfortable, healthy, and happy during the cold season.
        </p>

        {/* Search and Filter Section */}
        <div className="mb-12 space-y-6" data-aos="fade-up" data-aos-delay="300">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search services by name, category, or description..."
                className="input input-bordered w-full pl-12 pr-4 py-6 text-lg rounded-2xl bg-base-100 focus:ring-4 focus:ring-primary/20 focus:border-primary shadow-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary text-xl" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <FaFilter />
              <span>Filter:</span>
            </div>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`btn btn-sm rounded-xl font-semibold transition-all ${
                  selectedCategory === category
                    ? 'btn-primary shadow-lg'
                    : 'btn-outline btn-primary hover:btn-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center text-gray-700 font-medium">
            Showing <span className="font-bold text-primary text-lg">{filteredServices.length}</span> service{filteredServices.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
            <div 
              key={service.serviceId} 
              className="bg-base-100 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-primary/20 overflow-hidden group"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <figure className="h-56 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.serviceName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2 animate__animated animate__bounceIn">
                  <FaSnowflake />
                  Winter Special
                </div>
              </figure>
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    {service.category}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors">
                  {service.serviceName}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{service.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <FaCheckCircle className="text-success" />
                      Provider
                    </span>
                    <span className="text-sm font-bold text-gray-800">{service.providerName}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <FaStar className="text-yellow-500" />
                      Rating
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-gray-800">{service.rating}</span>
                      <span className="text-gray-500 text-xs">(250+ reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border-2 border-primary/20">
                    <span className="font-semibold text-gray-700 flex items-center gap-2">
                      <FaDollarSign className="text-primary text-xl" />
                      Price
                    </span>
                    <span className="text-primary font-bold text-2xl">${service.price}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-success/10 rounded-xl border border-success/30">
                    <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <FaClock className="text-success" />
                      Available Slots
                    </span>
                    <span className="bg-success text-white px-3 py-1 rounded-full font-bold text-sm">{service.slotsAvailable}</span>
                  </div>
                </div>

                <Link 
                  to={`/service/${service.serviceId}`}
                  className="btn btn-primary w-full rounded-xl shadow-md hover:shadow-lg transition-all gap-2 group-hover:gap-4"
                >
                  View Details
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="bg-base-100 rounded-2xl shadow-xl p-12 max-w-md mx-auto border-2 border-primary/20">
                <FaSearch className="text-6xl text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Services Found</h3>
                <p className="text-gray-700 mb-6 font-medium">
                  We couldn't find any services matching your search criteria. Try different keywords or filters.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="btn btn-primary rounded-xl"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
