const { Router } = require('express');
const { UserRegister, UserLogin } = require('../../services');

const route = Router();

route.post('/register', async (req, res) => {
  const { name, username, password } = req.body;
  const registerUser = new UserRegister(name, username, password);
  const result = await registerUser.register();

  res.send(result);
});

route.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const loginUser = new UserLogin(username, password);
  const result = await loginUser.login();

  res.send(result);
});

module.exports = route;
