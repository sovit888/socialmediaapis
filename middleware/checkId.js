const mongoose = require("mongoose");
module.exports = (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).json({ error: "invalid user id" });
  }
};
