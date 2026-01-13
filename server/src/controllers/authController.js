import { validationResult } from "express-validator";
import * as authService from "../services/authService.js";

export const register = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({
        error: "Validation failed",
        details: errors.array(),
      });
    }

    const { email, userName, password } = req.body;
    console.log("Register attempt:", { email, userName });

    const result = await authService.register(email, userName, password);

    res.status(201).json({
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.status(200).json({
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await authService.getUserById(userId);

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  // Logout is handled on the frontend by removing the token
  // This endpoint is optional and can be used for logging purposes
  res.status(200).json({
    message: "Logged out successfully",
  });
};
