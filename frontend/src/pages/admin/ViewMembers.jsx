import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('/api/members');
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) return <p className="text-center py-10 text-gray-500">Loading members...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-indigo-700">🏋️‍♂️ Gym Members</h2>

      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-300">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr className="bg-indigo-600 text-white uppercase text-sm tracking-wider">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left hidden sm:table-cell">Phone</th>
              <th className="py-3 px-6 text-left hidden md:table-cell">Joined On</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No members found.
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr
                  key={member._id}
                  className="border-b border-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="py-3 px-6 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">
                    {member.name}
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap text-gray-700 dark:text-gray-300">
                    {member.email}
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap text-gray-700 dark:text-gray-300 hidden sm:table-cell">
                    {member.phone || '—'}
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap text-gray-700 dark:text-gray-300 hidden md:table-cell">
                    {new Date(member.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewMembers;
