import React, { useEffect, useState } from "react";
import { FaCrown, FaGem, FaStar } from "react-icons/fa";

const API_BASE = "https://gym-management-backend-0tn2.onrender.com/api";


// 🌙 Theme based on membership plan name
const getPlanTheme = (name = "") => {
  const planName = name.toLowerCase();
  switch (planName) {
    case "gold":
      return {
        bg: "bg-[#2d2b1e] bg-opacity-80",
        text: "text-yellow-200",
        border: "border-yellow-400",
        icon: <FaCrown className="text-yellow-300 text-3xl mb-3" />,
      };
    case "platinum":
      return {
        bg: "bg-[#2a2d32] bg-opacity-80",
        text: "text-slate-200",
        border: "border-slate-400",
        icon: <FaGem className="text-slate-300 text-3xl mb-3" />,
      };
    case "silver":
      return {
        bg: "bg-[#2f2f2f] bg-opacity-80",
        text: "text-gray-200",
        border: "border-gray-400",
        icon: <FaStar className="text-gray-300 text-3xl mb-3" />,
      };
    default:
      return {
        bg: "bg-[#1a1a1a] bg-opacity-80",
        text: "text-white",
        border: "border-gray-700",
        icon: <FaGem className="text-white text-3xl mb-3" />,
      };
  }
};

const PlanSection = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/plans`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error((await res.json()).message || "Failed to fetch plans");
        const data = await res.json();
        setPlans(data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return <p className="text-center py-10 text-lg text-gray-400">Loading plans...</p>;
  }

  return (
    <section className="relative bg-[url('https://source.unsplash.com/1600x600/?gym,fitness')] bg-cover bg-center bg-no-repeat py-20 px-6 text-white">
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

      <div className="relative max-w-6xl mx-auto text-center z-10">
        <h2 className="text-5xl sm:text-6xl font-extrabold mb-16 drop-shadow-lg">
          Our Membership Plans
        </h2>

        <div className="grid gap-y-16 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => {
            const theme = getPlanTheme(plan.name);
            return (
              <div
                key={plan._id}
                className={`flex flex-col justify-between ${theme.bg} ${theme.text} border ${theme.border} rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300 shadow-lg backdrop-blur-md`}
              >
                <div className="text-center">
                  {theme.icon}
                  <h3 className="text-2xl font-bold capitalize mb-2">{plan.name}</h3>
                  <p className="text-3xl font-semibold mb-2">₹{plan.price}</p>
                  <p className="text-base text-gray-300">{plan.description}</p>
                </div>
                <ul className="text-sm font-medium text-left mt-4">
                  <li>
                    <span className="font-semibold">⏳ Duration:</span> {plan.duration} days
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlanSection;
