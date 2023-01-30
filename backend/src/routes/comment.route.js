const { Router } = require("express");
const commentController = require("../controllers/comment.controller");
const { verifyToken } = require("../services/middlewares/auth.middleware");

const commentRouter = new Router();

commentRouter.use(verifyToken); // Authorization middleware

commentRouter.get("/", commentController.listCommentsOfOneIdea);
commentRouter.get("/:id", commentController.get);

commentRouter.post("/", commentController.create);

commentRouter.put("/:id", commentController.update);

commentRouter.delete("/:id", commentController.remove);

module.exports = { commentRouter };
