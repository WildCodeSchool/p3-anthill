const { Router } = require("express");
const commentController = require("../controllers/comment.controller");
const { verifyToken } = require("../controllers/auth.controller");

const commentRouter = new Router();

commentRouter.get("/", commentController.listCommentsOfOneIdea);
commentRouter.get("/:id", commentController.get);

commentRouter.use(verifyToken); // Authorization middleware

commentRouter.post("/", commentController.create);
commentRouter.put("/:id", commentController.update);
commentRouter.delete("/:id", commentController.remove);

module.exports = { commentRouter };
