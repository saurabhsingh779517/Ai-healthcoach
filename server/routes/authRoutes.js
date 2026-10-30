const express = require("express");
const { register, login, verifyEmail, } = require("../controllers/authController");
const {resendVerificationEmail } = require("../controllers/verificationnController");
const router = express.Router();




router.post("/register", register);
router.post("/login", login);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);


module.exports = router;