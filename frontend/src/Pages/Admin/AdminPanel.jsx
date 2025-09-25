import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [flowers, setFlowers] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Birthday");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:5000/api/flowers";

  // Fetch all flowers
  const fetchFlowers = async () => {
    try {
      const res = await axios.get(API_URL);
      setFlowers(res.data);
    } catch (err) {
      console.error("Error fetching flowers:", err.response?.data || err.message);
      alert("Failed to fetch flowers. Check console.");
    }
  };

  useEffect(() => {
    fetchFlowers();
  }, []);

  // Add / Edit flower
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", Number(price));
      formData.append("category", category);
      formData.append("stock", Number(stock) || 0);
      if (image) formData.append("image", image);

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditingId(null);
      } else {
        await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert(editingId ? "Flower updated!" : "Flower added!");
      setName("");
      setPrice("");
      setCategory("Birthday");
      setStock("");
      setImage(null);
      fetchFlowers();
    } catch (err) {
      console.error("Error submitting flower:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error submitting flower. Check console.");
    }
  };

  // Delete flower
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this flower?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchFlowers();
      } catch (err) {
        console.error("Error deleting flower:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Error deleting flower.");
      }
    }
  };

  // Edit flower
  const handleEdit = (flower) => {
    setEditingId(flower._id);
    setName(flower.name);
    setPrice(flower.price);
    setCategory(flower.category);
    setStock(flower.stock);
    setImage(null); // reset file input
  };

  return (
    <div className="admin-panel">
      <h2>{editingId ? "Edit Flower" : "Add New Flower"}</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Birthday</option>
          <option>Valentine</option>
          <option>Graduation</option>
          <option>Home</option>
        </select>
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">
          {editingId ? "Update Flower" : "Add Flower"}
        </button>
      </form>

      <h2 style={{ marginTop: "30px" }}>All Flowers</h2>
      <div className="flowers-list">
        {flowers.map((f) => (
          <div key={f._id} className="flower-card">
            <img src={f.imageURL} alt={f.name} className="flower-image" />
            <h3>{f.name}</h3>
            <p>Price: Rs. {f.price}</p>
            <p>Stock: {f.stock}</p>
            <div className="button-group">
              <button onClick={() => handleEdit(f)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => handleDelete(f._id)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;


