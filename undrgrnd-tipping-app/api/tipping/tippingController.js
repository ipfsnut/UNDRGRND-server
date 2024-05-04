const User = require('../../models/User');
const tippingService = require('../services/tippingService');
const metamaskService = require('../services/metamaskService');
const baseNetworkService = require('../services/baseNetworkService');
const userService = require('../services/userService'); // New service for user-related operations

// Send a tip
exports.sendTip = async (req, res, next) => {
  try {
    const { senderFid, recipientFid, amount } = req.body;

    // Validate input data
    // ...

    // Get sender and recipient user objects
    const sender = await User.findOne({ fid: senderFid });
    const recipient = await User.findOne({ fid: recipientFid });

    // Check sender's balance
    const senderBalance = await userService.getUserBalance(sender._id);
    if (senderBalance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Connect to Metamask and sign the transaction
    const signedTransaction = await metamaskService.signTransaction(sender.baseAddress, recipient.baseAddress, amount);

    // Send the transaction to the Base network
    const transactionHash = await baseNetworkService.sendTransaction(signedTransaction);

    // Update user balances
    await userService.updateUserBalance(sender._id, -amount);
    await userService.updateUserBalance(recipient._id, amount);

    // Create a new Tip document
    const tipData = { amount, sender: sender._id, recipient: recipient._id };
    const newTip = await tippingService.createTip(tipData);

    res.status(200).json({ message: 'Tip sent successfully', transactionHash, tip: newTip });
  } catch (err) {
    next(err);
  }
};

// Get user balance
exports.getUserBalance = async (req, res, next) => {
  try {
    const { fid } = req.params;

    // Find the user by Farcaster ID
    const user = await User.findOne({ fid });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const balance = await userService.getUserBalance(user._id);
    res.status(200).json({ balance });
  } catch (err) {
    next(err);
  }
};

// Get tipping history
exports.getTippingHistory = async (req, res, next) => {
  try {
    const { fid } = req.params;

    // Find the user by Farcaster ID
    const user = await User.findOne({ fid });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find tips sent or received by the user
    const tips = await tippingService.getTipsByUser(user._id);

    res.status(200).json({ tips });
  } catch (err) {
    next(err);
  }
};

const getTotalTips = async (req, res, next) => {
  try {
    const tips = await Tip.find().exec();
    const totalTips = calculateTotalTips(tips);
    res.json({ totalTips });
  } catch (err) {
    next(err);
  }
};
