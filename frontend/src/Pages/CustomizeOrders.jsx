import React, { useState } from "react";
import axios from "axios";
import "./CustomizeOrders.css"; // keep CSS for future styling

const CustomizeOrders = () => {
  const [customerName, setCustomerName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [occasionType, setOccasionType] = useState("");
  const [preferredFlowers, setPreferredFlowers] = useState("");
  const [wrappingStyle, setWrappingStyle] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("customerName", customerName);
      formData.append("contactNo", contactNo);
      formData.append("occasionType", occasionType);
      formData.append("preferredFlowers", preferredFlowers);
      formData.append("wrappingStyle", wrappingStyle);
      formData.append("deliveryDate", deliveryDate);
      if (file) formData.append("file", file);

      await axios.post("http://localhost:5000/api/custom-orders", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Your custom order has been submitted!");
      setCustomerName("");
      setContactNo("");
      setOccasionType("");
      setPreferredFlowers("");
      setWrappingStyle("");
      setDeliveryDate("");
      setFile(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error submitting order. Check console.");
    }
  };

  return (
    <div className="customize-orders" style={{ backgroundColor: "#F5F5F5", padding: "40px" }}>
      {/* Banner Section */}
      <div className="customize-banner" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#eacef0",
        padding: "40px",
        borderRadius: "16px",
        margin: "20px auto",
        width: "90%",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}>
        <div style={{ maxWidth: "55%" }}>
          <h1 style={{ fontSize: "2.5rem", color: "#333", marginBottom: "15px" }}>
            Customize Your Bouquet
          </h1>
          <p style={{ fontSize: "2rem", color: "#555" }}>
            Personalize your flower arrangement to match your unique style and occasion. Choose your favorite blooms, colors, and wrapping — we’ll craft it just the way you imagined.
          </p>
        </div>
        <img
          src="https://www.flowerssameday.co.uk/images/large/LFHTP3.jpg"
          alt="banner"
          style={{ width: "35%", borderRadius: "12px", objectFit: "cover" }}
        />
      </div>

      {/* Form Section */}
      <div className="customize-form-container" style={{ marginTop: "30px" }}>
        <h2>Fill Your Preferences</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
          <input type="text" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
          <input type="text" placeholder="Contact No" value={contactNo} onChange={(e) => setContactNo(e.target.value)} required />
          <input type="text" placeholder="Occasion Type" value={occasionType} onChange={(e) => setOccasionType(e.target.value)} required />
          <input type="text" placeholder="Preferred Flowers / Colors" value={preferredFlowers} onChange={(e) => setPreferredFlowers(e.target.value)} />
          <input type="text" placeholder="Wrapping Style" value={wrappingStyle} onChange={(e) => setWrappingStyle(e.target.value)} />
          <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button type="submit" style={{ padding: "10px", backgroundColor: "#800080", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomizeOrders;

