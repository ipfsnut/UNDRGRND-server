const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const tippingRoutes = require('../routes/tipping');
const warpcastRoutes = require('../routes/warpcast');
const errorMiddleware = require('../middleware/errorHandling');

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Routes
app.use('/api/tipping', tippingRoutes);
app.use('/api/warpcast', warpcastRoutes);

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
