import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const SupplementStore = () => {
  const [supplements, setSupplements] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSupplements = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/supplements");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setSupplements(data);
    } catch (err) {
      toast.error("Error fetching supplements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplements();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.category.trim()
    ) {
      toast.error("Please fill in all fields correctly.");
      return;
    }

    try {
      setLoading(true);
      const url = editId
        ? `/api/supplements/${editId}`
        : "/api/supplements/add";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Something went wrong");
      }

      toast.success(editId ? "✏️ Supplement updated!" : "✅ Supplement added!");
      setFormData({ name: "", description: "", category: "" });
      setEditId(null);
      fetchSupplements();
    } catch (err) {
      toast.error(`❌ Failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplement?")) return;
    try {
      const res = await fetch(`/api/supplements/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("🗑️ Deleted successfully");
      setSupplements((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      toast.error("❌ Failed to delete");
    }
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6 min-h-screen rounded-lg shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 dark:text-indigo-400">
        💊 Supplement Store
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
      >
        {["name", "description", "category"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            required
            className="border border-indigo-300 dark:border-indigo-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        ))}
        <button
          type="submit"
          disabled={loading}
          className="col-span-1 md:col-span-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 rounded-lg shadow-lg transition focus:ring-4 focus:ring-indigo-400"
        >
          {editId ? "✏️ Update Supplement" : loading ? "Adding..." : "➕ Add Supplement"}
        </button>
      </form>

      <h3 className="text-2xl font-semibold mb-6 text-center text-indigo-800 dark:text-indigo-300">
        🧾 All Supplements
      </h3>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading supplements...</p>
      ) : supplements.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-500">No supplements found.</p>
      ) : (
        <ul className="space-y-5">
          {supplements.map((item) => (
            <li
              key={item._id}
              className="border border-indigo-300 dark:border-indigo-700 rounded-lg p-5 bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition"
            >
              <h4 className="text-xl font-bold text-indigo-700 dark:text-indigo-400">{item.name}</h4>
              <p className="mt-1 text-gray-700 dark:text-gray-300">{item.description}</p>
              <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-300 font-semibold">
                🏷️ Category: {item.category}
              </p>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => startEdit(item)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SupplementStore;
