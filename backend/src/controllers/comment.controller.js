const commentModel = require("../models/comment.model");
// const commentValidator = require("../validators/comment.validator");

async function listCommentsOfOneIdea(req, res) {
  const userId = req.user.id;
  const comments = await commentModel.getAllCommentsOfOneIdea(
    userId,
    req.params.ideaId
  );

  res.json(comments);
}

async function create(req, res) {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }

  const creatorId = req.user.id;
  const insertId = await commentModel.insertOne({
    content: req.body.content,
    creatorId,
    ideaId: req.params.ideaId,
  });

  res.status(201).json({ insertId });
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

  res.json(comment);
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

  const affectedRows = await commentModel.deleteOne(req.params.id, req.user.id);
  if (affectedRows === 0) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(204);
}

module.exports = { listCommentsOfOneIdea, create, get, update, remove };
