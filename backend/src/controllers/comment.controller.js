const commentModel = require("../models/comment.model");
const upvoteModel = require("../models/vote.model");
// const commentValidator = require("../validators/comment.validator");

async function listCommentsOfOneIdea(req, res) {
  const result = [];
  const comments = await commentModel.getAllCommentsOfOneIdea(
    req.params.ideaId
  );
  const upvotes = await upvoteModel.getAllUpvotesCommentOfUser(1); // getCurrentUser();
  const userVotes = [];

  for (let j = 0; j < upvotes.length; j += 1) {
    userVotes.push(upvotes[j].comment_id);
  }

  for (let i = 0; i < comments.length; i += 1) {
    const commentId = comments[i].id;
    if (userVotes.includes(commentId)) {
      const data = Object.assign(comments[i], { canVote: 0 });
      result.push(data);
    } else {
      const data = Object.assign(comments[i], { canVote: 1 });
      result.push(data);
    }
  }
  res.json(result);
}

async function create(req, res) {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }

  const insertId = await commentModel.insertOne({
    content: req.body.content,
    userId: 1,
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
  if (!req.body) {
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
