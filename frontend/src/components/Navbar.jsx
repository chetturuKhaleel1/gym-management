import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-4 sm:px-6 py-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl sm:text-2xl font-extrabold tracking-tight">
          <span className="text-green-400">Sri Sai</span> Raghavendra Gym
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm sm:text-base font-medium">
          <li>
            <a href="#services" className="hover:text-green-400 transition-colors duration-200">
              Services
            </a>
          </li>
          <li>
            <a href="#testimonials" className="hover:text-green-400 transition-colors duration-200">
              Reviews
            </a>
          </li>
          <li>
            <a href="/plans" className="hover:text-green-400 transition-colors duration-200">
              Plans
            </a>
          </li>
          <li>
            <a href="/supplements" className="hover:text-green-400 transition-colors duration-200">
              Supplements
            </a>
          </li>
          <li>
            <a href="/diets" className="hover:text-green-400 transition-colors duration-200">
              Diet Plans
            </a>
          </li>
          <li>
            <a
              href="/login"
              className="bg-green-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-green-500 transition duration-300 shadow-md"
            >
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
