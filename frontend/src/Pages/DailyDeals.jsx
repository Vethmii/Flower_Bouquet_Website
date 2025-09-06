// DailyDeals.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DailyDeals.css";

const API_BASE = "http://localhost:5000/api/flowers";

export default function DailyDeals() {
  const [dealsFlowers, setDealsFlowers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      const withDeals = res.data
        .map(f => ({ ...f, dailyDeals: f.dailyDeals || [] }))
        .filter(f => f.dailyDeals.length > 0)
        .map(f => {
          const latest = f.dailyDeals.reduce((a, b) =>
            new Date(a.createdAt) > new Date(b.createdAt) ? a : b
          );
          return { ...f, activeDeal: latest };
        });

      setDealsFlowers(withDeals);
    } catch (err) {
      console.error("DailyDeals fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading daily deals...</p>;
  if (dealsFlowers.length === 0) return <p style={{ padding: 20 }}>No daily deals right now.</p>;

  return (
    <div className="daily-deals-page">
      <h1>Daily Deals</h1>
      <div className="deals-grid">
        {dealsFlowers.map(f => (
          <div key={f._id} className="deal-card">
            <div className="user-deal-square left">
              <span className="user-deal-text">{f.activeDeal.percent}% OFF</span>
            </div>
            <img src={f.imageURL} alt={f.name} />
            <div className="deal-card-body">
              <h3>{f.name}</h3>
              <p className="price">Rs. {f.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


