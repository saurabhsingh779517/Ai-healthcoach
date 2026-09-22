const express = require("express");

const {protect} = require("../middleware/authMiddleware");

const {
  getTodayHealthScore
} = require("../controllers/healthScoreController");



const router = express.Router();


router.get(
  "/today",
  protect,
  getTodayHealthScore
);


module.exports = router;