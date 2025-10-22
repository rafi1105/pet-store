import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaw } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-base-content mt-auto border-t-4 border-primary">
      <div className="footer p-10 max-w-7xl mx-auto">
        <aside>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary p-3 rounded-xl">
              <FaPaw className="text-4xl text-white" />
            </div>
            <div>
              <p className="font-bold text-2xl text-primary">
                WarmPaws Pet Care
              </p>
              <p className="text-sm text-gray-600">Caring for pets since 2020</p>
            </div>
          </div>
          <div className="space-y-3 mt-6">
            <p className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors">
              <div className="bg-primary/10 p-2 rounded-lg">
                <FaEnvelope className="text-primary" />
              </div>
              <a href="mailto:contact@warmpaws.com">contact@warmpaws.com</a>
            </p>
            <p className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors">
              <div className="bg-primary/10 p-2 rounded-lg">
                <FaPhone className="text-primary" />
              </div>
              <span>+1 (555) 123-4567</span>
            </p>
            <p className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors">
              <div className="bg-primary/10 p-2 rounded-lg">
                <FaMapMarkerAlt className="text-primary" />
              </div>
              <span>123 Pet Street, Animal City</span>
            </p>
          </div>
        </aside>
        
        <nav>
          <h6 className="footer-title text-primary text-lg font-bold">Services</h6>
          <Link to="/services" className="link link-hover hover:text-primary transition-colors">Browse Services</Link>
          <Link to="/booking" className="link link-hover hover:text-primary transition-colors">Book Appointment</Link>
          <Link to="/pricing" className="link link-hover hover:text-primary transition-colors">Pricing</Link>
          <Link to="/providers" className="link link-hover hover:text-primary transition-colors">Service Providers</Link>
        </nav>
        
        <nav>
          <h6 className="footer-title text-primary text-lg font-bold">Company</h6>
          <Link to="/about" className="link link-hover hover:text-primary transition-colors">About Us</Link>
          <Link to="/contact" className="link link-hover hover:text-primary transition-colors">Contact</Link>
          <Link to="/careers" className="link link-hover hover:text-primary transition-colors">Careers</Link>
          <Link to="/blog" className="link link-hover hover:text-primary transition-colors">Blog</Link>
        </nav>
        
        <nav>
          <h6 className="footer-title text-primary text-lg font-bold">Legal</h6>
          <Link to="/privacy" className="link link-hover hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="link link-hover hover:text-primary transition-colors">Terms of Service</Link>
          <Link to="/cookies" className="link link-hover hover:text-primary transition-colors">Cookie Policy</Link>
        </nav>
      </div>
      
      <div className="footer footer-center p-6 bg-white text-base-content border-t border-gray-200">
        <aside>
          <div className="flex gap-4 mb-4">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-circle btn-sm bg-primary/10 border-0 hover:bg-primary hover:text-white transition-all hover:scale-110"
            >
              <FaTwitter className="text-xl text-primary hover:text-white" />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-circle btn-sm bg-primary/10 border-0 hover:bg-primary hover:text-white transition-all hover:scale-110"
            >
              <FaFacebook className="text-xl text-primary hover:text-white" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-circle btn-sm bg-primary/10 border-0 hover:bg-primary hover:text-white transition-all hover:scale-110"
            >
              <FaInstagram className="text-xl text-primary hover:text-white" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-circle btn-sm bg-primary/10 border-0 hover:bg-primary hover:text-white transition-all hover:scale-110"
            >
              <FaLinkedin className="text-xl text-primary hover:text-white" />
            </a>
          </div>
          <p className="font-semibold text-gray-700">Copyright © 2024 - All rights reserved by WarmPaws Pet Care</p>
          <p className="text-sm text-gray-500">Made with ❤️ for pet lovers everywhere</p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
