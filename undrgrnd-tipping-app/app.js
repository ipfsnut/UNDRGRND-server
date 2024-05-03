// Import required modules and dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import route files
const tippingRoutes = require('./server/routes/tipping');
const warpcastRoutes = require('./server/routes/warpcast');

// Import middleware functions
const errorMiddleware = require('./middleware/errorHandling');
const authMiddleware = require('./middleware/authentication');

// Load environment variables from .env file
dotenv.config();

// Create an Express app instance
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests

// Mount routes
app.use('/api/tipping', tippingRoutes);
app.use('/api/warpcast', authMiddleware, warpcastRoutes); // Apply authentication middleware to Warpcast routes

// Connect to the database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Error handling middleware
app.use(errorMiddleware);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
