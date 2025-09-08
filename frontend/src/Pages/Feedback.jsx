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
            Your Words Blossom Our Growth ...
          </h1>
          <p style={{ fontSize:" 2rem",color: "#555" }}>
            Share your experience and help us bloom better. Read what our happy customers say and leave your feedback to inspire us to create even more beautiful floral moments for you.
          </p>
        </div>
        <img
          src="https://images.pexels.com/photos/5409706/pexels-photo-5409706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="banner"
          style={{ width: "35%", borderRadius: "12px", objectFit: "cover" }}
        />
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
