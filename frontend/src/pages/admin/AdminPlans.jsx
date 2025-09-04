import React, { useEffect, useState } from "react";

const AdminPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", price: "", duration: "", description: "" });
  const [editingPlanId, setEditingPlanId] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch("/api/plans");
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error("Failed to load plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/plans/${id}`, { method: "DELETE" });
      fetchPlans();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingPlanId ? "PUT" : "POST";
      const endpoint = editingPlanId ? `/api/plans/${editingPlanId}` : "/api/plans";
      await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setFormData({ title: "", price: "", duration: "", description: "" });
      setEditingPlanId(null);
      setShowForm(false);
      fetchPlans();
    } catch (error) {
      console.error("Save failed", error);
    }
  };
const handleEdit = (plan) => {
  setFormData({
    title: plan.title,
    price: plan.price,
    duration: plan.duration,
    description: plan.description
  });
  setEditingPlanId(plan._id); // This part is already correct
  setShowForm(true);
};


  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h2 className="text-4xl font-bold text-center mb-10 text-green-400">Admin Panel - All Gym Plans</h2>

      <div className="flex justify-end mb-4">
        <button
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          onClick={() => {
            setFormData({ title: "", price: "", duration: "", description: "" });
            setEditingPlanId(null);
            setShowForm(true);
          }}
        >
          + Add Plan
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleFormSubmit} className="bg-[#1c1c1c] p-6 rounded-xl mb-6 border border-green-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="p-2 bg-black border border-gray-600 rounded text-white"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="p-2 bg-black border border-gray-600 rounded text-white"
              required
            />
            <input
              type="text"
              placeholder="Duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="p-2 bg-black border border-gray-600 rounded text-white"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="p-2 bg-black border border-gray-600 rounded text-white"
              required
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded">
              {editingPlanId ? "Update Plan" : "Add Plan"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingPlanId(null);
              }}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-center text-gray-300">Loading Plans...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan._id} className="bg-[#1c1c1c] p-6 rounded-2xl shadow-md border border-green-600 hover:shadow-green-700 transition relative">
              <h3 className="text-2xl font-semibold text-yellow-400 mb-2">{plan.title}</h3>
              <div className="text-green-300 font-bold text-xl mb-2">₹{plan.price}</div>
              <div className="inline-block bg-green-900 text-green-300 text-xs px-3 py-1 rounded-full mb-3">
                Duration: {plan.duration}
              </div>
              <p className="text-gray-400 text-sm">{plan.description}</p>
              <div className="absolute top-2 right-2 space-x-2">
                <button onClick={() => handleEdit(plan)} className="text-blue-400 hover:underline text-sm">
                  Edit
                </button>
                <button onClick={() => handleDelete(plan._id)} className="text-red-400 hover:underline text-sm">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPlans;
