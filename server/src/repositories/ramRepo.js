import { initializeDatabase } from "../configs/database.js";

export const findAll = async () => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM rams");
  return rows;
};

export const findById = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM rams WHERE id = ?", [id]);
  return rows[0] || null;
};

export const create = async (ramParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO rams (name, brand, price, stock, capacity, gen, speed)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
    ramParams
  );
  return result.insertId;
};

export const updateById = async (id, ramParams) => {
  const pool = await initializeDatabase();
  const params = [...ramParams, id];
  const [result] = await pool.execute(
    `UPDATE rams SET name = ?, brand = ?, price = ?, stock = ?, capacity = ?, gen = ?, speed = ? WHERE id = ?`,
    params
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute("DELETE FROM rams WHERE id = ?", [id]);
  return result.affectedRows;
};
