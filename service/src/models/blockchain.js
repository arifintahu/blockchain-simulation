const mongoose = require('mongoose');

const blockchainSchema = new mongoose.Schema({
  hash: String,
  previousHash: String,
  nonce: Number,
  timestamp: String,
  transactions: {
    fromAddress: String,
    toAddress: String,
    amount: Number
  },
});

module.exports = mongoose.model('Blockchain', blockchainSchema);
