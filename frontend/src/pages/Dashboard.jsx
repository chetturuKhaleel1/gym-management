import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import { toast } from 'react-toastify';
import MemberBills from './member/MemberBills';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [updating, setUpdating] = useState(false);

  const [alreadyPaid, setAlreadyPaid] = useState(false); // ✅ Moved inside component

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const storedToken = localStorage.getItem('token');

      if (!storedUser || !storedToken) throw new Error();

      setUser(storedUser);
      setToken(storedToken);
      setNewName(storedUser.name);
    } catch {
      toast.error("Not authorized. Please login.");
      localStorage.clear();
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (!token) return;

    const fetchMembership = async () => {
      try {
        const res = await fetch('/api/membership/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 404) {
          setMembership(null);
        } else if (!res.ok) {
          throw new Error('Failed to fetch membership.');
        } else {
          const data = await res.json();
          setMembership(data);
        }
      } catch (err) {
        console.error('❌ Membership fetch error:', err.message);
        setMembership(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMembership();
  }, [token]);









const checkPaymentStatus = async () => {
  try {
    const planId = membership?.plan?._id;
    if (!planId || !token) return;

    const res = await fetch(`/api/payments/check/${planId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setAlreadyPaid(data.alreadyPaid);
    console.log("✅ Already paid:", data.alreadyPaid);
  } catch (err) {
    console.error("❌ Error checking payment status:", err.message);
  }
};








  // useEffect(() => {
  //   if (membership && token) checkPaymentStatus();
  // }, [membership, token]);
  useEffect(() => {
  if (membership?.plan?._id && token) {
    checkPaymentStatus();
  }
}, [membership, token]);


  useEffect(() => {
    if (!user || !token) return;

    const fetchUnread = async () => {
      try {
        const userId = user._id || user.id;
        const res = await fetch(`/api/notifications/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setNotifications(data);
          const unread = data.filter(n => !n.read).length;
          setUnreadCount(unread);
        }
      } catch (err) {
        console.error('❌ Notification load error:', err.message);
      }
    };

    fetchUnread();
  }, [token, user]);

  const handleBellClick = async () => {
    setShowNotifications(prev => !prev);

    if (!showNotifications && unreadCount > 0 && user?._id) {
      try {
        await fetch(`/api/notifications/mark-read/${user._id}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
        });
        setUnreadCount(0);
      } catch (err) {
        console.error("❌ Failed to mark notifications as read:", err.message);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await fetch("/api/users/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newName,
          password: newPassword,
        }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const updatedUser = await res.json();
      setUser((prev) => ({ ...prev, name: newName }));
      localStorage.setItem("user", JSON.stringify({ ...user, name: newName }));
      setNewPassword('');
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN') + ' ' + date.toLocaleTimeString('en-IN');
  };

  if (!user || !token) return null;
console.log("🧠 Membership Plan:", membership?.plan?.title);
console.log("🧠 Already Paid:", alreadyPaid);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex">
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <nav className="space-y-2">
          <a href="/" className="block hover:underline">Home</a>
          <a href="/plans" className="block hover:underline">Plans</a>
        </nav>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6 relative">
          <h1 className="text-3xl font-bold">Welcome, {user?.name || 'Member'}!</h1>

          <div className="relative" ref={dropdownRef}>
            <button onClick={handleBellClick} className="relative">
              <FaBell className="text-2xl text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border z-50 p-4">
                <h2 className="text-lg font-semibold mb-2 text-yellow-800">Notifications</h2>
                {notifications.length === 0 ? (
                  <p className="text-sm text-gray-500">No notifications</p>
                ) : (
                  notifications.map((note) => (
                    <div key={note._id} className="p-2 border-b last:border-b-0">
                      <h4 className="font-bold">{note.title}</h4>
                      <p>{note.message}</p>
                      <p className="text-xs text-gray-600">{formatDate(note.date)}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>





   {/* Membership */}
{loading ? (
  <div className="text-center text-blue-600 font-semibold">Loading membership details...</div>
) : (
  <div className="bg-white shadow-md rounded p-6 w-full max-w-md text-center mx-auto">

    {membership ? (
      <>
        <h2 className="text-xl font-semibold mb-2">
          Current Plan: {membership?.plan?.title || 'Loading...'}
        </h2>
        <p>Start Date: {formatDate(membership.startDate)}</p>
        <p>Expires At: {formatDate(membership.expiresAt)}</p>
      </>
    ) : (
      <p className="text-gray-600 mb-4">No active membership found.</p>
    )}

    <button
      onClick={() => navigate('/plans')}
      className={`mt-4 w-full ${
        alreadyPaid ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
      } text-white py-2 px-4 rounded`}
      disabled={alreadyPaid}
    >
      {alreadyPaid ? 'Already Paid' : membership ? 'Renew Plan' : 'Buy Plan'}
    </button>

    {alreadyPaid && (
      <div className="mt-2 text-green-600 font-semibold">
        ✅ You have already paid for this month.
      </div>
    )}
  </div>
)}






        <div className="mt-10">
          <MemberBills user={user} token={token} />
        </div>

        <div className="mt-10 max-w-md bg-white p-6 rounded shadow-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <button
              type="submit"
              disabled={updating}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              {updating ? 'Updating...' : 'Update'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
