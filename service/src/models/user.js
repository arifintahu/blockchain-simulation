const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  address: String,
});

module.exports = mongoose.model('User', userSchema);
