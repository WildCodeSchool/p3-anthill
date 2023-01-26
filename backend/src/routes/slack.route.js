const { Router } = require("express");
const slackController = require("../controllers/slack.controller");

const slackRouter = new Router();

slackRouter.post(
  "/:topicId/slack/channels/create",
  slackController.updateTopicSlackInfos
);

module.exports = { slackRouter };
