const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process with a non-zero code
  }
};

module.exports = connectToDatabase;
