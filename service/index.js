const express = require('express');
const loaders = require('./src/loaders');

async function startServer() {
  const app = express();

  await loaders(app);
  app.listen(process.env.PORT, (error) => {
    if (error) {
      process.exit(1);
    }
    console.log('Server is listening on port: ', process.env.PORT);
  });
}

startServer();
