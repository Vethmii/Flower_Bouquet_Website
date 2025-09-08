import React, { useEffect, useState } from "react";
import axios from "axios";

const Graduation = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/flowers");
        const graduationFlowers = res.data.filter(f => f.category === "Graduation");
        setFlowers(graduationFlowers);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFlowers();
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#F5F5F5",padding: "40px"
      }}
    >
      {/* Banner Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#eacef0",
          padding: "40px",
          borderRadius: "16px",
          margin: "20px auto",
          width: "90%",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ maxWidth: "55%" }}>
          <h1 style={{ fontSize: "2.5rem", color: "#333", marginBottom: "15px" }}>
            Celebrate Achievements with Elegant Blooms  🎓 
          </h1>
           <p style={{ fontSize:" 2rem",color: "#555" }}>
            Congratulate the proud graduates with sophisticated bouquets that symbolize success and new beginnings.
          </p>
        </div>
        <img
          src="https://favflorist.com.sg/wp-content/uploads/2025/06/Top-10-Graduation-Bouquet-Trends-for-2025.jpg"
          alt="banner"
          style={{ width: "35%", borderRadius: "12px", objectFit: "cover" }}
        />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {flowers.length === 0 ? <p>No graduation bouquets yet.</p> :
          flowers.map(f => (
            <div key={f._id} style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
              <img src={f.imageURL} alt={f.name} style={{ width: "100%" }} />
              <h3>{f.name}</h3>
              <p>Price: Rs. {f.price}</p>
              <p>Stock: {f.stock}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Graduation;
