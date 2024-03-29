const topicModel = require("../models/topic.model");
// const topicValidator = require("../validators/topic.validator");

async function list(req, res) {
  if (req.query.view === "card") {
    const topics = await topicModel.getAllTopicCard();
    res.json(topics);
    return;
  }

  const topics = await topicModel.getAll();
  res.json(topics);
}

async function listCard(req, res) {
  const topics = await topicModel.getAllTopicCard();
  res.json(topics);
}

async function getTrendingTopics(req, res) {
  const topics = await topicModel.getTrendingTopicsByIdeasCount();
  res.json(topics);
}

async function getUserTopics(req, res) {
  if (!req.params.id) {
    res.sendStatus(400);
    return;
  }

  const topics = await topicModel.getAllTopicsOfOneUser(req.params.id);
  res.json(topics);
}

async function get(req, res) {
  if (!req.params.id) {
    res.sendStatus(400);
    return;
  }

  const topic = await topicModel.getOne(req.params.id);
  if (!topic) {
    res.sendStatus(404);
    return;
  }
  res.json(topic);
}

async function create(req, res) {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }

  const creatorId = req.user.id;
  const insertId = await topicModel.insertOne(req.body, creatorId);
  if (!insertId) {
    res.sendStatus(404);
    return;
  }

  res.status(201).json({ insertId });
}

async function update(req, res) {
  if (!req.body || !req.params.id) {
    res.sendStatus(400);
    return;
  }

  const affectedRows = await topicModel.updateOne(req.params.id, req.body);
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

  const affectedRows = await topicModel.deleteOne(req.params.id, req.user.id);
  if (affectedRows === 0) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(204);
}

module.exports = {
  list,
  listCard,
  getTrendingTopics,
  get,
  create,
  update,
  remove,
  getUserTopics,
};
