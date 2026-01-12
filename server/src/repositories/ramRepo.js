import { initializeDatabase } from "../configs/database.js";

export const findAll = async () => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM RamTable");
  return rows;
};

export const findById = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM RamTable WHERE Id = ?", [
    id,
  ]);
  return rows[0] || null;
};

export const create = async (ramParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO RamTable (Name, Brand, Price, Stock, Capacity, Gen, Speed)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
    ramParams
  );
  return result.insertId;
};

export const updateById = async (id, ramParams) => {
  const pool = await initializeDatabase();
  const params = [...ramParams, id];
  const [result] = await pool.execute(
    `UPDATE RamTable SET Name = ?, Brand = ?, Price = ?, Stock = ?, Capacity = ?, Gen = ?, Speed = ? WHERE Id = ?`,
    params
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute("DELETE FROM RamTable WHERE Id = ?", [
    id,
  ]);
  return result.affectedRows;
};
