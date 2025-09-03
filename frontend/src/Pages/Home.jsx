import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null);     // Track fetch errors

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

  return (
    <div style={{ padding: "40px", fontFamily: "'Poppins', sans-serif", backgroundColor: "#F5F5F5" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "3rem", color: "#7D4AEA", marginBottom: "10px" }}>Welcome to Nonimi Flora</h1>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          Every bouquet is crafted with care, creativity, and a love for beautiful moments.
        </p>
      </div>

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
              cursor: "pointer"
            }}
          >
            Retry
          </button>
        </div>
      ) : flowers.length === 0 ? (
        <p style={{ textAlign: "center", color: "#555" }}>No bouquets available yet.</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "30px",
          justifyItems: "center"
        }}>
          {flowers.map(f => (
            <div key={f._id} style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "pointer",
              width: "220px",
              textAlign: "center",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"; }}
            >
              <img src={f.imageURL} alt={f.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <h3 style={{ margin: "15px 0 5px", color: "#7D4AEA" }}>{f.name}</h3>
              <p style={{ fontWeight: "bold", color: "#FF6B6B", marginBottom: "15px" }}>Rs. {f.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
