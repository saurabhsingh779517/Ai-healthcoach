const express =
  require("express");

const { protect } =
  require("../middleware/authMiddleware");

const {
  chatWithCoach,
  getChatHistory
} =
  require("../controllers/chatController");


const router =
  express.Router();


router.post(
  "/",
  protect,
  chatWithCoach
);

router.get(
  "/history",
  protect,
  getChatHistory
);

module.exports = router;