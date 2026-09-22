const express = require("express");
const { protect} = require("../middleware/authMiddleware");
const {saveHealthProfile, getHealthProfile} = require("../controllers/HealthController");

const router = express.Router();
console.log("protect =", typeof protect);
console.log("saveHealthProfile =", typeof saveHealthProfile);

router.post("/profile", protect, saveHealthProfile);
router.get("/profile", protect, getHealthProfile);

module.exports = router;
