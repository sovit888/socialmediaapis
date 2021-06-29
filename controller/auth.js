const User = require("../model/User");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "cannot find user" });
    }
    if (!user.isAuthenticate(password)) {
      return res.status(400).json({ error: "credentials do not match" });
    }
    let accessToken = generateAccessToken(user._id);
    let refreshToken = generateRefreshToken(user._id);
    return res.json({ accessToken, refreshToken });
  } catch (error) {
    return res.status(400).json({ error: "cannot find user" });
  }
};

exports.signupUser = (req, res) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((user) => {
      return res.json({ message: "created user successfully" });
    })
    .catch((error) => {
      return res.status(400).json({ error: "error creating a user" });
    });
};
exports.getToken = (req, res) => {
  const { token } = req.body;
  jwt.verify(token, process.env.REFRESH_JWT_SECRET, (error, payload) => {
    if (error) {
      return res.status(422).json({ error: "cannt get users" });
    }
    let accessToken = generateAccessToken(payload._id);
    return res.json({ accessToken });
  });
};
