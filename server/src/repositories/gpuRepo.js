import { initializeDatabase } from "../config/database.js";

export const findAll = async () => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM GpuTable");
  return rows;
};

export const findById = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM GpuTable WHERE Id = ?", [
    id,
  ]);
  return rows[0] || null;
};

export const create = async (gpuParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO GpuTable (Name, Brand, Price, Stock, CudaCore, BaseClock, Vram, Pcie)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    gpuParams
  );
  return result.insertId;
};

export const updateById = async (id, gpuParams) => {
  const pool = await initializeDatabase();
  const params = [...gpuParams, id];
  const [result] = await pool.execute(
    `UPDATE GpuTable SET Name = ?, Brand = ?, Price = ?, Stock = ?, CudaCore = ?, BaseClock = ?, Vram = ?, Pcie = ? WHERE Id = ?`,
    params
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute("DELETE FROM GpuTable WHERE Id = ?", [
    id,
  ]);
  return result.affectedRows;
};
