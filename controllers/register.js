const JwtHooks = require("../hooks/jwt");

const addUserToDB = (req, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return Promise.reject("incorrect form submission");
  }
  const hash = bcrypt.hashSync(password);
  return db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date(),
          })
          .then((user) => user[0])
          .catch((err) => Promise.reject("unable to get user", err));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => Promise.reject("unable to register :", err));
}; 
 
const handleRegister = (db, bcrypt) => (req, res) => {
  return addUserToDB(req, db, bcrypt)
    .then((data) => {
      return data.id && data.email
        ? JwtHooks.createSessions(data)
        : Promise.reject(data);
    })
    .then((session) => res.json(session))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  handleRegister: handleRegister
};
