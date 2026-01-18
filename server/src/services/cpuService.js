const cpuRepo = require("../repositories/cpuRepo");
const Cpu = require("../models/cpuModel");

const getAll = async () => {
  const rows = await cpuRepo.findAll();
  return rows.map((row) => Cpu.fromDb(row));
};

const getById = async (id) => {
  const row = await cpuRepo.findById(id);
  return Cpu.fromDb(row);
};

const createCpu = async (data) => {
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

const updateCpu = async (id, data) => {
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

const deleteCpu = async (id) => {
  const affected = await cpuRepo.removeById(id);
  return affected > 0;
};

module.exports = { getAll, getById, createCpu, updateCpu, deleteCpu };
