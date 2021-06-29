const express = require("express");
const router = express.Router();

const isLogged = require("../middleware/isLogged");
const checkId = require("../middleware/checkId");

router.param("postId", checkId);
router.param("userId", checkId);
router.put("/:postId/like", isLogged);
router.put("/:postId/unlike", isLogged);

module.exports = router;
