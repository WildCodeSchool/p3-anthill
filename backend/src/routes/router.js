const express = require("express");
const { topicRouter } = require("./topic.route");
const { ideaRouter } = require("./idea.route");
const { userRouter } = require("./user.route");
const { commentRouter } = require("./comment.route");
const { badgeRouter } = require("./badge.route");
const { moodRouter } = require("./mood.route");
const { voteRouter } = require("./vote.route");
const { bubbleRouter } = require("./bubble.route");
const { slackRouter } = require("./slack.route");
const { bubbleRouter } = require("./bubble.route");

const router = express.Router();

router.use("/api/topics", topicRouter);
router.use("/api/ideas", ideaRouter);
router.use("/api/users", userRouter);
router.use("/api/comments", commentRouter);
router.use("/api/badges", badgeRouter);
router.use("/api/moods", moodRouter);
router.use("/api/votes", voteRouter);
router.use("/api/topics", bubbleRouter);
router.use("/api/topics", slackRouter);

module.exports = router;
