const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables
const connectDB = require('./config/db'); // MongoDB connection

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const flowerRoutes = require('./routes/flowerRoutes');
const customOrderRoutes = require('./routes/CustomOrderRoutes');
const feedbackRoutes = require('./routes/FeedbackRoutes');

app.use('/api/flowers', flowerRoutes);
app.use('/api/custom-orders', customOrderRoutes);
app.use('/api/feedback', feedbackRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// Connect to MongoDB
connectDB(); // uses process.env.MONGO_URI in db.js

// Set server port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
