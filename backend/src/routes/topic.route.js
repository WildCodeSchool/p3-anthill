const { Router } = require("express");
const topicController = require("../controllers/topic.controller");
const ideaController = require("../controllers/idea.controller");

const topicRouter = new Router();

topicRouter.get("/", topicController.list);
topicRouter.get("/card", topicController.listCard);
topicRouter.get("/:id/ideas", ideaController.listIdeasOfOneTopic);
topicRouter.get("/:id", topicController.get);
topicRouter.get("/:id/details", topicController.getTopicDetail);

topicRouter.post("/", topicController.create);

topicRouter.put("/:id", topicController.update);

topicRouter.delete("/:id", topicController.remove);

module.exports = { topicRouter };
