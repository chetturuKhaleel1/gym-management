import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SupplementsPage = () => {
  const [supplements, setSupplements] = useState([]);

  useEffect(() => {
    const fetchSupplements = async () => {
      const res = await fetch('/api/supplements');
      const data = await res.json();
      setSupplements(data);
    };
    fetchSupplements();
  }, []);

  return (
    <div className="bg-[#0E0F11] text-white min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="text-[#00FFD1] hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>

        <h2 className="text-4xl font-extrabold mb-10 tracking-tight">💊 Supplements Catalog</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {supplements.map((s) => (
            <div key={s._id} className="bg-[#1A1C1F] p-6 rounded-2xl shadow-lg hover:shadow-[#00FFD1]/50 transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-[#00FFD1] mb-2">{s.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{s.description}</p>
              <p className="text-sm text-gray-300">🏷️ <span className="text-[#FF5C5C]">{s.category}</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplementsPage;
