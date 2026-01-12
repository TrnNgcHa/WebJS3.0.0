import * as storageRepo from "../repositories/storageRepo.js";
import Storage from "../models/storageModel.js";

export const getAll = async () => {
  const rows = await storageRepo.findAll();
  return rows.map((row) => Storage.fromDb(row));
};

export const getById = async (id) => {
  const row = await storageRepo.findById(id);
  return Storage.fromDb(row);
};

export const createStorage = async (data) => {
  const storage = new Storage(data);
  const errors = storage.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const insertId = await storageRepo.create(storage.toInsertParams());
  storage.id = insertId;
  return storage;
};

export const updateStorage = async (id, data) => {
  const existing = await getById(id);
  if (!existing) return null;
  const updated = new Storage({ ...existing, ...data, id });
  const errors = updated.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const affected = await storageRepo.updateById(id, updated.toUpdateParams());
  return affected > 0 ? await getById(id) : null;
};

export const deleteStorage = async (id) => {
  const affected = await storageRepo.removeById(id);
  return affected > 0;
};
