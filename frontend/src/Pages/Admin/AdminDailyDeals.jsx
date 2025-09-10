// AdminDailyDeals.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDailyDeals.css";

const API_BASE = "http://localhost:5000/api/flowers";

export default function AdminDailyDeals() {
  const [flowers, setFlowers] = useState([]);
  const [selected, setSelected] = useState({});
  const [percent, setPercent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchFlowers = async () => {
    try {
      const res = await axios.get(API_BASE);
      setFlowers(res.data.map(f => ({ ...f, dailyDeals: f.dailyDeals || [] })));
    } catch (err) {
      console.error("Fetch flowers error:", err);
      alert("Failed to fetch flowers. See console.");
    }
  };

  useEffect(() => {
    fetchFlowers();
  }, []);

  const toggleSelect = (id) => {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddDeals = async () => {
    if (!percent || isNaN(percent) || percent <= 0) {
      alert("Enter a valid discount percent (e.g. 20).");
      return;
    }

    const selectedIds = Object.keys(selected).filter(id => selected[id]);
    if (selectedIds.length === 0) {
      alert("Select at least one bouquet.");
      return;
    }

    setLoading(true);

    try {
      await Promise.all(selectedIds.map(id =>
        axios.post(`${API_BASE}/${id}/deals`, { percent: Number(percent), corner: "left" })
      ));

      await fetchFlowers();
      setPercent("");
      setSelected({});
      alert("Daily deal added to selected bouquets.");
    } catch (err) {
      console.error("Add deals error:", err.response?.data || err.message);
      alert("Failed to add deals. See console.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDeal = async (flowerId, dealId) => {
    if (!window.confirm("Remove this deal from the bouquet?")) return;
    try {
      await axios.delete(`${API_BASE}/${flowerId}/deals/${dealId}`);
      await fetchFlowers();
    } catch (err) {
      console.error("Delete deal error:", err.response?.data || err.message);
      alert("Failed to remove deal. See console.");
    }
  };

  return (
    <div className="admin-deals-container">
      <h2>Admin — Daily Deals</h2>

      <div className="admin-deal-form">
        <div>
          <label>Discount %</label>
          <input
            type="number"
            min="1"
            max="100"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            placeholder="e.g. 20"
          />
        </div>

        <div>
          <button onClick={handleAddDeals} disabled={loading}>
            {loading ? "Adding..." : "Add Daily Deal to Selected Bouquets"}
          </button>
        </div>
      </div>

      <h3 style={{ marginTop: 20 }}>All Bouquets (select to add deals)</h3>
      <div className="admin-flowers-grid">
        {flowers.map(f => (
          <div key={f._id} className="admin-flower-card">
            <div className="admin-card-top">
              <input
                className="select-checkbox"
                type="checkbox"
                checked={!!selected[f._id]}
                onChange={() => toggleSelect(f._id)}
                title="Select bouquet for deals"
              />
              {f.dailyDeals && f.dailyDeals.map(deal => (
                <div
                  key={deal._id}
                  className="deal-square left"
                  title={`${deal.percent}% off — added ${new Date(deal.createdAt).toLocaleString()}`}
                >
                  <span className="deal-text">{deal.percent}% OFF</span>
                  <span
                    className="deal-remove"
                    onClick={() => handleDeleteDeal(f._id, deal._id)}
                    title="Remove this deal"
                  >
                    ✕
                  </span>
                </div>
              ))}
            </div>

            <img src={f.imageURL} alt={f.name} />
            <div className="card-body">
              <h4>{f.name}</h4>
              <p>Rs. {f.price}</p>
              <p>Stock: {f.stock}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



