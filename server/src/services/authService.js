const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../models/accountModel");
const accountRepo = require("../repositories/accountRepo");

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "7d";
const BCRYPT_ROUNDS = 10;

const register = async (email, userName, password) => {
  // Check if account already exists
  const existingAccount = await accountRepo.findByEmail(email);
  if (existingAccount) {
    throw new Error("Account with this email already exists");
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  // Create new account
  const newAccount = new Account({
    email,
    userName,
    passwordHash,
    balance: 0,
    isActive: true,
    role: "user",
  });

  const accountId = await accountRepo.create(newAccount);

  // Return account data and token
  return {
    account: {
      id: accountId,
      email,
      userName,
      role: "user",
    },
    token: generateToken(accountId),
  };
};

const login = async (email, password) => {
  // Find account by email
  const account = await accountRepo.findByEmail(email);
  if (!account) {
    throw new Error("Invalid email or password");
  }

  // Check if account is active
  if (!account.isActive) {
    throw new Error("Account is inactive");
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, account.passwordHash);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate token
  const token = generateToken(account.id);

  return {
    account: {
      id: account.id,
      email: account.email,
      userName: account.userName,
      balance: account.balance,
      role: account.role,
    },
    token,
  };
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

const getUserById = async (userId) => {
  const account = await accountRepo.findById(userId);
  if (!account) {
    throw new Error("Account not found");
  }

  return {
    id: account.id,
    email: account.email,
    userName: account.userName,
    balance: account.balance,
    role: account.role,
    isActive: account.isActive,
  };
};

module.exports = { register, login, verifyToken, generateToken, getUserById };
