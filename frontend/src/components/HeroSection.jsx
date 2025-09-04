import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const HeroSection = () => {
  return (
    <section className="relative bg-[url('https://source.unsplash.com/1600x600/?gym,fitness')] bg-cover bg-center h-[550px] flex items-center justify-center text-white">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center px-4 sm:px-6">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-shadow-md">
          Build Your{' '}
          <span className="text-green-400 drop-shadow-[0_2px_10px_rgba(34,197,94,0.9)]">
            Dream Physique
          </span>
        </h1>

        {/* Typewriter */}
        <h2 className="text-lg sm:text-xl md:text-2xl text-green-300 font-medium mb-8 min-h-[2rem]">
          <Typewriter
            words={['Running 🏃‍♂️', 'Cardio Training ❤️‍🔥', 'Weight Loss 🔥', 'Strength Gain 💪']}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h2>

        {/* CTA Button */}
        <button className="bg-gradient-to-r from-green-400 to-lime-400 text-black font-semibold px-6 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-400/60">
          🚀 See Membership Plans
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
