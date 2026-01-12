import * as ramRepo from "../repositories/ramRepo.js";
import Ram from "../models/ramModel.js";

export const getAll = async () => {
  const rows = await ramRepo.findAll();
  return rows.map((row) => Ram.fromDb(row));
};

export const getById = async (id) => {
  const row = await ramRepo.findById(id);
  return Ram.fromDb(row);
};

export const createRam = async (data) => {
  const ram = new Ram(data);
  const errors = ram.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const insertId = await ramRepo.create(ram.toInsertParams());
  ram.id = insertId;
  return ram;
};

export const updateRam = async (id, data) => {
  const existing = await getById(id);
  if (!existing) return null;
  const updated = new Ram({ ...existing, ...data, id });
  const errors = updated.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const affected = await ramRepo.updateById(id, updated.toUpdateParams());
  return affected > 0 ? await getById(id) : null;
};

export const deleteRam = async (id) => {
  const affected = await ramRepo.removeById(id);
  return affected > 0;
};
