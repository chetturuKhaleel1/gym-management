import React, { useEffect, useState } from "react";

const MemberNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  const userId = userInfo?._id;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/notifications/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchNotifications();
  }, [userId]);

  if (loading) {
    return <div className="p-6">Loading notifications...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">🔔 Your Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications assigned.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((note) => (
            <li
              key={note._id}
              className="p-4 border border-gray-300 rounded bg-yellow-50 dark:bg-gray-900"
            >
              <h3 className="font-bold text-lg">{note.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">{note.message}</p>
              <p className="text-xs text-gray-500 mt-1">📅 Month: {note.month}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MemberNotifications;
