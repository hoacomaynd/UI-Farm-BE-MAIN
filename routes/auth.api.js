const express = require("express");
const router = express.Router();
const validators = require("../middlewares/validators");
const { body } = require("express-validator");
const authController = require("../controllers/auth.controller");

/**
 * @route POST /auth/login
 * @description Log in with username and password
 * @access Public
 */
router.post(
  "/login",
  validators.validate([
    body("email", "Invalid email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  authController.loginWithEmail
);

/**
 * @route POST /auth/login/facebook
 * @description Login with facebook
 * @access Public
 */

/**
 * @route POST /auth/login/google
 * @description Login with google
 * @access Public
 */
router.post(
  "/login/google",
  authController.loginWithGoogle
);
module.exports = router;