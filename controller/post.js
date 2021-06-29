const Post = require("../model/Post");

exports.getPost = (req, res) => {
  Post.find({
    $or: [{ userId: req.user._id }, { userId: { $in: req.user.followers } }],
  })
    .then((posts) => {
      return res.json({ posts });
    })
    .catch((error) => {
      return res.status(400).json({ error: "cannot get posts" });
    });
};

exports.createPost = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "cannot create post" });
  }
  const newPost = new Post({ ...req.body, img: req.file.filename });
  newPost
    .save()
    .then((post) => {
      return res.json({ post });
    })
    .catch((error) => {
      return res.status(400).json({ error: "cannot create post" });
    });
};

exports.deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((post) => {
      return res.json({ post });
    })
    .catch((error) => {
      return res.status(400).json({ error: "cannot delete post" });
    });
};
