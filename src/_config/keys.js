const dotenv = require("dotenv");
dotenv.config();

const KEYS = {
  redisHost: process.env.REDISHOST,
  redisPort: process.env.REDISPORT,
  redisPassword: process.env.REDISPASSWORD,
  requestLogger: process.env.REQUEST_LOGGER_SERVICE_URI,
  authUrl: process.env.AUTH_URL,
};

module.exports = KEYS;
