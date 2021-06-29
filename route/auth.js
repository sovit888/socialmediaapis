const express = require("express");
const router = express.Router();

const { loginCheck, signupCheck } = require("../validation/userValidation");
const bodyValidation = require("../middleware/bodyValidation");

const { loginUser, signupUser, getToken } = require("../controller/auth");

router.post("/auth/login", loginCheck, bodyValidation, loginUser);
router.post("/auth/signup", signupCheck, bodyValidation, signupUser);
router.post("/token", getToken);

module.exports = router;
