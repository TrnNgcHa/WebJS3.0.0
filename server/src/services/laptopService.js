import * as laptopRepo from "../repositories/laptopRepo.js";
import Laptop from "../models/laptopModel.js";

export const getAll = async () => {
  const rows = await laptopRepo.findAll();
  return rows.map((r) => Laptop.fromDb(r));
};

export const getById = async (id) => {
  const row = await laptopRepo.findById(id);
  return Laptop.fromDb(row);
};

export const createLaptop = async (data) => {
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

export const updateLaptop = async (id, data) => {
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

export const deleteLaptop = async (id) => {
  const affected = await laptopRepo.removeById(id);
  return affected > 0;
};
