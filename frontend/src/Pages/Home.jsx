import React from "react";
import Bloom_Bash from "../assets/images/Bloom_Bash.jpg";
import Blossom_Bliss from "../assets/images/Blossom_Bliss.jpg";
import Happy_Smile from "../assets/images/Happy_Smile.jpg";
import Lavender from "../assets/images/Lavender.jpg";
import Rays_Of_Purple from "../assets/images/Rays_Of_Purple.jpg";
import Lavish_Love from "../assets/images/Lavish_Love.jpg";
import Sunshine_Mix from "../assets/images/Sunshine_Mix.jpg";
import Vibrant_Sunset from "../assets/images/Vibrant_Sunset.jpg";
import "../App.css"; // make sure your global styles are imported

const Home = () => {
  const flowers = [
    { id: 1, name: "Bloom Bash", price: 1600, image: Bloom_Bash },
    { id: 2, name: "Blossom Bliss", price: 2500, image: Blossom_Bliss },
    { id: 3, name: "Happy Smile", price: 3000, image: Happy_Smile },
    { id: 4, name: "Lavender", price: 1500, image: Lavender },
    { id: 5, name: "Rays Of Purple", price: 2500, image: Rays_Of_Purple },
    { id: 6, name: "Lavish Love", price: 2300, image: Lavish_Love },
    { id: 7, name: "Sunshine Mix", price: 3500, image: Sunshine_Mix },
    { id: 8, name: "Vibrant Sunset", price: 3500, image: Vibrant_Sunset },
  ];

  return (
    <div style={{ padding: "40px", fontFamily: "'Poppins', sans-serif", backgroundColor: "#F5F5F5" }}>
      {/* Hero Section */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "3rem", color: "#7D4AEA", marginBottom: "10px" }}>
          Welcome to Nonimi Flora
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          Every bouquet is crafted with care, creativity, and a love for beautiful moments. Whether it's a celebration, a surprise, or just because our blooms are designed to make it unforgettable.
        </p>
      </div>

      {/* Flower Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "30px",
          justifyItems: "center",
        }}
      >
        {flowers.map((flower) => (
          <div
            key={flower.id}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
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
              src={flower.image}
              alt={flower.name}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <h3 style={{ margin: "15px 0 5px", color: "#7D4AEA" }}>{flower.name}</h3>
            <p style={{ fontWeight: "bold", color: "#FF6B6B", marginBottom: "15px" }}>
              Rs. {flower.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
