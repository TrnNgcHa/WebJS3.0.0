const laptopRepo = require("../repositories/laptopRepo");
const Laptop = require("../models/laptopModel");

const getAll = async () => {
  const rows = await laptopRepo.findAll();
  return rows.map((r) => Laptop.fromDb(r));
};

const getById = async (id) => {
  const row = await laptopRepo.findById(id);
  return Laptop.fromDb(row);
};

const createLaptop = async (data) => {
  const laptop = new Laptop(data);
  const errors = laptop.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const insertId = await laptopRepo.create(laptop.toInsertParams());
  laptop.id = insertId;
  return laptop;
};

const updateLaptop = async (id, data) => {
  const existing = await getById(id);
  if (!existing) return null;
  const updated = new Laptop({ ...existing, ...data, id });
  const errors = updated.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const affected = await laptopRepo.updateById(id, updated.toUpdateParams());
  return affected > 0 ? await getById(id) : null;
};

const deleteLaptop = async (id) => {
  const affected = await laptopRepo.removeById(id);
  return affected > 0;
};

module.exports = { getAll, getById, createLaptop, updateLaptop, deleteLaptop };
