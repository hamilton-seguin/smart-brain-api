const redis = require("redis");

const redisClient = redis.createClient({
  url: process.env.REDIS_URI,
});
async function redisConnect() {
  return await redisClient.connect();
}
redisConnect();

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = await redisClient.get(authorization)
  if (authorization === "null" || !token) {
    console.error("401 Unauthorized, no token provided");
    return res.status(401).json("Unauthorized");
  }
  return next()

}

module.exports = {
  requireAuth: requireAuth
}