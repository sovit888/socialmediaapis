const Post = require("../model/Post");
module.exports = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (!post.userId === req.user._id) {
        return res.status(400).json({ error: "cannot be changed" });
      }
      next();
    })
    .catch((error) => {
      return res.status(400).json({ error: "cannot be changed" });
    });
};
