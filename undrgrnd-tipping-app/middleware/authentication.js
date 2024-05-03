const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded payload to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle authentication errors
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = authenticate;
