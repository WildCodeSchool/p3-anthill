const ideaModel = require("../models/idea.model");
const upvoteModel = require("../models/vote.model");
// const ideaValidator = require("../validators/idea.validator");

async function list(req, res) {
  const ideas = await ideaModel.getAll();
  res.json(ideas);
}

async function listIdeasOfOneTopic(req, res) {
  const result = [];
  const ideas = await ideaModel.getAllOfOneTopic(req.params.id);
  const upvotes = await upvoteModel.getAllUpvotesOfUser(1); // getCurrentUser();
  const userVotes = [];

  for (let j = 0; j < upvotes.length; j += 1) {
    userVotes.push(upvotes[j].idea_id);
  }

  for (let i = 0; i < ideas.length; i += 1) {
    const ideaId = ideas[i].id;
    if (userVotes.includes(ideaId)) {
      const data = Object.assign(ideas[i], { canVote: 0 });
      result.push(data);
    } else {
      const data = Object.assign(ideas[i], { canVote: 1 });
      result.push(data);
    }
  }
  res.json(result);
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
  if (!req.body || !req.params.topicId) {
    res.sendStatus(400);
    return;
  }

  const insertId = await ideaModel.insertOne(req.body, req.params.topicId);
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

module.exports = { list, listIdeasOfOneTopic, get, create, update, remove };
