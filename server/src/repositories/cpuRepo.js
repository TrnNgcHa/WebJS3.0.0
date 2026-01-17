import { initializeDatabase } from "../config/database.js";

export const findAll = async () => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM CpuTable");
  return rows;
};

export const findById = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM CpuTable WHERE Id = ?", [
    id,
  ]);
  return rows[0] || null;
};

export const create = async (cpuParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO CpuTable (Name, Brand, Price, Stock, Cores, Threads, BaseClock, Igpu)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    cpuParams
  );
  return result.insertId;
};

export const updateById = async (id, cpuParams) => {
  const pool = await initializeDatabase();
  const params = [...cpuParams, id];
  const [result] = await pool.execute(
    `UPDATE CpuTable SET Name = ?, Brand = ?, Price = ?, Stock = ?, Cores = ?, Threads = ?, BaseClock = ?, Igpu = ? WHERE Id = ?`,
    params
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute("DELETE FROM CpuTable WHERE Id = ?", [
    id,
  ]);
  return result.affectedRows;
};
