const express = require("express");
const router = express.Router();
const rankController = require("../controllers/rankController");
const { authenticateToken } = require("../middleware/authenticateToken");

router.get("/", authenticateToken, rankController.getRanks);
router.put("/", authenticateToken, rankController.addRank);
router.post("/:id", authenticateToken, rankController.updateRank);
router.delete("/:id", authenticateToken, rankController.deleteRank);

module.exports = router;
