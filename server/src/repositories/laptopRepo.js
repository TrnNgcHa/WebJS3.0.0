import { initializeDatabase } from "../configs/database.js";

export const findAll = async () => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM laptops");
  return rows;
};

export const findById = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM laptops WHERE id = ?", [id]);
  return rows[0] || null;
};

export const create = async (laptopParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO laptops (name, brand, price, stock)
         VALUES (?, ?, ?, ?)`,
    laptopParams
  );
  return result.insertId;
};

export const updateById = async (id, laptopParams) => {
  const pool = await initializeDatabase();
  const params = [...laptopParams, id];
  const [result] = await pool.execute(
    `UPDATE laptops SET name = ?, brand = ?, price = ?, stock = ? WHERE id = ?`,
    params
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute("DELETE FROM laptops WHERE id = ?", [id]);
  return result.affectedRows;
};
