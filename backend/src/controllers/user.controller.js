const userModel = require("../models/user.model");
// const userValidator = require("../validators/user.validator");

async function list(req, res) {
  const users = await userModel.getAll();
  res.json(users);
}

async function create(req, res) {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }

  const insertId = await userModel.insertOne(req.body);

  res.status(201).json({ insertId });
}

async function get(req, res) {
  if (!req.params.id) {
    res.sendStatus(400);
    return;
  }

  const user = await userModel.getOne(req.params.id);

  if (!user) {
    res.sendStatus(404);
    return;
  }
  res.json(user);
}

async function getOnePseudo(req, res) {
  if (!req.params.pseudo) {
    res.sendStatus(400);
    return;
  }

  const userConnexion = await userModel.getConnexion(req.params.pseudo);

  if (!userConnexion) {
    res.sendStatus(404);
    return;
  }
  res.json(userConnexion);
}

async function update(req, res) {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }

  const affectedRows = await userModel.updateOne(req.params.id, req.body);

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

  const affectedRows = await userModel.deleteOne(req.params.id);

  if (affectedRows === 0) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(204);
}

module.exports = { list, create, get, getOnePseudo, update, remove };
