import React, { useState, useEffect } from "react";
import axios from "axios";

const HappyCustomers = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/feedbacks");
        setFeedbacks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "'Poppins', sans-serif", backgroundColor: "#F5F5F5" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#457B9D" }}>💐 Happy Customers 💐</h1>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          See what our lovely customers say about their experience with Nonimi Flora.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {feedbacks.length === 0 ? (
          <p>No customer feedback yet.</p>
        ) : (
          feedbacks.map((fb) => (
            <div
              key={fb._id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <p style={{ fontSize: "1rem", color: "#333", marginBottom: "10px" }}>
                "{fb.message}"
              </p>
              <h4 style={{ color: "#7D4AEA", margin: 0 }}>— {fb.customerName}</h4>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HappyCustomers;
