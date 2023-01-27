const { Router } = require("express");
const topicController = require("../controllers/topic.controller");
const ideaController = require("../controllers/idea.controller");
const commentController = require("../controllers/comment.controller");
const topicValidator = require("../validators/topic.validator");
const { verifyToken } = require("../services/middlewares/auth.middleware");

const topicRouter = new Router();

topicRouter.use(verifyToken); // Authorization middleware

topicRouter.get("/", topicController.list);
topicRouter.get("/:id", topicController.get);
topicRouter.get("/:id/ideas", ideaController.listIdeasOfOneTopic);
topicRouter.get(
  "/:topicId/ideas/:ideaId/comments",
  commentController.listCommentsOfOneIdea
);

topicRouter.post(
  "/",
  topicValidator.validateCreateTopic,
  topicController.create
);
topicRouter.post("/:topicId/ideas", ideaController.create);
topicRouter.post("/:topicId/ideas/:ideaId/comments", commentController.create);

topicRouter.put("/:id", topicController.update);

topicRouter.delete("/:id", topicController.remove);
topicRouter.delete(
  "/:topicId/ideas/:id",

  ideaController.remove
);
topicRouter.delete(
  "/:topicId/ideas/:ideaId/comments/:id",
  commentController.remove
);

module.exports = { topicRouter };
