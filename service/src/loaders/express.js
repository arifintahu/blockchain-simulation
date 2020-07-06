const bodyParser = require('body-parser');
const cors = require('cors');
const routers = require('../routers');

module.exports = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/api', routers);
};
