import React, { useEffect, useState } from 'react';

const API_BASE_URL = "https://gym-management-backend-0tn2.onrender.com/api";

const AvailablePlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `${API_BASE_URL}/plans`;
      console.log("📡 Fetching plans from:", url);
      const res = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${token}`, // Include token for auth
        },
      });
      const data = await res.json();
      if (res.ok) {
        setPlans(data);
      } else {
        console.error("❌ Error fetching plans:", data.message);
      }
    } catch (error) {
      console.error("❌ Failed to fetch plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    fetchPlans();
    loadRazorpayScript();
  }, []);

  const handleBuy = async (plan) => {
    const token = localStorage.getItem('token');
    const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
    try {
      const res = await fetch(`${API_BASE_URL}/payments/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: plan.price,
          planId: plan._id,
        }),
      });
      const data = await res.json();
      const options = {
        key,
        amount: data.amount,
        currency: 'INR',
        name: 'Gym Membership',
        description: plan.title,
        order_id: data.orderId,
        handler: async (response) => {
          console.log('📥 Razorpay response:', response);
          try {
            const verifyRes = await fetch(`${API_BASE_URL}/payments/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                planId: plan._id,
                amount: plan.price,
              }),
            });
            const verifyData = await verifyRes.json();
            console.log("✅ Backend verification success:", verifyData);
            alert("✅ Payment verified & saved!");
          } catch (err) {
            console.error("❌ Error verifying payment:", err);
            alert("❌ Payment verification failed.");
          }
        },
        prefill: {
          name: data.user?.name || "User",
          email: data.user?.email || "noemail@example.com",
        },
        theme: {
          color: '#6366f1',
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error('Payment error:', err);
      alert('Payment failed. Try again.');
    }
  };

  if (loading) return <p className="text-center p-4">Loading plans...</p>;




  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Membership Plans</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan._id} className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
            <h2 className="text-xl font-semibold text-indigo-600">{plan.title}</h2>
            <p className="text-gray-600 mb-2">₹{plan.price}</p>
            <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
            <button
              onClick={() => handleBuy(plan)}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailablePlans;
