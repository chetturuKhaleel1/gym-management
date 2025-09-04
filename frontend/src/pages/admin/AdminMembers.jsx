import React, { useEffect, useState } from 'react';

const AdminMembers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem('token');
       const res = await fetch('https://gym-management-backend-0tn2.onrender.com/api/auth/users', {

          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUsers(data.users || []);
        } else {
          console.error('Failed to fetch users:', data?.error || 'Unknown error');
        }
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-yellow-400 text-center sm:text-left">
        👥 Registered Members
      </h1>

      {loading ? (
        <div className="text-center text-gray-400 animate-pulse">Fetching members...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm sm:text-base border-collapse bg-[#111] shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[#222] text-yellow-300">
                <th className="px-4 py-3 border-b border-gray-700 text-left">Name</th>
                <th className="px-4 py-3 border-b border-gray-700 text-left">Email</th>
                <th className="px-4 py-3 border-b border-gray-700 text-left">Role</th>
                <th className="px-4 py-3 border-b border-gray-700 text-left">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-[#1f1f1f] transition">
                    <td className="px-4 py-3 border-b border-gray-700">{user.name}</td>
                    <td className="px-4 py-3 border-b border-gray-700 break-all">{user.email}</td>
                    <td className="px-4 py-3 border-b border-gray-700 capitalize">{user.role}</td>
                    <td className="px-4 py-3 border-b border-gray-700">
                      {new Date(user.joinedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    🚫 No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminMembers;
