const express = require("express");
const router = express.Router();
const squadsController = require("../controllers/squadsController");
const { authenticateToken } = require("../middleware/authenticateToken");
const { route } = require("./userRoutes");

router.get("/", authenticateToken, squadsController.getSquads);
router.put("/", squadsController.addSquad);
router.delete("/", squadsController.deleteSquad);
router.post("/", squadsController.updateSquad);
module.exports = router;
