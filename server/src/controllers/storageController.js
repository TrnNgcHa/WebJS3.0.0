const storageService = require("../services/storageService");

const list = async (req, res, next) => {
  try {
    const storages = await storageService.getAll();
    res.json(storages);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const storage = await storageService.getById(id);
    if (!storage) return res.status(404).json({ message: "Storage not found" });
    res.json(storage);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const created = await storageService.createStorage(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await storageService.updateStorage(id, req.body);
    if (!updated) return res.status(404).json({ message: "Storage not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ok = await storageService.deleteStorage(id);
    if (!ok) return res.status(404).json({ message: "Storage not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = { list, getOne, create, update, remove };
