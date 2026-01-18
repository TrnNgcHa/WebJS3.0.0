const express = require("express");
const cpuController = require("../controllers/cpuController");

const router = express.Router();

router.get("/", cpuController.list);
router.get("/:id", cpuController.getOne);
router.post("/", cpuController.create);
router.put("/:id", cpuController.update);
router.delete("/:id", cpuController.remove);
module.exports = router;
