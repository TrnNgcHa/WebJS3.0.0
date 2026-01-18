const express = require("express");
const gpuController = require("../controllers/gpuController");

const router = express.Router();

router.get("/", gpuController.list);
router.get("/:id", gpuController.getOne);
router.post("/", gpuController.create);
router.put("/:id", gpuController.update);
router.delete("/:id", gpuController.remove);
module.exports = router;
