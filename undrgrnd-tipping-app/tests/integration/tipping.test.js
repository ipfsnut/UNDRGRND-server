const app = require('../../app'); // Import your Express app
const mongoose = require('mongoose');
const request = require('supertest');

describe('Tipping Integration Tests', () => {
  let server;
  let mongoServer;

  beforeAll(async () => {
    // Start an in-memory MongoDB instance for testing
    mongoServer = await mongoose.connect('mongodb://localhost:27017/test');

    // Start the server
    server = app.listen(3000);
  });

  it('should create a new tip', async () => {
    const tipData = {
      amount: 10,
      sender: '0x1234567890abcdef',
      recipient: '0x0987654321fedcba',
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
    expect(tip.sender).toBe('0x1234567890abcdef');
    expect(tip.recipient).toBe('0x0987654321fedcba');
  });
  

  afterAll(async () => {
    // Stop the server
    await server.close();

    // Disconnect from the test database
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  // Test cases go here
});
