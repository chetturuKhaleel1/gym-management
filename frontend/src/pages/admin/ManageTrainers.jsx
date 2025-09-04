import React, { useEffect, useState } from 'react';

const ManageTrainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://gym-management-backend-0tn2.onrender.com/api/admin/trainers', {

          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setTrainers(data.trainers || []); // defensive fallback
      } catch (err) {
        console.error('Failed to fetch trainers:', err);
      }
    };

    fetchTrainers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-green-400">Manage Trainers</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-[#222] text-green-300">
              <th className="border border-gray-700 px-4 py-2">Name</th>
              <th className="border border-gray-700 px-4 py-2">Email</th>
              <th className="border border-gray-700 px-4 py-2">Speciality</th>
              <th className="border border-gray-700 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.length > 0 ? (
              trainers.map((trainer) => (
                <tr key={trainer._id} className="text-gray-200">
                  <td className="border border-gray-700 px-4 py-2">{trainer.name}</td>
                  <td className="border border-gray-700 px-4 py-2">{trainer.email}</td>
                  <td className="border border-gray-700 px-4 py-2">{trainer.speciality}</td>
                  <td className="border border-gray-700 px-4 py-2">
                    <button className="text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white mr-2">Delete</button>
                    <button className="text-sm bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-black">Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">No trainers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTrainers;
