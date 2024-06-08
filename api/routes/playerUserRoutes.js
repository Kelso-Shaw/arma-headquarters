const express = require("express");
const router = express.Router();
const playerUserController = require("../controllers/playerUserController");
const { authenticateToken } = require("../middleware/authenticateToken");

router.post("/login", playerUserController.login);
router.get("/", authenticateToken, playerUserController.getAllUsers);
router.get("/:id", authenticateToken, playerUserController.getUser);
router.put("/", authenticateToken, playerUserController.addUser);
router.post("/:id", authenticateToken, playerUserController.updateUser);
router.delete("/:id", authenticateToken, playerUserController.deleteUser);

module.exports = router;
