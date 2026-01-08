import { initializeDatabase } from "../configs/database";

export const findAll = async () => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM cpus");
  return rows;
};

export const findById = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM cpus WHERE id = ?", [id]);
  return rows[0] || null;
};

export const create = async (cpuParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO cpus (name, brand, price, stock, cores, threads, base_clock, igpu)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    cpuParams
  );
  return result.insertId;
};

export const updateById = async (id, cpuParams) => {
  const pool = await initializeDatabase();
  const params = [...cpuParams, id];
  const [result] = await pool.execute(
    `UPDATE cpus SET name = ?, brand = ?, price = ?, stock = ?, cores = ?, threads = ?, base_clock = ?, igpu = ? WHERE id = ?`,
    params
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute("DELETE FROM cpus WHERE id = ?", [id]);
  return result.affectedRows;
};
