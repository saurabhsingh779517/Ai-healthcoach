const express = require("express");

const {protect} =
  require("../middleware/authMiddleware");

const {
  getAIHealthAdvice
} =
  require("../controllers/aiController");


const router = express.Router();


router.get(
  "/health-advice",
  protect,
  getAIHealthAdvice
);


module.exports = router;