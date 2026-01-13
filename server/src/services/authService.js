import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import * as userRepo from "../repositories/userRepo.js";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "7d";
const BCRYPT_ROUNDS = 10;

export const register = async (email, userName, password) => {
  // Check if user already exists
  const existingUser = await userRepo.findByEmail(email);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  // Create new user
  const newUser = new User({
    email,
    userName,
    passwordHash,
    balance: 0,
  });

  const userId = await userRepo.create(newUser);

  // Return user data and token
  return {
    user: {
      id: userId,
      email,
      userName,
    },
    token: generateToken(userId),
  };
};

export const login = async (email, password) => {
  // Find user by email
  const user = await userRepo.findByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate token
  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      email: user.email,
      userName: user.userName,
      balance: user.balance,
    },
    token,
  };
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

export const getUserById = async (userId) => {
  const user = await userRepo.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user.id,
    email: user.email,
    userName: user.userName,
    balance: user.balance,
  };
};
