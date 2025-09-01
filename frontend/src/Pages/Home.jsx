import React from "react";
import Bloom_Bash from "../assets/images/Bloom_Bash.jpg";
import Blossom_Bliss from "../assets/images/Blossom_Bliss.jpg";
import Happy_Smile from "../assets/images/Happy_Smile.jpg";
import Lavender from "../assets/images/Lavender.jpg";
import Rays_Of_Purple from "../assets/images/Rays_Of_Purple.jpg";
import Lavish_Love from "../assets/images/Lavish_Love.jpg";
import Sunshine_Mix from "../assets/images/Sunshine_Mix.jpg";
import Vibrant_Sunset from "../assets/images/Vibrant_Sunset.jpg";

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
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>Welcome to Flower Bouquet Website</h1>
      <p style={{ textAlign: "center", marginBottom: "30px" }}>
        Explore our beautiful bouquets and daily deals!
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          justifyItems: "center",
        }}
      >
        {flowers.map((flower) => (
          <div
            key={flower.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
              width: "220px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
          >
            <img
              src={flower.image}
              alt={flower.name}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <h3 style={{ margin: "10px 0" }}>{flower.name}</h3>
            <p style={{ fontWeight: "bold", color: "#555", marginBottom: "10px" }}>
              Price: Rs. {flower.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
