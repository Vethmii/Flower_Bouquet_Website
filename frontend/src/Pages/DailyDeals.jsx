// DailyDeals.jsx (Users)
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DailyDeals.css";

const API_BASE = "http://localhost:5000/api/flowers";

export default function DailyDeals() {
  const [dealsFlowers, setDealsFlowers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDeals = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);

      // Filter flowers with dailyDeals and take the latest deal
      const withDeals = res.data
        .filter((f) => f.dailyDeals?.length > 0)
        .map((f) => {
          const latestDeal = f.dailyDeals.reduce((a, b) =>
            new Date(a.createdAt) > new Date(b.createdAt) ? a : b
          );
          return { ...f, activeDeal: latestDeal };
        });

      setDealsFlowers(withDeals);
    } catch (err) {
      console.error("Error fetching daily deals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading daily deals...</p>;
  if (dealsFlowers.length === 0)
    return <p style={{ padding: 20 }}>No daily deals right now.</p>;

  return (
    <div className="daily-deals-page">
      {/* Banner Section */}
      <div className="deals-banner">
        <div className="banner-text">
          <h1>Fresh Blooms, Fresh Offers Every Day 🌸</h1>
          <p>
            Discover our daily handpicked deals on stunning bouquets. Limited-time discounts on the freshest flowers, perfect for last-minute gifts or treating yourself to a little floral joy.
          </p>
        </div>
        <img
          src="https://b2895521.smushcdn.com/2895521/wp-content/uploads/2023/01/Nurturing-Pink-Bouquet-1.jpg?lossy=0&strip=1&webp=1"
          alt="banner"
        />
      </div>

      {/* Deals Section */}
      <div className="deals-heading">
        <h2>Today’s Deals – Hurry!</h2>
      </div>

      <div className="deals-grid">
        {dealsFlowers.map((f) => {
          const discountPercent = f.activeDeal?.percent || 0;
          const discountedPrice = f.price - (f.price * discountPercent) / 100;

          return (
            <div key={f._id} className="deal-card">
              {/* Square with percentage */}
              {discountPercent > 0 && (
                <div className="user-deal-square left">
                  <span className="user-deal-text">{discountPercent}%</span>
                </div>
              )}

              <img src={f.imageURL} alt={f.name} />
              <div className="deal-card-body">
                <h3>{f.name}</h3>
                <p className="deal-price">Rs. {discountedPrice}</p>
                {discountPercent > 0 && (
                  <p className="deal-old-price">Rs. {f.price}</p>
                )}
                <button className="add-cart-btn">Add to Cart</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="deals-footer">
        <h3>Grab Your Favorite Bouquet Before Today’s Deals Wilt Away!</h3>
      </div>
    </div>
  );
}




