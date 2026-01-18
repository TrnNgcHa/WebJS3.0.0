const express = require("express");
const laptopController = require("../controllers/laptopController");

const router = express.Router();

router.get("/", laptopController.list);
router.get("/:id", laptopController.getOne);
router.post("/", laptopController.create);
router.put("/:id", laptopController.update);
router.delete("/:id", laptopController.remove);

module.exports = router;
