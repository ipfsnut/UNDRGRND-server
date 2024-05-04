const app = require('../../app'); // Import your Express app
const mongoose = require('mongoose');
const request = require('supertest');
const Tip = require('../../models/Tip');
const User = require('../../models/User');

describe('Tipping Integration Tests', () => {
  let server;
  let mongoServer;
  let testUser1;
  let testUser2;

  beforeAll(async () => {
    // Set up environment variables
    process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
    process.env.BASE_NETWORK_RPC_URL = 'https://example.com/rpc';
    process.env.WARPCAST_API_URL = 'https://example.com/api';
    process.env.JWT_SECRET = 'your-secret-key';

    // Import and configure required services
    const logger = require('../../utils/logging');
    logger.configure({ level: 'error' });

    // Start an in-memory MongoDB instance for testing
    mongoServer = await mongoose.connect(process.env.MONGODB_URI);

    // Seed the database with test data
    testUser1 = await User.create({ fid: 'user1', baseAddress: '0x1234567890abcdef', balance: 100 });
    testUser2 = await User.create({ fid: 'user2', baseAddress: '0x0987654321fedcba', balance: 50 });

    // Start the server
    server = app.listen(3000);
  });

  it('should create a new tip', async () => {
    const tipData = {
      amount: 10,
      sender: testUser1._id,
      recipient: testUser2._id,
    };

    const response = await request(app)
      .post('/api/tipping')
      .send(tipData)
      .expect(201);

    // Assert the response and database state
    expect(response.body).toHaveProperty('tip');
    const tip = await Tip.findById(response.body.tip._id);
    expect(tip).toBeDefined();
    expect(tip.amount).toBe(10);
    expect(tip.sender.toString()).toBe(testUser1._id.toString());
    expect(tip.recipient.toString()).toBe(testUser2._id.toString());
  });

  it('should retrieve tips for a user', async () => {
    // Create some test tips
    await Tip.create([
      { amount: 5, sender: testUser1._id, recipient: testUser2._id },
      { amount: 10, sender: testUser1._id, recipient: testUser2._id },
      { amount: 15, sender: testUser2._id, recipient: testUser1._id },
    ]);

    const response = await request(app)
      .get(`/api/tipping/user/${testUser1.fid}`)
      .expect(200);

    // Assert the response
    expect(response.body.tips.length).toBe(2);
    expect(response.body.tips[0].amount).toBe(5);
    expect(response.body.tips[1].amount).toBe(10);
  });

  // Add more test cases for updating, deleting, and error handling scenarios

  afterAll(async () => {
    // Remove test data from the database
    await Tip.deleteMany({});
    await User.deleteMany({});

    // Reset environment variables
    delete process.env.MONGODB_URI;
    delete process.env.BASE_NETWORK_RPC_URL;
    delete process.env.WARPCAST_API_URL;
    delete process.env.JWT_SECRET;

    // Stop the server
    await server.close();

    // Disconnect from the test database
    await mongoose.disconnect();
    await mongoServer.stop();
  });
});
