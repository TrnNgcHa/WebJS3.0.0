const { initializeDatabase } = require("../config/database");

const findAll = async () => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM StorageTable");
  return rows;
};

const findById = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM StorageTable WHERE Id = ?", [
    id,
  ]);
  return rows[0] || null;
};

const create = async (storageParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO StorageTable (Name, Brand, Price, Stock, StorageType, InterfaceType, Capacity)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
    storageParams,
  );
  return result.insertId;
};

const updateById = async (id, storageParams) => {
  const pool = await initializeDatabase();
  const params = [...storageParams, id];
  const [result] = await pool.execute(
    `UPDATE StorageTable SET Name = ?, Brand = ?, Price = ?, Stock = ?, StorageType = ?, InterfaceType = ?, Capacity = ? WHERE Id = ?`,
    params,
  );
  return result.affectedRows;
};

const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute("DELETE FROM StorageTable WHERE Id = ?", [
    id,
  ]);
  return result.affectedRows;
};

module.exports = { findAll, findById, create, updateById, removeById };
