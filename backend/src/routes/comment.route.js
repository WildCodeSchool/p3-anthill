const { Router } = require("express");
const commentController = require("../controllers/comment.controller");

const commentRouter = new Router();

commentRouter.get("/", commentController.list);
commentRouter.post("/", commentController.create);
commentRouter.get("/:id", commentController.get);
commentRouter.put("/:id", commentController.update);
commentRouter.delete("/:id", commentController.remove);

module.exports = { commentRouter };
