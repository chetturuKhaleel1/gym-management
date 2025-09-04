import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-16 border-t border-gray-800 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center sm:text-left">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">Sri Sai Raghavendra Gym</h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Empowering fitness journeys in Chandapura, Bangalore. Join us and transform your life.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-base">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/plans" className="hover:text-white">Plans</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link to="/login" className="hover:text-white">Member Login</Link></li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <ul className="text-gray-400 text-base space-y-2">
            <li className="flex justify-center sm:justify-start items-center gap-2">
              <FaMapMarkerAlt className="text-yellow-400" /> Chandapura, Bangalore
            </li>
            <li className="flex justify-center sm:justify-start items-center gap-2">
              <FaPhoneAlt className="text-yellow-400" /> +91 98765 43210
            </li>
          </ul>

          <div className="flex justify-center sm:justify-start gap-5 mt-5 text-2xl text-gray-400">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} <span className="text-white font-semibold">Sri Sai Raghavendra Gym</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
