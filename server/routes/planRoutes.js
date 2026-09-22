const express =
  require("express");

const { protect } =
  require("../middleware/authMiddleware");

const {
  generatePlan,
    getPlanHistory
} =
  require("../controllers/planController");


const router =
  express.Router();


router.post(
  "/generate",
  protect,
  generatePlan
);
router.get(
  "/history",
  protect,
  getPlanHistory
);

module.exports = router;