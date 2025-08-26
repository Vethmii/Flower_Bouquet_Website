import React from "react";
import "./Birthday.css";

const bouquets = [
  { id: 1, name: "Happy Smile", price: 3000, img: "/images/b1.jpg" },
  { id: 2, name: "Rays of Purple", price: 2500, img: "/images/b2.jpg" },
  { id: 3, name: "Lavish Love", price: 2900, img: "/images/b3.jpg" },
  { id: 4, name: "Bloom Bash", price: 1800, img: "/images/b4.jpg" },
  { id: 5, name: "Gleaming Love", price: 3200, img: "/images/b5.jpg" },
  { id: 6, name: "Prettiest Ever", price: 2500, img: "/images/b6.jpg" },
  { id: 7, name: "Golden Bloom", price: 1500, img: "/images/b7.jpg" },
  { id: 8, name: "Birthday Blooms", price: 2000, img: "/images/b8.jpg" },
  { id: 9, name: "Floral Joy", price: 2700, img: "/images/b9.jpg" },
  { id: 10, name: "Dreamy Petals", price: 2800, img: "/images/b10.jpg" },
  { id: 11, name: "Fresh Aura", price: 2600, img: "/images/b11.jpg" },
  { id: 12, name: "Sweet Moments", price: 2400, img: "/images/b12.jpg" },
];

function Birthday() {
  return (
    <div className="birthday-page">
      <h2>Birthday Bouquets 🎉</h2>
      <div className="bouquet-grid">
        {bouquets.map((item) => (
          <div className="bouquet-card" key={item.id}>
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Rs. {item.price}</p>
            <button>Add To Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Birthday;
