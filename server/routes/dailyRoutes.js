const express = require("express");

const { protect } =
  require("../middleware/authMiddleware");

const {
  createDailyLog,
  getTodaysLog,
  getLogHistory,
  updateDailyLog,
  deleteDailyLog,
} = require("../controllers/dailyLogController");


const router = express.Router();


// Create

router.post(
  "/",
  protect,
  createDailyLog
);


// Today's log

router.get(
  "/today",
  protect,
  getTodaysLog
);


// History

router.get(
  "/history",
  protect,
  getLogHistory
);


// Update

router.put(
  "/:id",
  protect,
  updateDailyLog
);


// Delete

router.delete(
  "/:id",
  protect,
  deleteDailyLog
);


module.exports = router;