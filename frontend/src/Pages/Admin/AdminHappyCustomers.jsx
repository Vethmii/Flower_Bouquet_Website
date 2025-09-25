import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminHappyCustomers.css";

export default function AdminHappyCustomers() {
  const [customerName, setCustomerName] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  const API_URL = "http://localhost:5000/api/feedback";

  // Fetch feedbacks
  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(API_URL);
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Handle image
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Handle add feedback (base64 JSON)
  const handleAddFeedback = async (e) => {
    e.preventDefault();

    if (!customerName || !rating || !comment || !date || !imageFile) {
      alert("⚠️ Please fill all fields and upload a screenshot!");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(imageFile); // convert file → base64 string

    reader.onloadend = async () => {
      try {
        const newFeedback = {
          customerName,
          rating,
          comment,
          date,
          screenshotURL: reader.result, // send base64 as JSON
        };

        const res = await axios.post(API_URL, newFeedback, {
          headers: { "Content-Type": "application/json" },
        });

        setFeedbacks([res.data, ...feedbacks]);

        alert("✅ Feedback added successfully!");

        // Reset form
        setCustomerName("");
        setRating("");
        setComment("");
        setDate("");
        setImageFile(null);
        e.target.reset();
      } catch (err) {
        console.error("Error adding feedback:", err);
        alert("❌ Failed to add feedback");
      }
    };
  };

  // Handle delete feedback
  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setFeedbacks(feedbacks.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Error deleting feedback:", err);
      alert("❌ Failed to delete feedback");
    }
  };

  return (
    <div className="admin-feedbacks">
      <h2 className="page-title">Add Customer Feedback</h2>

      <form className="feedback-form" onSubmit={handleAddFeedback}>
        <label>Customer Name</label>
        <input
          type="text"
          placeholder="Enter customer name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <label>Rating (1 - 5)</label>
        <input
          type="number"
          min="1"
          max="5"
          placeholder="Enter rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <label>Comment</label>
        <textarea
          rows="3"
          placeholder="Enter customer comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Upload Screenshot (JPG/PNG)</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit" className="add-btn">
          Add Feedback
        </button>
      </form>

      <h3 className="preview-title">Preview Of Uploaded Feedbacks</h3>

      <div className="feedback-list">
        {feedbacks.map((f) => (
          <div key={f._id} className="feedback-card">
            {f.screenshotURL && (
              <img src={f.screenshotURL} alt="Feedback" />
            )}
            <div className="feedback-details">
              <p><strong>Name:</strong> {f.customerName}</p>
              <p><strong>Rating:</strong> {f.rating} ⭐</p>
              <p><strong>Comment:</strong> {f.comment}</p>
              <p><strong>Date:</strong> {new Date(f.date).toLocaleDateString()}</p>
            </div>
            <button className="remove-btn" onClick={() => handleRemove(f._id)}>
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

