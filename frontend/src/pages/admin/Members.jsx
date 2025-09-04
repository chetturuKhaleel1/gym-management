import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editRoleId, setEditRoleId] = useState(null);
  const [newRole, setNewRole] = useState('');

  // ✅ Add member form state
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    password: '',
  });

  const BASE_URL = "https://gym-management-backend-0tn2.onrender.com";

  const fetchMembers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/members`);
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Failed to fetch members:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      // ✅ Correct route (matches your backend)
      const res = await fetch(`${BASE_URL}/api/users/add-member`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newMember, role: 'member' }),
      });

      const contentType = res.headers.get('content-type');

      if (!res.ok) {
        // If response is NOT JSON, show raw text
        if (!contentType || !contentType.includes('application/json')) {
          const errorText = await res.text();
          console.error('Server returned non-JSON:', errorText);
          toast.error('❌ Server returned HTML instead of JSON');
          return;
        }

        const errorData = await res.json();
        toast.error(errorData.message || '❌ Failed to add member');
        return;
      }

      const data = await res.json();
      toast.success('✅ Member added!');
      setNewMember({ name: '', email: '', password: '' });
      fetchMembers();
    } catch (err) {
      console.error('Add member error:', err);
      toast.error('❌ Could not reach the server. Check API route.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    try {
      await fetch(`${BASE_URL}/api/members/${id}`, {
        method: 'DELETE',
      });
      setMembers(members.filter((member) => member._id !== id));
    } catch (error) {
      console.error('Failed to delete member:', error);
    }
  };

  const handleEditRole = (id, currentRole) => {
    setEditRoleId(id);
    setNewRole(currentRole);
  };

  const handleSaveRole = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/members/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      const updated = await res.json();
      setMembers(
        members.map((m) => (m._id === id ? { ...m, role: updated.role } : m))
      );
      setEditRoleId(null);
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading members...</p>;

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Manage Members</h2>

      {/* ✅ Add Member Form */}
      <form
        onSubmit={handleAddMember}
        className="mb-8 space-y-4 bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <h3 className="text-lg font-semibold mb-2">Add New Member</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newMember.name}
            onChange={(e) =>
              setNewMember({ ...newMember, name: e.target.value })
            }
            required
            className="bg-gray-900 text-white border border-gray-600 p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newMember.email}
            onChange={(e) =>
              setNewMember({ ...newMember, email: e.target.value })
            }
            required
            className="bg-gray-900 text-white border border-gray-600 p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={newMember.password}
            onChange={(e) =>
              setNewMember({ ...newMember, password: e.target.value })
            }
            required
            className="bg-gray-900 text-white border border-gray-600 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-2"
        >
          ➕ Add Member
        </button>
      </form>

      {/* ✅ Members Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-700 text-white">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="border border-gray-600 p-2">Name</th>
              <th className="border border-gray-600 p-2">Email</th>
              <th className="border border-gray-600 p-2">Role</th>
              <th className="border border-gray-600 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr
                key={member._id}
                className="bg-gray-900 hover:bg-gray-800 transition"
              >
                <td className="border border-gray-700 p-2">{member.name}</td>
                <td className="border border-gray-700 p-2">{member.email}</td>
                <td className="border border-gray-700 p-2">
                  {editRoleId === member._id ? (
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="bg-gray-800 text-white border border-gray-600 px-2 py-1 rounded"
                    >
                      <option value="member">Member</option>
                      <option value="admin">Admin</option>
                      <option value="coach">Coach</option>
                    </select>
                  ) : (
                    member.role
                  )}
                </td>
                <td className="border border-gray-700 p-2 space-x-2">
                  {editRoleId === member._id ? (
                    <>
                      <button
                        onClick={() => handleSaveRole(member._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditRoleId(null)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditRole(member._id, member.role)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMembers;
