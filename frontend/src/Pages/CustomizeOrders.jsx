import React, { useState } from "react";
import axios from "axios";

const CustomizeOrders = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    occasion: "",
    description: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/custom-orders", formData);
      setMessage("Your custom order has been submitted!");
      setFormData({ name: "", email: "", phone: "", occasion: "", description: "" });
    } catch (err) {
      setMessage("Error submitting order. Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Customize Your Bouquet</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <select name="occasion" value={formData.occasion} onChange={handleChange} required>
          <option value="">Select Occasion</option>
          <option value="Birthday">Birthday</option>
          <option value="Graduation">Graduation</option>
          <option value="Valentine">Valentine</option>
        </select>
        <textarea name="description" placeholder="Describe your custom bouquet" value={formData.description} onChange={handleChange} required />
        <button type="submit">Submit Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CustomizeOrders;
