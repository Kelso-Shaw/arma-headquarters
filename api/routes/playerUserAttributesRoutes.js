const express = require("express");
const router = express.Router();
const playerUserAttributes = require("../controllers/playerUserAttributesController");
const { authenticateToken } = require("../middleware/authenticateToken");

router.get("/", authenticateToken, playerUserAttributes.getAllAssociations);
router.put("/", authenticateToken, playerUserAttributes.addAssociation);
router.post("/:id", authenticateToken, playerUserAttributes.updateAssociation);
router.delete(
	"/:id",
	authenticateToken,
	playerUserAttributes.deleteAssociation,
);

module.exports = router;
