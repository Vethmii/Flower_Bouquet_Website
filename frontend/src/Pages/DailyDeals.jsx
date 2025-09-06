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
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#F5F5F5",
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
            Fresh Blooms, Fresh Offers Every Day 🌸
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#555" }}>
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "30px",
          justifyItems: "center",
          padding: "0 40px",
        }}
      >
        {deals.length === 0 ? (
          <p>No deals available right now.</p>
        ) : (
          deals.map((d) => {
            const discount =
              d.originalPrice && d.discountPrice
                ? Math.round(((d.originalPrice - d.discountPrice) / d.originalPrice) * 100)
                : 0;

            return (
              <div
                key={d._id}
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
                {/* Discount Badge */}
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

                <img
                  src={d.imageURL}
                  alt={d.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <h3 style={{ margin: "15px 0 5px", color: "#333" }}>{d.name}</h3>
                <p style={{ fontWeight: "bold", color: "#7D4AEA" }}>Rs. {d.discountPrice}</p>
                <p style={{ textDecoration: "line-through", color: "#777", marginBottom: "10px" }}>
                  Rs. {d.originalPrice}
                </p>

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
          })
        )}
      </div>

      {/* Footer Note */}
      <div style={{ textAlign: "center", margin: "40px 0", color: "#444" }}>
        <h3>Grab Your Favorite Bouquet Before Today’s Deals Wilt Away!</h3>
      </div>
    </div>
  );
};

export default DailyDeals;
