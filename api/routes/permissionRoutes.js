const express = require("express");
const permissionsController = require("../controllers/permissionsController");

const router = express.Router();

router.get("/", permissionsController.getPermissions);
router.get("/user/:userId", permissionsController.getUserPermissions);
router.post("/:userId/:pageId", permissionsController.setPermission);
router.post("/check", permissionsController.checkPermission);

module.exports = router;
