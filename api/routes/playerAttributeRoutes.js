const express = require("express");
const router = express.Router();
const playerAttributes = require("../controllers/playerAttributeController");
const { authenticateToken } = require("../middleware/authenticateToken");

router.get("/", authenticateToken, playerAttributes.getAttributes);
router.put("/", authenticateToken, playerAttributes.addAttribute);
router.post("/:id", authenticateToken, playerAttributes.updateAttribute);
router.delete("/:id", authenticateToken, playerAttributes.deleteAttribute);

module.exports = router;
