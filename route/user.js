const express = require("express");
const router = express.Router();

const isLogged = require("../middleware/isLogged");
const checkId = require("../middleware/checkId");

const { followUser, unfollowUser } = require("../controller/user");

router.param("id", checkId);
router.put("/:id/follow", isLogged, followUser);
router.put("/:id/unfollow", isLogged, unfollowUser);

module.exports = router;
