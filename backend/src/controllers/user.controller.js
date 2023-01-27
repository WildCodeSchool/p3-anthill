const jwt = require("jsonwebtoken");
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
  const payload = { sub: insertId };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(201).send({ token });
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

async function getOneByEmail(req, res) {
  if (!req.params.email) {
    res.sendStatus(400);
    return;
  }

  const userConnexion = await userModel.getConnexion(req.params.email);

  if (!userConnexion) {
    res.sendStatus(404);
    return;
  }
  const payload = { sub: userConnexion.id };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.send({ token });
}

async function update(req, res) {
  if (!req.body || !req.params.id) {
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

async function updateAudrey(req, res) {
  if (!req.body || !req.params.id) {
    res.sendStatus(400);
    return;
  }

  const affectedRows = await userModel.updateOneAudrey(req.params.id, req.body);

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

module.exports = {
  list,
  create,
  getOneByEmail,
  get,
  update,
  updateAudrey,
  remove,
};
