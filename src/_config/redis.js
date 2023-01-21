const redis = require("redis");
const KEYS = require("./keys");

const redisClient = redis.createClient({
  host: KEYS.redisHost,
  port: KEYS.redisPort,
  no_ready_check: true,
  auth_pass: KEYS.redisPassword
});

redisClient.on("error", function (error) {
  console.error(error);
});

module.exports = redisClient;
