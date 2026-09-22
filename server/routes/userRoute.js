const express = require("express");
const {protect, getProfile} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, getProfile);

module.exports = router;