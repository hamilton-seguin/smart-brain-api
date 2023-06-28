const JwtHooks = require("../hooks/jwt");
const RedisHooks = require("../hooks/redis");

const handleSignin = (db, bcrypt, req) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject("incorrect form submission");
  }
  return db
    .select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => user[0])
          .catch((err) => Promise.reject("unable to get user", err));
      } else {
        Promise.reject("wrong credentials");
      }
    })
    .catch((err) => Promise.reject("wrong credentials :", err));
};

const signinAuthentification = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  return authorization
    ? RedisHooks.getAuthTokenId(req, res)
        .then((sessionId) => res.json(sessionId))
        .catch((err) => res.status(400).json(err))
    : handleSignin(db, bcrypt, req)
        .then((data) => {
          return data.id && data.email
            ? JwtHooks.createSessions(data)
            : Promise.reject(data);
        })
        .then((session) => res.json(session))
        .catch((err) => res.status(400).json(err));
};

module.exports = { signinAuthentification: signinAuthentification };
