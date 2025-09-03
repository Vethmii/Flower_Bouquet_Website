const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const adminRoutes = require('./routes/AdminRoutes');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images from the "uploads" folder
app.use('/uploads', express.static('uploads'));

// Routes
const flowerRoutes = require('./routes/flowerRoutes');
const customOrderRoutes = require('./routes/CustomOrderRoutes');
const feedbackRoutes = require('./routes/FeedbackRoutes');

app.use('/api/flowers', flowerRoutes);
app.use('/api/custom-orders', customOrderRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// Connect to MongoDB with error handling
connectDB()
  .then(() => {
    // Start server only after DB connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
