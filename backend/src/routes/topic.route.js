const { Router } = require("express");
const topicController = require("../controllers/topic.controller");
const ideaController = require("../controllers/idea.controller");
const topicValidator = require("../validators/topic.validator");

const topicRouter = new Router();

topicRouter.get("/", topicController.list);
topicRouter.get("/card", topicController.listCard);
topicRouter.get("/:id/ideas", ideaController.listIdeasOfOneTopic);
topicRouter.get("/:id", topicController.get);

topicRouter.post(
  "/",
  topicValidator.validateCreateTopic,
  topicController.create
);

topicRouter.post("/:topicId/ideas", ideaController.create);

topicRouter.put("/:id", topicController.update);

topicRouter.delete("/:id", topicController.remove);

module.exports = { topicRouter };
