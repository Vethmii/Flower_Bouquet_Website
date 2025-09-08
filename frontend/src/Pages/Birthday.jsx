import React, { useEffect, useState } from "react";
import axios from "axios";

const Birthday = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/flowers");
        const birthdayFlowers = res.data.filter(f => f.category === "Birthday");
        setFlowers(birthdayFlowers);
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
            Bouquets to Brighten Their Special Day  🎉
          </h1>
           <p style={{ fontSize:" 2rem",color: "#555" }}>
            Make birthdays extra special with our hand-crafted flower arrangements designed to bring smiles and joy.
          </p>
        </div>
        <img
          src="https://assets.intleflorist.com/site/0081A/PIM_Images/Regular/ATGB0100-1.png"
          alt="banner"
          style={{ width: "35%", borderRadius: "12px", objectFit: "cover" }}
        />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {flowers.length === 0 ? <p>No birthday bouquets yet.</p> :
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

export default Birthday;