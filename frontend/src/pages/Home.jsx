import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PlansSection from '../components/PlanSection';
import GallerySection from '../components/GallerySection';
import Footer from '../components/Footer';
import ServicesSection from '../components/ServiceSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CoachGallery from '../components/CoachGallery';

const Home = () => {
  return (
    <div className="font-sans bg-black text-white scroll-smooth">
      <Navbar />
      <div id="home"><HeroSection /></div>
      <div id="services"><ServicesSection /></div>
      <div id="plans"><PlansSection /></div>
      <div id="gallery"><GallerySection /></div>
      <div id="coaches"><CoachGallery /></div>
      <div id="testimonials"><TestimonialsSection /></div>
      <div id="footer"><Footer /></div>
    </div>
  );
};

export default Home;
