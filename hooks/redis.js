const redis = require("redis");

const redisClient = redis.createClient({
  url: process.env.REDIS_URI,
});
async function redisConnect() {
  return await redisClient.connect();
}
redisConnect();

class RedisHooks {
  
   getAuthTokenId(req, res) {
     const { authorization } = req.headers;
    return redisClient.get(authorization);
  };
  
   setToken(key, value) {
    return Promise.resolve(redisClient.set(key, value));
  };
}
module.exports = new RedisHooks();