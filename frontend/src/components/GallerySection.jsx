import React from 'react';

const images = [
  'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
  'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg',
  'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg',
  'https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg',
  'https://images.pexels.com/photos/28061/pexels-photo.jpg',
  'https://images.pexels.com/photos/2261485/pexels-photo-2261485.jpeg', // ✅ Keep first instance
  'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg', // ✅ New unique gym image
  'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg'
];


const GallerySection = () => {
  return (
    <section className="bg-black py-16 px-4 sm:px-6 lg:px-20 text-white">
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-center mb-10 text-white">
        Gym <span className="text-yellow-400">Gallery</span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((url, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl shadow-lg group"
          >
            <img
              src={url}
              alt={`Gym Image ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;