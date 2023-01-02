const ideaModel = require("../models/idea.model");
// const ideaValidator = require("../validators/idea.validator");

async function list(req, res) {
  const ideas = await ideaModel.getAll();
  res.json(ideas);
}

async function create(req, res) {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }

  const insertId = await ideaModel.insertOne(req.body);

  res.status(201).json({ insertId });
}

async function get(req, res) {
  if (!req.params.id) {
    res.sendStatus(400);
    return;
  }

  const idea = await ideaModel.getOne(req.params.id);

  if (!idea) {
    res.sendStatus(404);
    return;
  }

  res.json(idea);
}

async function update(req, res) {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }

  const affectedRows = await ideaModel.updateOne(req.params.id, req.body);

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

  const affectedRows = await ideaModel.deleteOne(req.params.id);

  if (affectedRows === 0) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(204);
}

module.exports = { list, create, get, update, remove };
