import * as cpuRepo from "../repositories/cpuRepo.js";
import Cpu from "../models/cpuModel.js";

export const getAll = async () => {
  const rows = await cpuRepo.findAll();
  return rows;
};

export const getById = async (id) => {
  const row = await cpuRepo.findById(id);
  return Cpu.fromDb(row);
};

export const createCpu = async (data) => {
  const cpu = new Cpu(data);
  const errors = cpu.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const insertId = await cpuRepo.create(cpu.toInsertParams());
  cpu.id = insertId;
  return cpu;
};

export const updateCpu = async (id, data) => {
  const existing = await getById(id);
  if (!existing) return null;
  const updated = new Cpu({ ...existing, ...data, id });
  const errors = updated.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const affected = await cpuRepo.updateById(id, updated.toUpdateParams());
  return affected > 0 ? await getById(id) : null;
};

export const deleteCpu = async (id) => {
  const affected = await cpuRepo.removeById(id);
  return affected > 0;
};
