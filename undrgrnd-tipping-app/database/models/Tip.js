const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the sender's User document
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the recipient's User document
  amount: { type: Number, required: true }, // Amount of $GRND tipped
  timestamp: { type: Date, default: Date.now }, // Timestamp of the tip
});

const Tip = mongoose.model('Tip', tipSchema);

module.exports = Tip;
