import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlowers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("http://localhost:5000/api/flowers");
        setFlowers(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load bouquets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlowers();
  }, []);

  const handleAddToCart = (flower) => {
    alert(`${flower.name} added to cart!`); // Placeholder for cart integration
  };

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
            Where flowers speak for you...
          </h1>
          <p style={{ fontSize: "2rem", color: "#555" }}>
            Every bouquet is crafted with care, creativity, and a love for beautiful moments.
            Whether it's a celebration, a surprise, or just because — our blooms are designed to make it unforgettable.
          </p>
        </div>
        <img
          src="https://assets.eflorist.com/site/EF-2287/assets/products/PHR_/sku10240643.jpg"
          alt="banner"
          style={{ width: "35%", borderRadius: "12px", objectFit: "cover" }}
        />
      </div>

      {/* Flower Grid */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#555" }}>Loading bouquets...</p>
      ) : error ? (
        <div style={{ textAlign: "center", color: "red", marginBottom: "20px" }}>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "10px 20px",
              backgroundColor: "#7D4AEA",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      ) : flowers.length === 0 ? (
        <p style={{ textAlign: "center", color: "#555" }}>No bouquets available yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "30px",
            justifyItems: "center",
          }}
        >
          {flowers.map((f) => (
            <div
              key={f._id}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                padding: "10px 20px",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
                width: "220px",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)";
              }}
            >
              <img
                src={f.imageURL}
                alt={f.name}
                style={{ width: "100%", height: "280px", objectFit: "cover" }}
              />
              <h3 style={{ margin: "15px 0 5px", color: "#7D4AEA" }}>{f.name}</h3>
              <p style={{ fontWeight: "bold", color: "#FF6B6B", marginBottom: "15px" }}>Rs. {f.price}</p>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color:
                    f.stock === 0
                      ? "gray"
                      : f.stock <= 5
                      ? "red"
                      : f.stock <= 20
                      ? "orange"
                      : "green",
                }}
              >
                Stock: {f.stock}
              </p>
              <button
                onClick={() => handleAddToCart(f)}
                style={{
                  padding: "10px",
                  backgroundColor: "#E6C3F7",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  color: "#333",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#d29ef2";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#E6C3F7";
                }}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
