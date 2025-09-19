const express = require("express");
const { register, login, requestResetPassword, resetPassword,verifyEmail } = require("../controllers/auth.controller");

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", requestResetPassword);
router.post("/reset-password", resetPassword);
router.get("/verify-email", verifyEmail);


module.exports = router;
