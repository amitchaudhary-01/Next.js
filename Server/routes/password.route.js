const express = require("express");

const {
  forgotPassword,
  resetPassword,
} = require("../controllers/passwordController");

const validateForgotPassword = require("../middleware/forgotPasswordMiddleware");
const validatePassword = require("../middleware/passwordMiddleware");

const router = express.Router();

// POST /user/forgot-password
router.post(
  "/forgot-password",
  validateForgotPassword,
  forgotPassword
);

// POST /user/reset-password
router.post(
  "/reset-password",
  validatePassword,
  resetPassword
);

module.exports = router;