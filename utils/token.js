const jwt = require("jsonwebtoken");
exports.generateAccessToken = (id) => {
  return jwt.sign({ _id: id }, process.env.ACCESS_JWT_SECRET);
};

exports.generateRefreshToken = (id) => {
  return jwt.sign({ _id: id }, process.env.REFRESH_JWT_SECRET);
};
