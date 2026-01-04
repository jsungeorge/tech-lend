const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 1 },
  available: { type: Number, default: 1 } // Tracks real-time availability
});

module.exports = mongoose.model('Asset', assetSchema);