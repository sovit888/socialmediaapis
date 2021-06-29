const mongoose = require("mongoose");
const crypto = require("crypto");
const uuid = require("uuid").v4;
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },

  username: {
    type: String,
    trim: true,
    required: true,
  },
  enc_password: {
    type: String,
    trim: true,
    required: true,
  },
  salt: {
    type: String,
    trim: true,
    required: true,
  },
  followers: { type: Array, default: [] },
  followings: { type: Array, default: [] },
});

userSchema.virtual("password").set(function (password) {
  this.salt = uuid();
  this.enc_password = this.securePassword(password);
});

userSchema.method({
  securePassword: function (password) {
    return crypto
      .createHmac("sha256", this.salt)
      .update(password)
      .digest("hex");
  },
  isAuthenticate: function (password) {
    return this.enc_password === this.securePassword(password);
  },
});

module.exports = mongoose.model("user", userSchema);
