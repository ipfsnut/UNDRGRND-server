// Import required modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const winston = require('winston');

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

// Create a Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Use Morgan for HTTP request logging
app.use(morgan('combined', { stream: logger.stream }));

// Middleware
app.use(express.json());
app.use(cors());

// Connect to the database
connectToDatabase();

// Mount routes
app.use('/api/tipping', tippingRoutes);
app.use('/api/warpcast', authMiddleware, warpcastRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
