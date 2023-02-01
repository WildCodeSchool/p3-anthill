const { Router } = require("express");
const voteController = require("../controllers/vote.controller");
const { verifyToken } = require("../services/middlewares/auth.middleware");
const { verifyIsClosed } = require("../services/middlewares/topic.middleware");

const voteRouter = new Router();

voteRouter.use(verifyToken); // Authorization middleware

voteRouter.post(
  "/ideas/:ideaId/upvote",
  verifyIsClosed,
  voteController.upvoteIdea
);
voteRouter.put(
  "/ideas/:ideaId/downvote",
  verifyIsClosed,
  voteController.downvoteIdea
);

voteRouter.post(
  "/comments/:commentId/upvote",
  verifyIsClosed,
  voteController.upvoteComment
);

voteRouter.put(
  "/comments/:commentId/downvote",
  verifyIsClosed,
  voteController.downvoteComment
);

module.exports = { voteRouter };
