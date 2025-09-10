import React, { useEffect, useState } from "react";
import axios from "axios";

const Valentine = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/flowers");
        const valentineFlowers = res.data.filter(f => f.category === "Valentine");
        setFlowers(valentineFlowers);
      } catch (err) {
        console.error(err);
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
            Express Your Love with Romantic Bouquets ❤️
          </h1>
          <p style={{ fontSize: "2rem", color: "#555" }}>
            From classic red roses to unique romantic arrangements, find the perfect bouquet to say “I Love You” this Valentine’s.
          </p>
        </div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9jcc2GG4Sfky5F80ESzdaRYbAIdwgQ15O5mCTNqQRnoMm7CawfzKMkfAGrr4jp9W6lWY&usqp=CAU"
          alt="banner"
          style={{ width: "35%", borderRadius: "12px", objectFit: "cover" }}
        />
      </div>

      {/* Flower Grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {flowers.length === 0 ? (
          <p>No Valentine bouquets yet.</p>
        ) : (
          flowers.map(f => (
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
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={e => {
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
                onMouseEnter={e => { e.target.style.backgroundColor = "#d29ef2"; }}
                onMouseLeave={e => { e.target.style.backgroundColor = "#E6C3F7"; }}
              >
                Add To Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Valentine;

