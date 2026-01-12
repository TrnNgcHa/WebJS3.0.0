import * as ramService from "../services/ramService.js";

export const list = async (req, res, next) => {
  try {
    const rams = await ramService.getAll();
    res.json(rams);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ram = await ramService.getById(id);
    if (!ram) return res.status(404).json({ message: "RAM not found" });
    res.json(ram);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const created = await ramService.createRam(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await ramService.updateRam(id, req.body);
    if (!updated) return res.status(404).json({ message: "RAM not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ok = await ramService.deleteRam(id);
    if (!ok) return res.status(404).json({ message: "RAM not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
