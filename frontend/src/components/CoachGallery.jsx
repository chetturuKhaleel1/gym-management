import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const expertiseOptions = [
  "Strength Training",
  "Yoga & Flexibility",
  "Weight Loss",
  "Zumba & Dance Fitness",
  "CrossFit & HIIT",
  "Bodybuilding",
];



const imageUrls = [
  "https://cdn.pixabay.com/photo/2024/07/01/17/11/woman-8865733_1280.png", // male coach
  "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&q=80&w=400", // female coach
 "https://cdn.pixabay.com/photo/2023/03/12/16/10/man-7847248_1280.jpg", // male
  "https://cdn.pixabay.com/photo/2021/06/20/23/47/boxer-6352329_1280.jpg", // female
];


export default function CoachGallery() {
  const [coaches, setCoaches] = useState([]);
useEffect(() => {
  fetch("http://localhost:5000/api/coaches")
    .then((res) => res.json())
    .then((data) => {
      // Step 1: Shuffle expertise options
      const shuffledExpertise = [...expertiseOptions].sort(() => 0.5 - Math.random());

      // Step 2: Assign expertise and image
      const formatted = data.map((coach, idx) => ({
        name: coach.name,
        expertise: shuffledExpertise[idx % shuffledExpertise.length],
        img: imageUrls[idx % imageUrls.length],
      }));

      setCoaches(formatted);
    });
}, []);


  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 px-4 sm:px-6 lg:px-16">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12 tracking-tight">
        🏋️‍♂️ Meet Our Elite Coaches
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {coaches.map((coach, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.04 }}
            className="relative bg-white rounded-3xl overflow-hidden shadow-xl group hover:shadow-2xl transition-shadow"
          >
            <img
              src={coach.img}
              alt={coach.name}
              className="w-full h-72 object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-white">
              <h3 className="text-xl font-semibold">{coach.name}</h3>
              <p className="text-sm text-gray-200">{coach.expertise}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
