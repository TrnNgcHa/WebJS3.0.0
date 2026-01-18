const express = require("express");
const ramController = require("../controllers/ramController");

const router = express.Router();

router.get("/", ramController.list);
router.get("/:id", ramController.getOne);
router.post("/", ramController.create);
router.put("/:id", ramController.update);
router.delete("/:id", ramController.remove);
module.exports = router;
