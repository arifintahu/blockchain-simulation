const { Router } = require('express');

const route = Router();

route.get('/', (req, res) => {
  res.status(200).end();
});
route.post('/login', (req, res) => {
  res.status(200).end();
});

module.exports = route;
