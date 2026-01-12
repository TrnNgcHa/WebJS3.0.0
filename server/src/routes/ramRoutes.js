import express from "express";
import * as ramController from "../controllers/ramController.js";

const router = express.Router();

router.get("/", ramController.list);
router.get("/:id", ramController.getOne);
router.post("/", ramController.create);
router.put("/:id", ramController.update);
router.delete("/:id", ramController.remove);
export default router;
