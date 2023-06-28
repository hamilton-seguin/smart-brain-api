const jwt = require("jsonwebtoken");

const RedisHooks = require("./redis");

class JwtHooks {
  signToken(email) {
    const jwtPayload = { email };
    return jwt.sign(jwtPayload, "JWT_SECRET", { expiresIn: "2 days" });
  }
  async createSessions(user) {
    const { email, id } = user;
    const token = this.signToken(email);
    return RedisHooks.setToken(token, id)
      .then(() => {
        return { success: "true", userId: id, token };
      })
  };
}

module.exports = new JwtHooks();