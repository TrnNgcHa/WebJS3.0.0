import { initializeDatabase } from "../config/database.js";
import User from "../models/userModel.js";

export const findByEmail = async (email) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM UserTable WHERE Email = ?", [
    email,
  ]);
  return rows.length > 0 ? User.fromDb(rows[0]) : null;
};

export const findById = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM UserTable WHERE Id = ?", [
    id,
  ]);
  return rows.length > 0 ? User.fromDb(rows[0]) : null;
};

export const create = async (user) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    "INSERT INTO UserTable (Email, PasswordHash, UserName, Balance) VALUES (?, ?, ?, ?)",
    user.toInsertParams()
  );
  return result.insertId;
};

export const update = async (user) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    "UPDATE UserTable SET Email = ?, PasswordHash = ?, UserName = ?, Balance = ? WHERE Id = ?",
    user.toUpdateParams()
  );
  return result.affectedRows > 0;
};

export const delete_ = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute("DELETE FROM UserTable WHERE Id = ?", [
    id,
  ]);
  return result.affectedRows > 0;
};

export const findAll = async () => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM UserTable");
  return rows.map((row) => User.fromDb(row));
};
