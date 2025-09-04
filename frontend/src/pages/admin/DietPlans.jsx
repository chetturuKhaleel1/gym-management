import { useState, useEffect } from 'react';

const DietPlans = () => {
  const [diets, setDiets] = useState([]);
  const [form, setForm] = useState({ title: '', meals: '' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', meals: '' });

  const fetchDiets = async () => {
    try {
      const res = await fetch('/api/diets');
      const data = await res.json();
      setDiets(data);
    } catch (err) {
      console.error("Failed to fetch diets", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/diets/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          meals: form.meals.split(',').map(m => m.trim())
        })
      });
      setForm({ title: '', meals: '' });
      fetchDiets();
    } catch (err) {
      console.error("Failed to add diet", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/diets/${id}`, {
        method: 'DELETE'
      });
      fetchDiets();
    } catch (err) {
      console.error("Failed to delete diet", err);
    }
  };

  const handleEdit = (diet) => {
    setEditingId(diet._id);
    setEditForm({ title: diet.title, meals: diet.meals.join(', ') });
  };

  const handleUpdate = async () => {
    try {
      await fetch(`/api/diets/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editForm.title,
          meals: editForm.meals.split(',').map(m => m.trim())
        })
      });
      setEditingId(null);
      fetchDiets();
    } catch (err) {
      console.error("Failed to update diet", err);
    }
  };

  useEffect(() => { fetchDiets(); }, []);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4">🥗 Diet Plans</h2>

      {/* Add Diet Form */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          className="p-2 rounded bg-gray-800 w-full"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="p-2 rounded bg-gray-800 w-full"
          placeholder="Meals (comma separated)"
          value={form.meals}
          onChange={e => setForm({ ...form, meals: e.target.value })}
        />
        <button className="bg-green-600 px-4 py-2 rounded" type="submit">Add Diet</button>
      </form>

      {/* Diet List */}
      <ul className="mt-4 space-y-2">
        {diets.map(d => (
          <li key={d._id} className="bg-gray-800 p-3 rounded">
            {editingId === d._id ? (
              <>
                <input
                  className="p-1 rounded bg-gray-700 mr-2"
                  value={editForm.title}
                  onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                />
                <input
                  className="p-1 rounded bg-gray-700 mr-2 w-1/2"
                  value={editForm.meals}
                  onChange={e => setEditForm({ ...editForm, meals: e.target.value })}
                />
                <button
                  className="bg-yellow-500 px-2 py-1 rounded mr-2"
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  className="bg-gray-500 px-2 py-1 rounded"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <strong>{d.title}</strong>: {d.meals.join(', ')}
                <div className="mt-2 flex gap-2">
                  <button
                    className="bg-blue-600 px-2 py-1 rounded"
                    onClick={() => handleEdit(d)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 px-2 py-1 rounded"
                    onClick={() => handleDelete(d._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DietPlans;
