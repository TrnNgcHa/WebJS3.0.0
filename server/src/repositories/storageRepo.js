import { initializeDatabase } from "../configs/database.js";

export const findAll = async () => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM storages");
  return rows;
};

export const findById = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM storages WHERE id = ?", [
    id,
  ]);
  return rows[0] || null;
};

export const create = async (storageParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO storages (name, brand, price, stock, storage_type, interface_type, capacity)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
    storageParams
  );
  return result.insertId;
};

export const updateById = async (id, storageParams) => {
  const pool = await initializeDatabase();
  const params = [...storageParams, id];
  const [result] = await pool.execute(
    `UPDATE storages SET name = ?, brand = ?, price = ?, stock = ?, storage_type = ?, interface_type = ?, capacity = ? WHERE id = ?`,
    params
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute("DELETE FROM storages WHERE id = ?", [
    id,
  ]);
  return result.affectedRows;
};
