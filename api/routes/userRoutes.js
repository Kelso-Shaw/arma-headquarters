const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authenticateToken");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", authenticateToken, userController.getAllUsers);
router.put("/", authenticateToken, userController.addUser);
router.post("/:id", authenticateToken, userController.updateUser);
router.delete("/:id", authenticateToken, userController.deleteUser);

module.exports = router;
