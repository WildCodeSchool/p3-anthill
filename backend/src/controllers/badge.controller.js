const badgeModel = require("../models/badge.model");
// const badgeValidator = require("../validators/badge.validator");

async function list(req, res) {
  const badges = await badgeModel.getAll();
  res.json(badges);
}

async function create(req, res) {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }

  const insertId = await badgeModel.insertOne(req.body);

  res.status(201).json({ insertId });
}

async function get(req, res) {
  if (!req.params.id) {
    res.sendStatus(400);
    return;
  }

  const badge = await badgeModel.getOne(req.params.id);

  if (!badge) {
    res.sendStatus(404);
    return;
  }

  res.json(badge);
}

async function update(req, res) {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }

  const affectedRows = await badgeModel.updateOne(req.params.id, req.body);

  if (affectedRows === 0) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(204);
}

async function remove(req, res) {
  if (!req.params.id) {
    res.sendStatus(400);
    return;
  }

  const affectedRows = await badgeModel.deleteOne(req.params.id);

  if (affectedRows === 0) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(204);
}

module.exports = { list, create, get, update, remove };
