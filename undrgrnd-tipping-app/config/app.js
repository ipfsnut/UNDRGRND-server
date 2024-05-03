// Import required modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Import routes
const tippingRoutes = require('./routes/tipping');
const warpcastRoutes = require('./routes/warpcast');

// Import middleware
const errorMiddleware = require('./middleware/errorHandling');
const authMiddleware = require('./middleware/authentication');

// Import database connection
const connectToDatabase = require('./config/database');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Connect to the database
connectToDatabase();

// Mount routes
app.use('/api/tipping', tippingRoutes);
app.use('/api/warpcast', authMiddleware, warpcastRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
