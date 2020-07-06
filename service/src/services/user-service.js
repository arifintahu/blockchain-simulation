const bcrypt = require('bcrypt');
const SHA256 = require('crypto-js/sha256');
const { User } = require('../models');

class UserRegister {
  constructor(name, username, password) {
    this.name = name;
    this.username = username;
    this.password = password;
  }

  async register() {
    const isUsernameExist = await this.checkUsername(this.username);
    let result = null;
    if (isUsernameExist) {
      result = {
        status: false,
        message: 'Username exists'
      };
    } else {
      result = await User.create({
        name: this.name,
        username: this.username,
        password: await this.hashPassword(this.password),
        address: this.generateAddress()
      });
    }

    return result;
  }

  hashPassword(password, saltRounds = 5) {
    return bcrypt.hash(password, saltRounds);
  }

  generateAddress() {
    return SHA256(this.name + this.username + this.password).toString().substring(0, 16);
  }

  async checkUsername(username) {
    const result = await User.findOne({
      username: username
    });
    if (result) {
      return true;
    } else {
      return false;
    }
  }
}

class UserLogin {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  async login() {
    const account = await User.findOne({
      username: this.username
    });
    if (account) {
      if (await this.comparePassword(this.password, account.password)) {
        return account;
      } else {
        return {
          status: false,
          message: 'Invalid password'
        };
      }
    } else {
      return {
        status: false,
        message: 'Invalid account'
      };
    }
  }

  comparePassword(password, hashPassword) {
    return bcrypt.compare(password, hashPassword);
  }
}

module.exports = {
  UserRegister,
  UserLogin
};
