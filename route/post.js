const express = require("express");
const router = express.Router();

const isLogged = require("../middleware/isLogged");
const checkId = require("../middleware/checkId");
const { getPost, createPost, deletePost } = require("../controller/post");
const ownsPost = require("../middleware/ownsPost");
const upload = require("../utils/upload");

router.param("id", checkId);
router.get("/post", isLogged, getPost);
router.post("/post", isLogged, upload.single("image"), createPost);
router.delete("/post/:id", isLogged, ownsPost, deletePost);

module.exports = router;
