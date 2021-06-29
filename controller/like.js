const Post = require("../model/Post");

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post.likes.includes(req.user._id)) {
      const updatePost = await Post.findByIdAndUpdate(
        req.params.postId,
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );
      return res.json({ post: updatePost });
    }
    return res.status(400).json({ error: "already like post" });
  } catch (error) {
    return res.status(400).json({ error: "cannot update like" });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post.likes.includes(req.user._id)) {
      const updatePost = await Post.findByIdAndUpdate(
        req.params.postId,
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );
      return res.json({ post: updatePost });
    }
    return res.status(400).json({ error: "already unlike post" });
  } catch (error) {
    return res.status(400).json({ error: "cannot update like" });
  }
};
