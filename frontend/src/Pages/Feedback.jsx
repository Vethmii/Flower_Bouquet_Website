import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Feedback.css";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch feedbacks from backend
  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/feedback"); // ✅ fixed endpoint
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();

    // Optional: auto-refresh every 10 seconds to sync admin deletions
    const interval = setInterval(fetchFeedbacks, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="feedback-page"> {/* ✅ fixed class name */}
      <h2 className="page-title">Happy Customers</h2>

      {feedbacks.length === 0 ? (
        <p className="no-feedback">No feedback available at the moment.</p>
      ) : (
        <div className="feedback-list">
          {feedbacks.map((f) => (
            <div key={f._id} className="feedback-card">
              {f.screenshotURL && (
                <img
                  src={f.screenshotURL}
                  alt="Feedback"
                  className="feedback-image"
                />
              )}
              <div className="feedback-details">
                <p><strong>Name:</strong> {f.customerName}</p>
                <p><strong>Rating:</strong> {f.rating} ⭐</p>
                <p><strong>Comment:</strong> {f.comment}</p>
                <p><strong>Date:</strong> {new Date(f.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


