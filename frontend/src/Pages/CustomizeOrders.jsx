import React, { useState } from "react";
import axios from "axios";

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
      setCustomerName(""); setContactNo(""); setOccasionType(""); setPreferredFlowers("");
      setWrappingStyle(""); setDeliveryDate(""); setFile(null);

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error submitting order. Check console.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Customize Your Bouquet</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
        <input type="text" placeholder="Customer Name" value={customerName} onChange={e => setCustomerName(e.target.value)} required />
        <input type="text" placeholder="Contact No" value={contactNo} onChange={e => setContactNo(e.target.value)} required />
        <input type="text" placeholder="Occasion Type" value={occasionType} onChange={e => setOccasionType(e.target.value)} required />
        <input type="text" placeholder="Preferred Flowers / Colors" value={preferredFlowers} onChange={e => setPreferredFlowers(e.target.value)} />
        <input type="text" placeholder="Wrapping Style" value={wrappingStyle} onChange={e => setWrappingStyle(e.target.value)} />
        <input type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} />
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="submit" style={{ padding: "10px", backgroundColor: "#800080", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomizeOrders;
