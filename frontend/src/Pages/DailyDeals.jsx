import React, { useEffect, useState } from "react";
import axios from "axios";

const DailyDeals = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/flowers");
        setFlowers(res.data);
      } catch (err) {
        console.error("Error fetching flowers:", err);
      }
    };

    fetchFlowers();
  }, []);

  return (
    <div>
      <h1>Daily Deals</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {flowers.length === 0 ? (
          <p>No deals available yet.</p>
        ) : (
          flowers.map((flower) => (
            <div key={flower._id} style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
              <img src={flower.imageURL} alt={flower.name} style={{ width: "100%" }} />
              <h3>{flower.name}</h3>
              <p>Category: {flower.category}</p>
              <p>Price: ${flower.price}</p>
              <p>Stock: {flower.stock}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DailyDeals;
