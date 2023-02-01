const topicModel = require("../../models/topic.model");

async function verifyIsClosed(req, res, next) {
  try {
    const topic = await topicModel.getOne(req.params.topicId);
    if (!topic) {
      res.sendStatus(404);
      return;
    }

    const deadline = new Date(topic.deadline);
    const currentDate = new Date();
    if (deadline < currentDate) {
      res.sendStatus(403);
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
};
