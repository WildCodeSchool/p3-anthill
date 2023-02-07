const { Router } = require("express");
const topicController = require("../controllers/topic.controller");
const ideaController = require("../controllers/idea.controller");
const commentController = require("../controllers/comment.controller");
// const topicValidator = require("../validators/topic.validator");
const { verifyToken } = require("../services/middlewares/auth.middleware");
const {
  verifyIsClosed,
  switchIsClosed,
} = require("../services/middlewares/topic.middleware");

const topicRouter = new Router();

topicRouter.use(verifyToken); // Authorization middleware
topicRouter.use(switchIsClosed); // Switch is_closed middleware

topicRouter.get("/", topicController.list);
topicRouter.get("/card", topicController.listCard);
topicRouter.get("/card/top", topicController.getTrendingTopics);
topicRouter.get("/:id", topicController.get);
topicRouter.get("/:id/ideas", ideaController.listIdeasOfOneTopic);
topicRouter.get(
  "/:topicId/ideas/:ideaId/comments",
  commentController.listCommentsOfOneIdea
);

topicRouter.post(
  "/",
  // topicValidator.validateCreateTopic,
  topicController.create
);
topicRouter.post("/:topicId/ideas", verifyIsClosed, ideaController.create);
topicRouter.post(
  "/:topicId/ideas/:ideaId/comments",
  verifyIsClosed,
  commentController.create
);

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
