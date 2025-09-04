import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const NotificationAssign = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [members, setMembers] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  const fetchMembers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/members", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch members");

      const data = await res.json();
      setMembers(data || []);
      console.log("✅ Members fetched:", data);
    } catch (error) {
      console.error("❌ Error fetching members:", error);
      toast.error("Failed to load members");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !selectedMember) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/notifications/assign-monthly", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          message: description,
          assignedTo: selectedMember,
          month: "July", // Optional: could be dynamic based on current month
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to assign notification");
      }

      toast.success("Notification assigned successfully ✅");
      setTitle("");
      setDescription("");
      setSelectedMember("");
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600 dark:text-blue-400">
        Assign Monthly Notification
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block mb-2 font-semibold">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-black dark:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notification title"
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2 font-semibold">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-black dark:text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter notification description"
          />
        </div>

        <div>
          <label htmlFor="member" className="block mb-2 font-semibold">
            Select Member
          </label>
          <select
            id="member"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-black dark:text-white"
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
          >
            <option value="">-- Select Member --</option>
            {members.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name} ({member.email})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
        >
          Assign Notification
        </button>
      </form>
    </div>
  );
};

export default NotificationAssign;
