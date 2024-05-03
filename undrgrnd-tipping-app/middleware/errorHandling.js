// errorHandling.js

/**
 * Error handling middleware function.
 *
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
    // Log the error
    console.error(err.stack);
  
    // Set the error status code
    const statusCode = err.statusCode || 500;
  
    // Send the error response
    res.status(statusCode).json({
      error: {
        message: err.message || 'Internal Server Error',
      },
    });
  };
  
  module.exports = errorHandler;
  