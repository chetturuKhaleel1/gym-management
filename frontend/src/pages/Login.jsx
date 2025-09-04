import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BASE_URL = "https://gym-management-backend-0tn2.onrender.com";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Login failed');
        setLoading(false);
        return;
      }
      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success("Login successful!");
        const role = data.user.role?.toLowerCase();
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else if (role === 'member') {
          navigate('/dashboard');
        } else {
          toast.error("Unknown user role");
        }
      } else {
        toast.error("Invalid response from server");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <div className="bg-[#111111] p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-400">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-5" aria-live="polite">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoFocus
              disabled={loading}
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#1b1b1b] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="you@example.com"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              disabled={loading}
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#1b1b1b] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-9 text-gray-400 hover:text-green-400 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-black font-semibold py-2 rounded-md hover:bg-green-600 transition duration-200 disabled:opacity-60"
          >
            {loading ? 'Signing In...' : 'Login'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-400">
          Don’t have an account?{' '}
          <Link to="/register" className="text-green-400 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
