const ideaModel = require("../models/idea.model");

async function list(req, res) {
  const ideas = await ideaModel.getAll();
  res.json(ideas);
}

async function listIdeasOfOneTopic(req, res) {
  if (!req.payload.sub) {
    res.sendStatus(401);
    return;
  }

  if (!req.params.id) {
    res.sendStatus(400);
    return;
  }

  const userId = req.payload.sub;
  const ideas = await ideaModel.getAllOfOneTopic(userId, req.params.id);

  res.json(ideas);
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

async function create(req, res) {
  if (!req.payload) {
    res.sendStatus(401);
    return;
  }

  if (!req.body || !req.params.topicId) {
    res.sendStatus(400);
    return;
  }

  const creatorId = req.payload.sub;
  const insertId = await ideaModel.insertOne(
    req.body,
    req.params.topicId,
    creatorId
  );
  if (!insertId) {
    res.sendStatus(404);
  }

  res.status(201).send({ insertId });
}

async function update(req, res) {
  if (!req.body || !req.params.id) {
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

  if (req.payload.sub !== req.params.id) {
    res.sendStatus(401);
    return;
  }

  const affectedRows = await ideaModel.deleteOne(req.params.id);
  if (affectedRows === 0) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(204);
}

module.exports = { list, listIdeasOfOneTopic, get, create, update, remove };
