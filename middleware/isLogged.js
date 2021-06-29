const User = require("../model/User");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization) {
    return res.status(422).json({ error: "access denied" });
  }
  let token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.ACCESS_JWT_SECRET, (error, payload) => {
    if (error) {
      return res.status(422).json({ error: "access denied" });
    }
    User.findById(payload._id)
      .select(["-enc_password", "-salt"])
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((error) => {
        return res.status(422).json({ error: "access denied" });
      });
  });
};
