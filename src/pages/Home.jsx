import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AOS from 'aos';
import 'aos/dist/aos.css';
import servicesData from '../data/services.json';
import winterTips from '../data/winterTips.json';
import experts from '../data/experts.json';
import { FaStar, FaDollarSign, FaArrowRight, FaSnowflake, FaHeart, FaBolt, FaShieldAlt, FaMedal, FaRocket, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Hero slider data
  const heroSlides = [
    {
      id: 1,
      title: "Expert Winter Pet Care Services",
      description: "Professional care to keep your pets warm, healthy, and happy all winter long",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&h=600&fit=crop",
      bgColor: "primary"
    },
    {
      id: 2,
      title: "Premium Grooming & Wellness",
      description: "Complete grooming services tailored for cold weather protection",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=600&fit=crop",
      bgColor: "secondary"
    },
    {
      id: 3,
      title: "Cozy Winter Accessories",
      description: "Stylish and warm outfits to keep your furry friends comfortable",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=1200&h=600&fit=crop",
      bgColor: "accent"
    }
  ];

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Slider */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="h-[500px] lg:h-[600px]"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className={`hero h-full bg-${slide.bgColor} relative`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40"
                  style={{ backgroundImage: `url(${slide.image})` }}
                ></div>
                <div className="hero-content text-center text-white relative z-10">
                  <div className="max-w-3xl px-4">
                    <h1 className="mb-6 text-4xl lg:text-6xl font-bold drop-shadow-2xl animate__animated animate__fadeInDown">
                      {slide.title}
                    </h1>
                    <p className="mb-8 text-lg lg:text-2xl drop-shadow-lg animate__animated animate__fadeInUp leading-relaxed">
                      {slide.description}
                    </p>
                    <Link to="/services" className="btn btn-accent btn-lg text-lg px-8 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all animate__animated animate__fadeInUp animate__delay-1s">
                      Explore Services
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Popular Winter Care Services */}
      <div className="py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4" data-aos="fade-up">
              Popular Winter Care Services
            </h2>
            <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed font-medium" data-aos="fade-up" data-aos-delay="100">
              Discover our most trusted services designed to keep your pets healthy, comfortable, and happy throughout the winter season
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.slice(0, 6).map((service, index) => (
              <div 
                key={service.serviceId} 
                className="bg-base-100 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-primary/20 overflow-hidden group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <figure className="h-56 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.serviceName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
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
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {service.serviceName}
                  </h3>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{service.description}</p>
                  
                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-xl mb-4">
                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-500 text-lg" />
                      <span className="font-bold text-gray-900">{service.rating}</span>
                      <span className="text-gray-500 text-sm">(250+ reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <FaDollarSign className="text-xl" />
                      <span className="font-bold text-2xl">{service.price}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-700 mb-4">
                    <span>Provider: {service.providerName}</span>
                    <span className="font-semibold text-success">{service.slotsAvailable} slots left</span>
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
            ))}
          </div>
        </div>
      </div>

      {/* Winter Care Tips */}
      <div className="py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4" data-aos="fade-up">
              Essential Winter Care Tips
            </h2>
            <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">
              Expert advice to help you keep your furry companions safe, warm, and thriving during the cold season
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {winterTips.map((tip, index) => (
              <div 
                key={tip.id}
                className="bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 p-8 text-center border-2 border-primary/20"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="text-6xl mb-6">{tip.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{tip.title}</h3>
                <p className="text-gray-700 leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meet Our Expert Vets */}
      <div className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4" data-aos="fade-up">
              Meet Our Expert Veterinarians
            </h2>
            <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">
              Our highly qualified team of veterinary professionals dedicated to providing exceptional winter care for your beloved pets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {experts.map((expert, index) => (
              <div 
                key={expert.id}
                className="bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                data-aos="flip-left"
                data-aos-delay={index * 100}
              >
                <div className="pt-8 px-8">
                  <div className="flex justify-center mb-4">
                    <div className="avatar">
                      <div className="w-32 rounded-full ring-4 ring-primary ring-offset-4 ring-offset-white">
                        <img src={expert.image} alt={expert.name} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{expert.name}</h3>
                  <div className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-3">
                    {expert.specialty}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{expert.description}</p>
                  <div className="flex items-center justify-center gap-2 text-sm font-semibold text-primary bg-primary/10 py-2 px-4 rounded-lg">
                    <FaMedal />
                    {expert.experience} Experience
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div data-aos="fade-up">
            <FaHeart className="text-7xl mx-auto mb-6 animate-pulse" />
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
              Ready to Give Your Pet the Best Care?
            </h2>
            <p className="mb-10 text-xl lg:text-2xl font-light leading-relaxed max-w-3xl mx-auto">
              Join thousands of happy pet owners who trust WarmPaws for premium winter care services. Book your appointment today!
            </p>
            <Link 
              to="/services" 
              className="btn btn-accent btn-lg text-lg px-10 py-4 h-auto rounded-xl shadow-2xl hover:shadow-none hover:scale-105 transition-all gap-3 group"
            >
              <FaRocket className="text-2xl group-hover:rotate-12 transition-transform" />
              Get Started Now
              <FaArrowRight className="text-xl group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4" data-aos="fade-up">
              Why Pet Owners Choose WarmPaws
            </h2>
            <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">
              Discover what makes us the preferred choice for winter pet care services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              className="bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 p-8 text-center border-2 border-primary/20" 
              data-aos="zoom-in"
            >
              <div className="bg-primary/10 text-primary p-6 rounded-2xl inline-block mb-6">
                <FaShieldAlt className="text-5xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Certified & Trusted</h3>
              <p className="text-gray-700 leading-relaxed">
                All our veterinarians are board-certified with extensive experience in winter pet care and safety protocols
              </p>
            </div>

            <div 
              className="bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 p-8 text-center border-2 border-primary/20" 
              data-aos="zoom-in" 
              data-aos-delay="100"
            >
              <div className="bg-secondary/10 text-secondary p-6 rounded-2xl inline-block mb-6">
                <FaMedal className="text-5xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Award-Winning Service</h3>
              <p className="text-gray-700 leading-relaxed">
                Rated 4.9/5 stars by over 10,000 satisfied pet parents nationwide. Winner of Best Pet Care 2024
              </p>
            </div>

            <div 
              className="bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 p-8 text-center border-2 border-primary/20" 
              data-aos="zoom-in" 
              data-aos-delay="200"
            >
              <div className="bg-accent/10 text-accent p-6 rounded-2xl inline-block mb-6">
                <FaBolt className="text-5xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick & Convenient</h3>
              <p className="text-gray-700 leading-relaxed">
                Instant online booking with same-day appointments available. We work around your schedule
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Testimonials Section */}
      <div className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4" data-aos="fade-up">
              What Our Pet Parents Say
            </h2>
            <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">
              Real stories from pet owners who trust us with their furry family members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div 
              className="bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 p-8 relative border-2 border-primary/20" 
              data-aos="fade-up"
            >
              <div className="absolute -top-6 left-8">
                <div className="bg-primary text-white p-4 rounded-2xl shadow-lg">
                  <FaQuoteLeft className="text-3xl" />
                </div>
              </div>
              <div className="flex items-center gap-4 mb-6 mt-8">
                <div className="avatar">
                  <div className="w-16 rounded-full ring-4 ring-primary ring-offset-2">
                    <img src="https://i.pravatar.cc/150?img=1" alt="Sarah Johnson" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Sarah Johnson</h4>
                  <div className="flex gap-1 text-warning">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic mb-4">
                "WarmPaws has been a lifesaver this winter! My Golden Retriever, Max, loves the grooming sessions. The staff is incredibly knowledgeable about winter care, and Max always comes home happy and warm. Highly recommend!"
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FaHeart className="text-red-500" />
                <span>Owner of Max (Golden Retriever)</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div 
              className="bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 p-8 relative border-2 border-primary/20" 
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="absolute -top-6 left-8">
                <div className="bg-secondary text-white p-4 rounded-2xl shadow-lg">
                  <FaQuoteLeft className="text-3xl" />
                </div>
              </div>
              <div className="flex items-center gap-4 mb-6 mt-8">
                <div className="avatar">
                  <div className="w-16 rounded-full ring-4 ring-secondary ring-offset-2">
                    <img src="https://i.pravatar.cc/150?img=5" alt="Michael Chen" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Michael Chen</h4>
                  <div className="flex gap-1 text-warning">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic mb-4">
                "The winter wellness checkup service is fantastic! Dr. Emily was so gentle with my cat Luna. They caught a minor issue early and gave me great tips for keeping her comfortable during cold weather. Professional and caring!"
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FaHeart className="text-red-500" />
                <span>Owner of Luna (Persian Cat)</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div 
              className="bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 p-8 relative border-2 border-primary/20" 
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="absolute -top-6 left-8">
                <div className="bg-accent text-white p-4 rounded-2xl shadow-lg">
                  <FaQuoteLeft className="text-3xl" />
                </div>
              </div>
              <div className="flex items-center gap-4 mb-6 mt-8">
                <div className="avatar">
                  <div className="w-16 rounded-full ring-4 ring-accent ring-offset-2">
                    <img src="https://i.pravatar.cc/150?img=9" alt="Emily Rodriguez" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Emily Rodriguez</h4>
                  <div className="flex gap-1 text-warning">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic mb-4">
                "Best pet care service ever! I got my Husky, Koda, fitted with a beautiful winter coat. The online booking was super easy, and they were very flexible with scheduling. Koda looks adorable and stays warm on our walks!"
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FaHeart className="text-red-500" />
                <span>Owner of Koda (Siberian Husky)</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12" data-aos="zoom-in">
            <div className="stats stats-vertical lg:stats-horizontal shadow-2xl bg-base-100 rounded-2xl border-2 border-primary/20">
              <div className="stat place-items-center">
                <div className="stat-title text-gray-700 font-semibold">Happy Customers</div>
                <div className="stat-value text-primary">10,000+</div>
                <div className="stat-desc text-gray-500">Across the nation</div>
              </div>
              
              <div className="stat place-items-center">
                <div className="stat-title text-gray-700 font-semibold">Services Completed</div>
                <div className="stat-value text-secondary">25,000+</div>
                <div className="stat-desc text-gray-500">This winter season</div>
              </div>
              
              <div className="stat place-items-center">
                <div className="stat-title text-gray-700 font-semibold">Average Rating</div>
                <div className="stat-value text-accent">4.9/5</div>
                <div className="stat-desc text-warning flex gap-1">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

