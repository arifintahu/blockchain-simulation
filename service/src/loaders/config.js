const dotenv = require('dotenv');

module.exports = () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  const result = dotenv.config({ path: './config/.env' });
  if (result.error) {
    throw new Error('Could not find .env file');
  }
  console.log('Environment successfully loaded');
};
