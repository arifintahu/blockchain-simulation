const mongoose = require('mongoose');

const pendingblockSchema = new mongoose.Schema({
  fromAddress: String,
  toAddress: String,
  amount: Number,
  timestamp: String,
  status: Number
});

module.exports = mongoose.model('Pendingblock', pendingblockSchema);
