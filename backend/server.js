const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// Import routes
const flowerRoutes = require("./routes/flowerRoutes");
const customOrderRoutes = require("./routes/CustomOrderRoutes");
const feedbackRoutes = require("./routes/FeedbackRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/flowers", flowerRoutes);
app.use("/api/custom-orders", customOrderRoutes);
app.use("/api/admin/custom-orders", customOrderRoutes); // ✅ aligned
app.use("/api/feedback", feedbackRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// Start server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  });



