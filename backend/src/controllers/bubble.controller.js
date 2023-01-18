const bubbleModel = require("../models/bubble.model");

async function list(req, res) {
  const bubbles = await bubbleModel.getAll();
  res.json(bubbles);
}

async function listBubblesOfOneTopic(req, res) {
  if (!req.params.topicId) {
    res.sendStatus(400);
    return;
  }
  const bubbles = await bubbleModel.getAllBubblesByTopicId(req.params.topicId);

  res.json(bubbles);
}

async function get(req, res) {
  if (!req.params.topicId) {
    res.sendStatus(400);
    return;
  }
  const bubble = await bubbleModel.getOneBubbleById({
    bubbleId: req.params.bubbleId,
  });
  if (!bubble) {
    res.sendStatus(404);
    return;
  }
  res.json(bubble);
}

async function create(req, res) {
  if (!req.body || !req.params.topicId) {
    res.sendStatus(400);
    return;
  }

  const insertId = await bubbleModel.insertOne({
    mindmapId: req.params.topicId,
    userId: 1,
    content: req.body.content,
  }); // getCurrentUser()
  if (!insertId) {
    res.sendStatus(404);
  }
  res.status(201).json({ insertId });
}

async function update(req, res) {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }

  const affectedRows = await bubbleModel.updateOne({
    bubbleId: req.params.bubbleId,
    userId: 1, // getCurrentUser()
    content: req.body.content,
  });

  if (affectedRows === 0) {
    res.sendStatus(403);
    return;
  }

  res.sendStatus(204);
}

async function remove(req, res) {
  if (!req.params.bubbleId) {
    res.sendStatus(400);
    return;
  }

  const affectedRows = await bubbleModel.deleteOne({
    bubbleId: req.params.bubbleId,
    userId: 1, // getCurrentUser()
  });

  if (affectedRows === 0) {
    res.sendStatus(403);
    return;
  }

  res.sendStatus(204);
}

module.exports = { list, listBubblesOfOneTopic, get, create, update, remove };
