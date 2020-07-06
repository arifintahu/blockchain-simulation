const mongoose = require('mongoose');

module.exports = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log('MongoDB connected');
      resolve(true);
    }).catch((error) => {
      console.error('MongoDB connection error');
      reject(error);
    });
  });
};
