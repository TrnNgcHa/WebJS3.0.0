import { initializeDatabase } from "../configs/database.js";

export const findAll = async () => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM gpus");
  return rows;
};

export const findById = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM gpus WHERE id = ?", [id]);
  return rows[0] || null;
};

export const create = async (gpuParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO gpus (name, brand, price, stock, cuda_core, base_clock, vram, pcie)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    gpuParams
  );
  return result.insertId;
};

export const updateById = async (id, gpuParams) => {
  const pool = await initializeDatabase();
  const params = [...gpuParams, id];
  const [result] = await pool.execute(
    `UPDATE gpus SET name = ?, brand = ?, price = ?, stock = ?, cuda_core = ?, base_clock = ?, vram = ?, pcie = ? WHERE id = ?`,
    params
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute("DELETE FROM gpus WHERE id = ?", [id]);
  return result.affectedRows;
};
