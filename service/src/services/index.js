const blockchainService = require('./blockchain-service');
const userService = require('./user-service');

module.exports = {
  ...userService,
  ...blockchainService
};
