// Import the function or module you want to test
const calculateTotalTips = require('../utils/calculateTotalTips');

// Use the describe function to group related tests together
describe('calculateTotalTips', () => {
  // Use the it function to define an individual test case
  it('should calculate the total tips correctly', () => {
    // Arrange: Set up the test data or mocks
    const tips = [
      { amount: 10 },
      { amount: 20 },
      { amount: 5 },
    ];

    // Act: Call the function or module you're testing
    const totalTips = calculateTotalTips(tips);

    // Assert: Check if the result matches the expected output
    expect(totalTips).toBe(35);
  });

  // You can define multiple test cases within the same describe block
  it('should return 0 if the input array is empty', () => {
    const tips = [];
    const totalTips = calculateTotalTips(tips);
    expect(totalTips).toBe(0);
  });

  // You can also group related test cases using nested describe blocks
  describe('when input contains invalid data', () => {
    it('should ignore non-numeric values', () => {
      const tips = [
        { amount: 10 },
        { amount: 'invalid' },
        { amount: 15 },
      ];
      const totalTips = calculateTotalTips(tips);
      expect(totalTips).toBe(25);
    });
  });
});
