const express = require("express");
const storageController = require("../controllers/storageController");

const router = express.Router();

router.get("/", storageController.list);
router.get("/:id", storageController.getOne);
router.post("/", storageController.create);
router.put("/:id", storageController.update);
router.delete("/:id", storageController.remove);
module.exports = router;
