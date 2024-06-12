const express = require("express");
const pagesController = require("../controllers/pagesController");

const router = express.Router();

router.get("/", pagesController.getPages);
router.put("/", pagesController.addPage);
router.post("/:id", pagesController.updatePage);
router.delete("/:id", pagesController.deletePage);

module.exports = router;
