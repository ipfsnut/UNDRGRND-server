const User = require('../models/User');
const Tip = require('../models/Tip');
const metamaskService = require('../services/metamaskService');
const baseNetworkService = require('../services/baseNetworkService');

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
    if (sender.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Connect to Metamask and sign the transaction
    const signedTransaction = await metamaskService.signTransaction(sender.baseAddress, recipient.baseAddress, amount);

    // Send the transaction to the Base network
    const transactionHash = await baseNetworkService.sendTransaction(signedTransaction);

    // Update user balances
    sender.balance -= amount;
    recipient.balance += amount;
    await sender.save();
    await recipient.save();

    // Create a new Tip document
    const tip = new Tip({ sender: sender._id, recipient: recipient._id, amount });
    await tip.save();

    res.status(200).json({ message: 'Tip sent successfully', transactionHash });
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

    res.status(200).json({ balance: user.balance });
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
    const sentTips = await Tip.find({ sender: user._id });
    const receivedTips = await Tip.find({ recipient: user._id });

    res.status(200).json({ sentTips, receivedTips });
  } catch (err) {
    next(err);
  }
};
