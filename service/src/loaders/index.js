const expressModule = require('./express');
const configModule = require('./config');
const mongooseModule = require('./mongoose');

module.exports = async (app) => {
  await configModule();
  await mongooseModule();
  await expressModule(app);
};
