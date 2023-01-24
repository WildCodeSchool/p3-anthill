const commentModel = require("../models/comment.model");
// const commentValidator = require("../validators/comment.validator");

async function listCommentsOfOneIdea(req, res) {
  if (!req.payload.sub) {
    res.sendStatus(401);
    return;
  }

  const userId = req.payload.sub;
  const comments = await commentModel.getAllCommentsOfOneIdea(
    userId,
    req.params.ideaId
  );

  res.send(comments);
}

async function create(req, res) {
  if (!req.payload.sub) {
    res.sendStatus(401);
    return;
  }

  if (!req.body) {
    res.sendStatus(400);
    return;
  }

  const creatorId = req.payload.sub;
  const insertId = await commentModel.insertOne({
    content: req.body.content,
    creatorId,
    ideaId: req.params.ideaId,
  });

  res.status(201).send({ insertId });
}

async function get(req, res) {
  if (!req.params.id) {
    res.sendStatus(400);
    return;
  }

  const comment = await commentModel.getOne(req.params.id);

  if (!comment) {
    res.sendStatus(404);
    return;
  }

  res.send(comment);
}

async function update(req, res) {
  if (!req.body || !req.params.id) {
    res.sendStatus(400);
    return;
  }

  const affectedRows = await commentModel.updateOne(req.params.id, req.body);

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
  const affectedRows = await commentModel.deleteOne(req.params.id);

  if (affectedRows === 0) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(204);
}

module.exports = { listCommentsOfOneIdea, create, get, update, remove };
