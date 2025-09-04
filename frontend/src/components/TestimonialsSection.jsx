import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Kiran M.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    review: 'I lost 12kgs in 3 months with their training. The coaches are top class!',
    stars: 5
  },
  {
    name: 'Lavanya R.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    review: 'Friendly environment and best gym equipment. I love the yoga sessions!',
    stars: 4
  },
  {
    name: 'Ravi Kumar',
    image: 'https://randomuser.me/api/portraits/men/58.jpg',
    review: 'Affordable pricing and super motivating atmosphere. SSR Gym rocks!',
    stars: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 px-4 sm:px-8 md:px-20 bg-black text-white">
      <h2 className="text-3xl font-bold text-center mb-12 text-green-400">What Our Clients Say</h2>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-[#1a1a1a] border border-green-500 p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300"
          >
            <img
              src={t.image}
              alt={t.name}
              className="w-16 h-16 rounded-full mb-4 mx-auto border-2 border-green-400"
            />
            <h3 className="text-lg font-semibold text-center">{t.name}</h3>
            <p className="text-gray-400 text-sm mt-2 text-center italic">"{t.review}"</p>
            <div className="text-center mt-4">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span key={idx}>
                  {idx < t.stars ? '⭐' : '☆'}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
