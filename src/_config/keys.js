const dotenv = require("dotenv");
dotenv.config();

const KEYS = {
  redisHost: process.env.REDISHOST,
  redisPort: process.env.REDISPORT,
  redisPassword: process.env.REDISPASSWORD,
  requestLogger: process.env.REQUEST_LOGGER_SERVICE_URI,
  authUrl: process.env.AUTH_URL,
  NOTIFICATION_SERVICE_URI: process.env.NOTIFICATION_SERVICE_URI,
  ADMIN_DASHBOARD_URL: process.env.ADMIN_DASHBOARD_URL,
  ADMIN_LOGIN_URL: process.env.ADMIN_LOGIN_URL,
  AUTH_URI : process.env.AUTH_URI
};

module.exports = KEYS;
