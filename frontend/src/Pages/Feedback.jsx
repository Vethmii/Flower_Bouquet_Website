import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Feedback.css";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch feedbacks from backend
  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/feedback"); // ✅ endpoint
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();

    // Optional: auto-refresh every 10 seconds
    const interval = setInterval(fetchFeedbacks, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="feedback-page">
      {/* Banner Section */}
      <div className="feedback-banner">
        <div className="banner-text">
          <h1>Your Words Blossom Our Growth ...</h1>
          <p>
            Share your experience and help us bloom better. Read what our happy customers say and leave your feedback to inspire us to create even more beautiful floral moments.
          </p>
        </div>
        <img
          src="https://images.pexels.com/photos/5409706/pexels-photo-5409706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="banner"
          className="banner-image"
        />
      </div>

      {/* Feedback Cards */}
      <div className="feedback-list">
        {feedbacks.length === 0 ? (
          <p className="no-feedback">No customer feedback yet.</p>
        ) : (
          feedbacks.map((fb) => (
            <div key={fb._id} className="feedback-card">
              {fb.screenshotURL && (
                <img
                  src={fb.screenshotURL}
                  alt="Feedback"
                  className="feedback-image"
                />
              )}
              <div className="feedback-details">
                <p><strong>Name:</strong> {fb.customerName}</p>
                <p><strong>Rating:</strong> {fb.rating} ⭐</p>
                <p><strong>Comment:</strong> {fb.comment}</p>
                <p><strong>Date:</strong> {new Date(fb.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

