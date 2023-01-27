/* eslint-disable prefer-regex-literals */
const axios = require("axios");

const topicModel = require("../models/topic.model");

const { SLACK_API_BOT_USER_TOKEN } = process.env;

async function createChannel(req, res) {
  if (!req.params.topicId) {
    res.sendStatus(400);
  }
  const topic = await topicModel.getOne(req.params.topicId);
  const nameOfTopic = topic.title
    .replace(new RegExp("[^(a-zA-Z)]", "g"), "")
    .toLowerCase();
  const URL = `https://slack.com/api/conversations.create?name=anthill-${nameOfTopic}&is_private=false&team_id=1&pretty=1`;

  const config = {
    method: "post",
    url: URL,
    headers: {
      Authorization: `Bearer ${SLACK_API_BOT_USER_TOKEN}`,
      "Content-Type": "text/plain",
    },
  };
  const result = await axios(config);
  return result.data;
}

async function updateTopicSlackInfos(req, res) {
  const channelInfos = await createChannel(req, res);
  if (!channelInfos.ok) {
    res.status(400).json({ error: channelInfos.error });
  }
  const slackChannelLink = `https://app.slack.com/client/${channelInfos.channel.context_team_id}/${channelInfos.channel.id}`;
  const affectedRows = await topicModel.updateOnlySlackInfos(
    req.params.topicId,
    slackChannelLink
  );
  if (affectedRows === 0) {
    res.sendStatus(404);
    return;
  }
  res.status(200).json({ channelInfos: channelInfos.channel.name });
}

module.exports = {
  createChannel,
  updateTopicSlackInfos,
};
