const { Pendingblock, Blockchain } = require('../models');
const { BlockchainModule } = require('./modules/blockchain');

class NewBlock {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }

  async submit() {
    const result = await Pendingblock.create({
      fromAddress: this.fromAddress,
      toAddress: this.toAddress,
      amount: this.amount,
      timestamp: new Date().getTime(),
      status: 1
    });
    return result;
  }
}

class MiningBlock {
  constructor(size = 0, address = null) {
    this.size = size;
    this.address = address;
  }

  async mineBlock() {
    const lastblock = await this.retrieveLatestBlock();
    const pendingblock = await this.retrivePendingBlock(this.size);
    const bchain = new BlockchainModule();
    bchain.addTransaction(pendingblock, lastblock);
    bchain.minePendingTransactions(this.address);
    await this.saveBlocks(bchain.getChain());
    console.log(bchain.chain);
    return bchain.getChain();
  }

  async retrivePendingBlock(size) {
    const result = await Pendingblock.find({
      status: 1
    }, null, {
      limit: parseInt(size)
    });
    return result.map((item) => {
      return {
        transaction: {
          fromAddress: item.fromAddress,
          toAddress: item.toAddress,
          amount: item.amount
        },
        timestamp: item.timestamp
      }
    });
  }

  async retrieveLatestBlock() {
    const item = await Blockchain.findOne().sort({
      _id: -1
    });
    if (item) {
      return item;
    } else {
      return null;
    }
  }

  async saveBlocks(blocks) {
    await Promise.all(blocks.map(async (block) => {
      await Blockchain.create(block);
      await Pendingblock.updateOne({
        timestamp: block.timestamp
      }, {
        status: 0
      });
    }));
    return true;
  }
}

class Chain {
  constructor() {
    this.chain = [];
  }

  async retriveChain(size) {
    const result = await Blockchain.find({}).sort({
      _id: 1
    }).limit(parseInt(size));
    this.chain = result;
    return this.chain;
  }

  async isChainValid() {
    const bchain = new BlockchainModule();
    bchain.chain = this.chain;
    return new Promise((resolve) => {
      resolve(bchain.isChainValid());
    });
  }
}

module.exports = {
  NewBlock,
  MiningBlock,
  Chain
};
