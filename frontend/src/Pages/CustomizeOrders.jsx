import React from "react";
import Bloom_Bash from "../assets/images/Bloom_Bash.jpg";
import Happy_Smile from "../assets/images/Happy_Smile.jpg";
import Lavish_Love from "../assets/images/Lavish_Love.jpg";

const CustomizeOrders = () => {
  return (
    <div>
      {/* Header Banner */}
      <div
        style={{
          backgroundColor: "#f7f2fb",
          padding: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "8px",
          margin: "20px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h1 style={{ color: "#800080" }}>Customize Your Bouquet</h1>
          <p style={{ color: "#333" }}>
            Personalize your flower arrangement to match your style and
            occasion. Choose from a wide range of blooms, colors, and wrapping
            styles – we’ll craft it just the way you imagined.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
          alt="Bouquet"
          style={{ width: "300px", borderRadius: "10px" }}
        />
      </div>

      {/* Main Section */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          margin: "20px",
        }}
      >
        {/* Left - Previous Orders */}
        <div style={{ flex: 1 }}>
          <h2 style={{ color: "#800080" }}>Previous Custom Orders – Get Inspired!</h2>
          <div style={{ display: "grid", gap: "15px" }}>
            <img src={Bloom_Bash} alt="Custom Order 1" style={{ width: "50%", borderRadius: "5px" }} />
            <img src={Happy_Smile} alt="Custom Order 2" style={{ width: "50%", borderRadius: "5px" }} />
            <img src={Lavish_Love} alt="Custom Order 3" style={{ width: "50%", borderRadius: "5px" }} />
          </div>
        </div>

        {/* Right - Form */}
        <div style={{ flex: 1, backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ color: "#800080" }}>Customize Order Form</h2>
          <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input type="text" placeholder="Customer Name" style={inputStyle} />
            <input type="text" placeholder="Contact No" style={inputStyle} />
            <input type="text" placeholder="Occasion Type" style={inputStyle} />
            <input type="text" placeholder="Preferred Flowers / Colors" style={inputStyle} />
            <input type="text" placeholder="Wrapping Style" style={inputStyle} />
            <input type="date" placeholder="Delivery Date" style={inputStyle} />
            <input type="file" style={inputStyle} />
            <button type="submit" style={buttonStyle}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#800080",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default CustomizeOrders;
