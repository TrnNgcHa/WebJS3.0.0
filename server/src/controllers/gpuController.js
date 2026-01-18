const gpuService = require("../services/gpuService");

const list = async (req, res, next) => {
  try {
    const gpus = await gpuService.getAll();
    res.json(gpus);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const gpu = await gpuService.getById(id);
    if (!gpu) return res.status(404).json({ message: "GPU not found" });
    res.json(gpu);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const created = await gpuService.createGpu(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await gpuService.updateGpu(id, req.body);
    if (!updated) return res.status(404).json({ message: "GPU not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ok = await gpuService.deleteGpu(id);
    if (!ok) return res.status(404).json({ message: "GPU not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = { list, getOne, create, update, remove };
