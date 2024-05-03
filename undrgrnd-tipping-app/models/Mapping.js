const mongoose = require('mongoose');

const mappingSchema = new mongoose.Schema({
  fid: { type: Number, required: true, unique: true }, // Farcaster ID
  baseAddress: { type: String, required: true, unique: true }, // Base network address
});

const Mapping = mongoose.model('Mapping', mappingSchema);

module.exports = Mapping;
