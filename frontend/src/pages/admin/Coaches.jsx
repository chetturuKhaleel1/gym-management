import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const BASE_URL = "https://gym-management-backend-0tn2.onrender.com";

export default function Coaches() {
  const [coaches, setCoaches] = useState([]);
  const [search, setSearch] = useState("");
  const [newCoach, setNewCoach] = useState({ name: "", coachId: "", contact: "", expiration: "" });
  const [editingCoachId, setEditingCoachId] = useState(null);
  const [editedCoach, setEditedCoach] = useState({});

  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/coaches`);
      setCoaches(res.data);
    } catch (err) {
      console.error("Error fetching coaches:", err);
    }
  };

  const handleAddCoach = async () => {
    try {
      await axios.post(`${BASE_URL}/api/coaches`, newCoach);
      setNewCoach({ name: "", coachId: "", contact: "", expiration: "" });
      fetchCoaches();
    } catch (err) {
      console.error("Error adding coach:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/coaches/${id}`);
      fetchCoaches();
    } catch (err) {
      console.error("Error deleting coach:", err);
    }
  };

  const handleEdit = (coach) => {
    setEditingCoachId(coach._id);
    setEditedCoach({ ...coach });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${BASE_URL}/api/coaches/${editingCoachId}`, editedCoach);
      setEditingCoachId(null);
      setEditedCoach({});
      fetchCoaches();
    } catch (err) {
      console.error("Error updating coach:", err);
    }
  };

  const filtered = coaches.filter((coach) =>
    coach.name.toLowerCase().includes(search.toLowerCase()) ||
    coach.coachId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gradient-to-b from-black via-[#1B1C57] to-black min-h-screen text-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-yellow-400">
        Coaches Management (Admin View)
      </h2>

      {/* Add Coach Form */}
      <div className="flex flex-wrap gap-4 mb-10 justify-center">
        <input
          type="text"
          placeholder="Name"
          value={newCoach.name}
          onChange={(e) => setNewCoach({ ...newCoach, name: e.target.value })}
          className="px-3 py-2 rounded-lg bg-[#1f1f3a] text-white placeholder-gray-400 focus:ring-2 ring-yellow-400"
        />
        <input
          type="text"
          placeholder="Coach ID"
          value={newCoach.coachId}
          onChange={(e) => setNewCoach({ ...newCoach, coachId: e.target.value })}
          className="px-3 py-2 rounded-lg bg-[#1f1f3a] text-white placeholder-gray-400 focus:ring-2 ring-yellow-400"
        />
        <input
          type="text"
          placeholder="Contact"
          value={newCoach.contact}
          onChange={(e) => setNewCoach({ ...newCoach, contact: e.target.value })}
          className="px-3 py-2 rounded-lg bg-[#1f1f3a] text-white placeholder-gray-400 focus:ring-2 ring-yellow-400"
        />
        <input
          type="date"
          placeholder="Expiration"
          value={newCoach.expiration}
          onChange={(e) => setNewCoach({ ...newCoach, expiration: e.target.value })}
          className="px-3 py-2 rounded-lg bg-[#1f1f3a] text-white placeholder-gray-400 focus:ring-2 ring-yellow-400"
        />
        <button
          onClick={handleAddCoach}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-lg font-semibold transition"
        >
          Add Coach
        </button>
      </div>

      {/* Coaches Table */}
      <div className="bg-[#2e2b8f] text-white rounded-xl p-6 shadow-xl max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Show</span>
            <select className="bg-white text-[#1B1C57] text-sm rounded px-2 py-1">
              <option>10</option>
              <option>20</option>
              <option>30</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-white rounded px-2 py-1">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-black p-1 outline-none"
            />
            <FaSearch className="text-[#1B1C57]" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#3f3cd1] text-yellow-300">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Coach ID</th>
                <th className="px-4 py-2 text-left">Contact</th>
                <th className="px-4 py-2 text-left">Expiration</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((coach) => (
                  <tr key={coach._id} className="border-b border-[#4948a8]">
                    <td className="px-4 py-3">
                      {editingCoachId === coach._id ? (
                        <input
                          value={editedCoach.name}
                          onChange={(e) => setEditedCoach({ ...editedCoach, name: e.target.value })}
                          className="bg-[#1f1f3a] text-white px-2 py-1 rounded"
                        />
                      ) : (
                        coach.name
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingCoachId === coach._id ? (
                        <input
                          value={editedCoach.coachId}
                          onChange={(e) => setEditedCoach({ ...editedCoach, coachId: e.target.value })}
                          className="bg-[#1f1f3a] text-white px-2 py-1 rounded"
                        />
                      ) : (
                        coach.coachId
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingCoachId === coach._id ? (
                        <input
                          value={editedCoach.contact}
                          onChange={(e) => setEditedCoach({ ...editedCoach, contact: e.target.value })}
                          className="bg-[#1f1f3a] text-white px-2 py-1 rounded"
                        />
                      ) : (
                        coach.contact
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingCoachId === coach._id ? (
                        <input
                          type="date"
                          value={editedCoach.expiration}
                          onChange={(e) => setEditedCoach({ ...editedCoach, expiration: e.target.value })}
                          className="bg-[#1f1f3a] text-white px-2 py-1 rounded"
                        />
                      ) : (
                        coach.expiration
                      )}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      {editingCoachId === coach._id ? (
                        <>
                          <button
                            onClick={handleUpdate}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingCoachId(null)}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-xs"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(coach)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(coach._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-300">
                    No coaches found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
