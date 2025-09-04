import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Optional animation

const DietsPage = () => {
  const [diets, setDiets] = useState([]);

  useEffect(() => {
    const fetchDiets = async () => {
      try {
        const res = await fetch('/api/diets');
        const data = await res.json();
        setDiets(data);
      } catch (error) {
        console.error("Failed to fetch diets", error);
      }
    };
    fetchDiets();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-block text-green-400 hover:text-green-500 underline font-semibold mb-8"
        >
          ← Back to Home
        </Link>

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-yellow-400 tracking-wide drop-shadow-xl">
          🥗 Elite Diet Plans
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diets.length === 0 ? (
            <p className="text-center text-gray-400 col-span-full">
              No diet plans available.
            </p>
          ) : (
            diets.map((diet) => (
              <motion.div
                key={diet._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-yellow-300 mb-4">
                  {diet.title}
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1 text-base">
                  {diet.meals.map((meal, idx) => (
                    <li key={idx}>{meal}</li>
                  ))}
                </ul>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DietsPage;
