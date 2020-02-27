const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL
};