const { Router } = require('express');
const { main, user, block } = require('./routes');

const app = Router();
app.use('/', main);
app.use('/user', user);
app.use('/block', block);

module.exports = app;
