import React, { useEffect, useState } from "react";
import axios from "axios";

const Birthday = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/flowers");
        const birthdayFlowers = res.data.filter(f => f.category === "Birthday");
        setFlowers(birthdayFlowers);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFlowers();
  }, []);

  return (
    <div>
      <h1>Birthday Bouquets</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {flowers.length === 0 ? <p>No birthday bouquets yet.</p> :
          flowers.map(f => (
            <div key={f._id} style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
              <img src={f.imageURL} alt={f.name} style={{ width: "100%" }} />
              <h3>{f.name}</h3>
              <p>Price: Rs. {f.price}</p>
              <p>Stock: {f.stock}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Birthday;
