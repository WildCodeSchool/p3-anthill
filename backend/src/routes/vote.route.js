const { Router } = require("express");
const voteController = require("../controllers/vote.controller");
const { verifyToken } = require("../services/middlewares/auth.middleware");

const voteRouter = new Router();

voteRouter.use(verifyToken); // Authorization middleware

voteRouter.post("/ideas/:ideaId/upvote", voteController.upvoteIdea);
voteRouter.put("/ideas/:ideaId/downvote", voteController.downvoteIdea);

voteRouter.post("/comments/:commentId/upvote", voteController.upvoteComment);

voteRouter.put("/comments/:commentId/downvote", voteController.downvoteComment);

module.exports = { voteRouter };
