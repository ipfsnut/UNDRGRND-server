const User = require('../models/User');

/**
 * Get the balance of a user.
 *
 * @param {string} userId - The user's ID.
 * @returns {Promise<number>} The user's balance.
 */
const getUserBalance = async (userId) => {
  const user = await User.findById(userId);
  return user.balance;
};

/**
 * Update the balance of a user.
 *
 * @param {string} userId - The user's ID.
 * @param {number} amount - The amount to add or subtract from the balance.
 * @returns {Promise<void>}
 */
const updateUserBalance = async (userId, amount) => {
  const user = await User.findById(userId);
  user.balance += amount;
  await user.save();
};

module.exports = {
  getUserBalance,
  updateUserBalance,
};
