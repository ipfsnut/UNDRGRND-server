const Tip = require('../models/Tip');

/**
 * Create a new tip.
 *
 * @param {Object} tipData - The tip data object.
 * @param {number} tipData.amount - The amount of the tip.
 * @param {string} tipData.sender - The sender's address.
 * @param {string} tipData.recipient - The recipient's address.
 * @returns {Promise<Tip>} The created tip object.
 */
const createTip = async (tipData) => {
  const { amount, sender, recipient } = tipData;
  const newTip = new Tip({ amount, sender, recipient });
  return newTip.save();
};

/**
 * Get all tips for a given user.
 *
 * @param {string} userAddress - The user's address.
 * @returns {Promise<Tip[]>} An array of tip objects.
 */
const getTipsByUser = async (userAddress) => {
  const tips = await Tip.find({
    $or: [{ sender: userAddress }, { recipient: userAddress }],
  });
  return tips;
};

// Add more functions for updating, deleting, and other tipping operations

module.exports = {
  createTip,
  getTipsByUser,
};
