const SHA256 = require('crypto-js/sha256');

class Block{
  constructor(timestamp, transactions, previousHash = null, hash = null, nonce = null){
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = hash ? hash : this.calculateHash();
    this.nonce = nonce ? nonce : 0;
  }

  calculateHash(){
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  mineBlock(difficulty){
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log('BLOCK MINED: ' + this.hash);
  }

  hasValidTransaction(){
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false;
      }
    }

    return true;
  }
}

class BlockchainModule{
  constructor(){
    this.chain = [];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
    this.isGenesis = false;
  }

  createGenesisBlock(){
    this.isGenesis = true;
    return new Block(Date.now(), null, null);
  }

  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }

  getChain(){
    if (this.isGenesis) {
      return this.chain;
    } else {
      return this.chain.slice(1);
    }
  }

  minePendingTransactions(miningRewardAddress){
    this.pendingTransactions.map((item) => {
      const block = new Block(item.timestamp, item.transaction, this.chain[this.chain.length - 1].hash);
      block.mineBlock(this.difficulty);
      this.chain.push(block);

      console.log('Block successfully mined!');
      const rewardTransactions = {
        fromAddress: null,
        toAddress: miningRewardAddress,
        amount: this.miningReward
      };

      const rewardBlock = new Block(Date.now(), rewardTransactions, this.chain[this.chain.length - 1].hash);
      rewardBlock.mineBlock(this.difficulty);
      this.chain.push(rewardBlock);
      console.log('You got reward from mining!');
    });
  }

  addTransaction(transaction, lastblock){
    if (!transaction.length) {
      throw new Error('Transaction must include');
    }
    if (lastblock) {
      const {
        timestamp,
        transactions,
        previousHash,
        hash,
        nonce
      } = lastblock;
      this.chain.push(new Block(timestamp, transactions, previousHash, hash, nonce));
    } else {
      this.chain.push(this.createGenesisBlock());
    }
    this.pendingTransactions = transaction;
  }

  getBalanceOfAddress(address){
    let balance = 0;
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
  }

  isChainValid(){
    const result = this.chain.reduce((acc, val, index) => {
      if (index > 0) {
        const currentBlock = val;
        const previousBlock = this.chain[index - 1];
        if (currentBlock.previousHash !== previousBlock.hash) {
          acc.push(false);
        } else {
          acc.push(true);
        }
      }
      return acc;
    }, []);

    if (!result.includes(false) && result.length) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = {
  BlockchainModule,
};
