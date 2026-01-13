import express from "express";
import { body } from "express-validator";
import * as authController from "../controllers/authController.js";
import { verifyAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register route with validation
router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid email address"),
    body("userName")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  authController.register
);

// Login route with validation
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  authController.login
);

// Get profile route (protected)
router.get("/profile", verifyAuth, authController.getProfile);

// Logout route
router.post("/logout", verifyAuth, authController.logout);

export default router;
