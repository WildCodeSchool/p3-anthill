const upvoteModel = require("../models/vote.model");

async function upvoteIdea(req, res) {
  if (!req.params.ideaId) {
    res.sendStatus(400);
    return;
  }

  const userId = req.user.id;

  try {
    const affectedRows = await upvoteModel.insertOneForIdea({
      ideaId: req.params.ideaId,
      userId,
    });
    if (affectedRows === 1) {
      res.sendStatus(200);
      return;
    }

    res.sendStatus(404);
  } catch (error) {
    res.sendStatus(403);
  }
}

async function upvoteComment(req, res) {
  if (!req.params.commentId) {
    res.sendStatus(400);
    return;
  }

  const userId = req.user.id;

  try {
    const affectedRows = await upvoteModel.insertOneForComment({
      commentId: req.params.commentId,
      userId,
    });
    if (affectedRows === 1) {
      res.sendStatus(200);
      return;
    }

    res.sendStatus(404);
  } catch (error) {
    res.sendStatus(403);
  }
}

async function downvoteIdea(req, res) {
  if (!req.params.ideaId) {
    res.sendStatus(400);
    return;
  }

  const userId = req.user.id;

  try {
    const affectedRows = await upvoteModel.updateOneForIdea(
      req.params.ideaId,
      userId
    );
    if (affectedRows === 1) {
      res.sendStatus(200);
      return;
    }

    res.sendStatus(400);
  } catch (error) {
    res.sendStatus(403);
  }
}

async function downvoteComment(req, res) {
  if (!req.params.commentId) {
    res.sendStatus(400);
    return;
  }

  const userId = req.user.id;

  try {
    const affectedRows = await upvoteModel.updateOneForComment(
      req.params.commentId,
      userId
    );
    if (affectedRows === 1) {
      res.sendStatus(200);
      return;
    }

    res.sendStatus(400);
  } catch (error) {
    res.sendStatus(403);
  }
}

module.exports = {
  upvoteIdea,
  downvoteIdea,
  upvoteComment,
  downvoteComment,
};
