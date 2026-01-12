import express from "express";
import * as storageController from "../controllers/storageController.js";

const router = express.Router();

router.get("/", storageController.list);
router.get("/:id", storageController.getOne);
router.post("/", storageController.create);
router.put("/:id", storageController.update);
router.delete("/:id", storageController.remove);
export default router;
