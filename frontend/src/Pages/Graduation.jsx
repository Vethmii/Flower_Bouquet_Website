import React, { useEffect, useState } from "react";
import axios from "axios";

const Graduation = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/flowers");
        // Filter for Graduation category
        const graduationFlowers = res.data.filter(f => f.category === "Graduation");
        setFlowers(graduationFlowers);
      } catch (err) {
        console.error("Error fetching graduation bouquets:", err);
      }
    };

    fetchFlowers();
  }, []);

  return (
    <div>
      <h1>Graduation Bouquets</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {flowers.length === 0 ? (
          <p>No graduation bouquets available yet.</p>
        ) : (
          flowers.map(f => (
            <div key={f._id} style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
              <img src={f.imageURL} alt={f.name} style={{ width: "100%" }} />
              <h3>{f.name}</h3>
              <p>Price: ${f.price}</p>
              <p>Stock: {f.stock}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Graduation;
