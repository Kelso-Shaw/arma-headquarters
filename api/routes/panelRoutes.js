const express = require("express");
const router = express.Router();
const panelController = require("../controllers/panelController");
const { authenticateToken } = require("../middleware/authenticateToken");

router.get("/", authenticateToken, panelController.getSettings);
router.post("/:id", authenticateToken, panelController.setSetting);

module.exports = router;
