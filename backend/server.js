const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');



const app = express();
app.use(cors());
app.use(express.json());
const flowerRoutes = require('./routes/flowerRoutes');
app.use('/api/flowers', flowerRoutes);
const customOrderRoutes = require('./routes/CustomOrderRoutes');
app.use('/api/custom-orders', customOrderRoutes);
const FeedbackRoutes = require('./routes/FeedbackRoutes');
app.use('/api/feedback', FeedbackRoutes);



// Connect to MongoDB
connectDB();


// health check route
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
