const mongoose = require('mongoose');
const User = require('../models/User');

const users = [
  {
    fid: 1234,
    baseAddress: '0x1234567890abcdef',
    balance: 100,
  },
  {
    fid: 5678,
    baseAddress: '0x0987654321fedcba',
    balance: 50,
  },
  // Add more user data as needed
];

const seedUsers = async () => {
  try {
    await User.deleteMany({});
    console.log('Users collection cleared');

    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users seeded`);

    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding users:', err);
    mongoose.connection.close();
  }
};

seedUsers();
