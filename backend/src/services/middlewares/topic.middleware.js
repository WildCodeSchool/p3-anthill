const topicModel = require("../../models/topic.model");
const ideaModel = require("../../models/idea.model");
const commentModel = require("../../models/comment.model");

async function switchIsClosed(req, res, next) {
  try {
    const topics = await topicModel.getAll();
    if (!topics) {
      res.status(404).send("Topic not found");
      return;
    }
    topics.forEach(async (topic) => {
      const deadline = new Date(topic.deadline);
      const currentDate = new Date();
      if (topic.is_closed === 0 && deadline < currentDate) {
        await topicModel.switchIsClosed(topic);
      }
    });
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function verifyIsClosed(req, res, next) {
  try {
    let topic = null;

    if (req.params.commentId) {
      const comment = await commentModel.getOne(req.params.commentId);
      if (!comment) {
        res.status(404).send("Comment not found");
        return;
      }

      const idea = await ideaModel.getOne(comment.idea_id);

      topic = await topicModel.getOne(idea.comment_mode_id);
    }

    if (req.params.ideaId) {
      const idea = await ideaModel.getOne(req.params.ideaId);
      if (!idea) {
        res.status(404).send("Idea not found");
        return;
      }
      topic = await topicModel.getOne(idea.comment_mode_id);
    }

    if (req.params.topicId) {
      topic = await topicModel.getOne(req.params.topicId);
    }

    if (!topic) {
      res.status(404).send("Topic not found");
      return;
    }

    const deadline = new Date(topic.deadline);
    const currentDate = new Date();
    if (deadline < currentDate) {
      res.status(403).send("Topic is closed");
      return;
    }

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

module.exports = {
  verifyIsClosed,
  switchIsClosed,
};
