/**
 * Calculates the total sum of tip amounts from an array of tip objects.
 *
 * @param {Array} tips - An array of tip objects, each containing an 'amount' property.
 * @returns {number} The total sum of tip amounts.
 */
const calculateTotalTips = (tips) => {
    // Initialize the total to 0
    let total = 0;
  
    // Iterate over the tips array
    for (const tip of tips) {
      // Check if the 'amount' property is a valid number
      const amount = parseFloat(tip.amount);
      if (!isNaN(amount)) {
        // Add the amount to the total
        total += amount;
      }
    }
  
    // Return the total sum of tip amounts
    return total;
  };
  
  module.exports = calculateTotalTips;
  