const express = require("express");
// const { topicRouter } = require("./topic.route");
const { ideaRouter } = require("./idea.route");
const { userRouter } = require("./user.route");
const { commentRouter } = require("./comment.route");
const { badgeRouter } = require("./badge.route");
const { moodRouter } = require("./mood.route");

const router = express.Router();

// router.use("/api/topics", topicRouter);
router.use("/api/ideas", ideaRouter);
router.use("/api/users", userRouter);
router.use("/api/comments", commentRouter);
router.use("/api/badges", badgeRouter);
router.use("/api/moods", moodRouter);

module.exports = router;
