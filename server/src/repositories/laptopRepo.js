const { initializeDatabase } = require("../config/database");

const findAll = async () => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM LaptopTable");
  return rows;
};

const findById = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute("SELECT * FROM LaptopTable WHERE Id = ?", [
    id,
  ]);
  return rows[0] || null;
};

const create = async (laptopParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO LaptopTable (Name, Brand, Price, Stock)
         VALUES (?, ?, ?, ?)`,
    laptopParams,
  );
  return result.insertId;
};

const updateById = async (id, laptopParams) => {
  const pool = await initializeDatabase();
  const params = [...laptopParams, id];
  const [result] = await pool.execute(
    `UPDATE LaptopTable SET Name = ?, Brand = ?, Price = ?, Stock = ? WHERE Id = ?`,
    params,
  );
  return result.affectedRows;
};

const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute("DELETE FROM LaptopTable WHERE Id = ?", [
    id,
  ]);
  return result.affectedRows;
};

module.exports = { findAll, findById, create, updateById, removeById };
