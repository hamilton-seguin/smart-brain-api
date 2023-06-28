const RedisHooks = require("../hooks/redis");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = await RedisHooks.getAuthTokenId(req);
  if (authorization === "null" || !token) {
    console.error("401 Unauthorized, no token provided");
    return res.status(401).json("Unauthorized");
  }
  return next();
};

module.exports = {
  requireAuth: requireAuth,
};
