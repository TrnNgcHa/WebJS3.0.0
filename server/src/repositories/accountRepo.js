const { initializeDatabase } = require("../config/database");
const Account = require("../models/accountModel");

const findByEmail = async (email) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM UserTable WHERE Email = ?", [
    email,
  ]);
  return rows.length > 0 ? Account.fromDb(rows[0]) : null;
};

const findById = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM UserTable WHERE Id = ?", [
    id,
  ]);
  return rows.length > 0 ? Account.fromDb(rows[0]) : null;
};

const create = async (account) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    "INSERT INTO UserTable (Email, PasswordHash, UserName, Balance, IsActive, Role) VALUES (?, ?, ?, ?, ?, ?)",
    account.toInsertParams(),
  );
  return result.insertId;
};

const update = async (account) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    "UPDATE UserTable SET Email = ?, PasswordHash = ?, UserName = ?, Balance = ?, IsActive = ?, Role = ? WHERE Id = ?",
    account.toUpdateParams(),
  );
  return result.affectedRows > 0;
};

const delete_ = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute("DELETE FROM UserTable WHERE Id = ?", [
    id,
  ]);
  return result.affectedRows > 0;
};

const findAll = async () => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM UserTable");
  return rows.map((row) => Account.fromDb(row));
};

module.exports = { findByEmail, findById, create, update, delete_, findAll };
