const storageRepo = require("../repositories/storageRepo");
const Storage = require("../models/storageModel");

const getAll = async () => {
  const rows = await storageRepo.findAll();
  return rows.map((row) => Storage.fromDb(row));
};

const getById = async (id) => {
  const row = await storageRepo.findById(id);
  return Storage.fromDb(row);
};

const createStorage = async (data) => {
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

const updateStorage = async (id, data) => {
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

const deleteStorage = async (id) => {
  const affected = await storageRepo.removeById(id);
  return affected > 0;
};

module.exports = {
  getAll,
  getById,
  createStorage,
  updateStorage,
  deleteStorage,
};
