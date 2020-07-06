const { Router } = require('express');
const { NewBlock, MiningBlock, Chain } = require('../../services');

const route = Router();

route.post('/block', async (req, res) => {
  const {
    fromAddress,
    toAddress,
    amount,
  } = req.body;
  const block = new NewBlock(fromAddress, toAddress, amount);
  const result = await block.submit();

  res.send(result);
});

route.post('/mining', async (req, res) => {
  const { size, address } = req.body;
  const mining = new MiningBlock(size, address);
  const result = await mining.mineBlock();

  res.send(result);
});

route.get('/mining', async (req, res) => {
  const mining = new MiningBlock();
  const result = await mining.retrivePendingBlock(99);

  res.send(result);
});

route.get('/chain', async (req, res) => {
  const size = req.query.size ? req.query.size : 0;
  const blockchain = new Chain();
  const chain = await blockchain.retriveChain(size);
  const valid = await blockchain.isChainValid();

  res.send({ 
    chain, 
    valid,
    length: chain.length
  });
});

module.exports = route;
