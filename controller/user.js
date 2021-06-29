const User = require("../model/User");

exports.followUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = req.user;
    if (!user.followers.include(req.user._id)) {
      await user.updateOne({ $push: { followers: req.user._id } });
      await currentUser.updateOne({ $push: { followings: req.params._id } });
      return res.json({ message: "followed successfully" });
    }
    return res.status(403).json({ error: "you already follow this user" });
  } catch (error) {
    return res.status(400).json({ error: "server error" });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = req.user;
    if (user.followers.include(req.user._id)) {
      await user.updateOne({ $pull: { followers: req.user._id } });
      await currentUser.updateOne({ $pull: { followings: req.params._id } });
      return res.json({ message: "unfollowed successfully" });
    }
    return res.status(403).json({ error: "you already unfollow this user" });
  } catch (error) {
    return res.status(400).json({ error: "server error" });
  }
};
