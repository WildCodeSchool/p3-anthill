const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
// const userValidator = require("../validators/user.validator");

async function list(req, res) {
  const users = await userModel.getAll();
  res.json(users);
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

  res.json({ token });
}

async function create(req, res) {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }

  const insertId = await userModel.insertOne(req.body);
  if (!insertId) {
    res.sendStatus(404);
    return;
  }

  const payload = { sub: insertId };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(201).json({ token });
}

async function getCurrentUser(req, res) {
  const currentUserId = req.user.id;
  const currentUser = await userModel.getCurrentUser(currentUserId);
  if (!currentUser) {
    res.sendStatus(404);
    return;
  }

  res.json(currentUser);
}

async function update(req, res) {
  if (!req.body || !req.params.id || !req.user) {
    res.sendStatus(400);
    return;
  }

  if (req.user.id !== parseInt(req.params.id, 10)) {
    res.sendStatus(401);
    return;
  }

  const affectedRows = await userModel.updateOne(
    req.params.id,
    req.body,
    req.user
  );
  if (affectedRows === 0) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(204);
}

async function updatePicture(req, res) {
  const { originalname } = req.file;
  const { filename } = req.file;
  const newName = `${uuidv4()}-${originalname}`;
  await fs.rename(`public/uploads/${filename}`, `public/uploads/${newName}`);

  const affectedRows = await userModel.updatePicture(req.params.id, newName);
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
  get,
  getOneByEmail,
  create,
  getCurrentUser,
  update,
  updatePicture,
  remove,
};
