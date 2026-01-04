const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  user: { type: String, default: "Guest User" }, 
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Asset' }], 
  status: { type: String, default: "Active" }, 
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Loan', loanSchema);