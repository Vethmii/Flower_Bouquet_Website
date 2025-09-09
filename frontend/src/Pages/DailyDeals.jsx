import React, { useState, useEffect } from "react";
import axios from "axios";

const DailyDeals = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/deals");
        setDeals(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDeals();
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "'Poppins', sans-serif", backgroundColor: "#F5F5F5" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#FF6B6B" }}>🌸 Daily Deals 🌸</h1>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          Grab our best-selling bouquets at special prices today only!
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "30px",
          justifyItems: "center",
        }}
      >
        {deals.length === 0 ? (
          <p>No deals available right now.</p>
        ) : (
          deals.map((d) => (
            <div
              key={d._id}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, boxShadow 0.3s",
                cursor: "pointer",
                width: "220px",
                textAlign: "center",
              }}
            >
              <img src={d.imageURL} alt={d.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <h3 style={{ margin: "15px 0 5px", color: "#FF6B6B" }}>{d.name}</h3>
              <p style={{ fontWeight: "bold", color: "#7D4AEA" }}>Rs. {d.discountPrice}</p>
              <p style={{ textDecoration: "line-through", color: "#777" }}>Rs. {d.originalPrice}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DailyDeals;
