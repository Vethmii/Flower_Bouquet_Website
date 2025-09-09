const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware to parse form data (for feedback submissions)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (HTML, CSS, JS from "public" folder)
app.use(express.static(path.join(__dirname, "public")));

// In-memory storage for feedbacks (temporary, clears when server restarts)
let feedbacks = [];

// API to get all feedbacks
app.get("/api/feedbacks", (req, res) => {
  res.json(feedbacks);
});

// API to add new feedback
app.post("/api/feedbacks", (req, res) => {
  const { name, message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  const newFb = { name: name || "Anonymous", message, date: new Date() };
  feedbacks.unshift(newFb);
  res.json(newFb);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
