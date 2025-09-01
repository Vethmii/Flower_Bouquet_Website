import React, { useEffect, useState } from "react";
import axios from "axios";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/feedbacks");
        setFeedbacks(res.data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div>
      <h1>Happy Customers</h1>
      {feedbacks.length === 0 ? (
        <p>No feedback available yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
          {feedbacks.map(f => (
            <div key={f._id} style={{ border: "1px solid #ccc", padding: "10px" }}>
              <h3>{f.name}</h3>
              <p>{f.comment}</p>
              {f.rating && <p>Rating: {f.rating} ⭐</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feedback;
