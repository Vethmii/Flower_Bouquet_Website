import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DailyDeals.css";

const API_BASE = "http://localhost:5000/api/flowers";

export default function DailyDeals() {
  const [dealsFlowers, setDealsFlowers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDeals = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      // Filter flowers that have dailyDeals and attach latest deal
      const withDeals = res.data
        .filter(f => f.dailyDeals?.length > 0)
        .map(f => {
          const latestDeal = f.dailyDeals.reduce((a, b) =>
            new Date(a.createdAt) > new Date(b.createdAt) ? a : b
          );
          return { ...f, activeDeal: latestDeal };
        });

      setDealsFlowers(withDeals);
    } catch (err) {
      console.error("Error fetching daily deals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading daily deals...</p>;
  if (dealsFlowers.length === 0) return <p style={{ padding: 20 }}>No daily deals right now.</p>;

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#F5F5F5", padding: "40px" }}>
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
            Fresh Blooms, Fresh Offers Every Day 🌸
          </h1>
          <p style={{ fontSize:"2rem", color: "#555" }}>
            Discover our daily handpicked deals on stunning bouquets. Limited-time discounts on the freshest flowers, perfect for last-minute gifts or treating yourself to a little floral joy.
          </p>
        </div>
        <img
          src="https://b2895521.smushcdn.com/2895521/wp-content/uploads/2023/01/Nurturing-Pink-Bouquet-1.jpg?lossy=0&strip=1&webp=1"
          alt="banner"
          style={{ width: "35%", borderRadius: "12px", objectFit: "cover" }}
        />
      </div>

      {/* Deals Section */}
      <div style={{ textAlign: "center", margin: "40px 0 20px" }}>
        <h2 style={{ fontSize: "2rem", color: "#FF6B6B" }}>Today’s Deals – Hurry!</h2>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "30px",
        justifyItems: "center",
        padding: "0 40px",
      }}>
        {dealsFlowers.map((f) => {
          const discount = f.activeDeal?.discountPrice
            ? Math.round(((f.price - f.activeDeal.discountPrice) / f.price) * 100)
            : 0;
          return (
            <div
              key={f._id}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
                width: "240px",
                textAlign: "center",
                position: "relative",
              }}
            >
              {discount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    backgroundColor: "#FF6B6B",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                  }}
                >
                  -{discount}% OFF
                </span>
              )}

              <img src={f.imageURL} alt={f.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <h3 style={{ margin: "15px 0 5px", color: "#333" }}>{f.name}</h3>
              <p style={{ fontWeight: "bold", color: "#7D4AEA" }}>
                Rs. {f.activeDeal?.discountPrice || f.price}
              </p>
              {f.activeDeal?.discountPrice && (
                <p style={{ textDecoration: "line-through", color: "#777", marginBottom: "10px" }}>
                  Rs. {f.price}
                </p>
              )}

              <button
                style={{
                  backgroundColor: "#7D4AEA",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  marginBottom: "15px",
                  cursor: "pointer",
                  transition: "background 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#5A32B0")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#7D4AEA")}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div style={{ textAlign: "center", margin: "40px 0", color: "#444", fontSize: "2rem" }}>
        <h3>Grab Your Favorite Bouquet Before Today’s Deals Wilt Away!</h3>
      </div>
    </div>
  );
}



