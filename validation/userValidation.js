const { check } = require("express-validator");

const commonCheck = [
  check("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Enter a valid email"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password should be at leat 8 characters long")
    .matches(/\d/)
    .withMessage("Password should contain at least 1 digit")
    .matches(/[A-Z]/)
    .withMessage("Password should contain at least 1 upper case")
    .matches(/[!@#$%^&*-_=+]/)
    .withMessage("Password should contain at least 1 special characters"),
];

exports.loginCheck = [...commonCheck];

exports.signupCheck = [
  ...commonCheck,
  check("username")
    .notEmpty()
    .withMessage("Username canoot be Empty")
    .isLength({ min: 5 })
    .withMessage("username should be at least 5 characters"),
];
