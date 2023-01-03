const { Router } = require("express");
const topicController = require("../controllers/topic.controller");
const ideaController = require("../controllers/idea.controller");

const topicRouter = new Router();

topicRouter.get("/", topicController.list);
topicRouter.get("/:id", topicController.get);
topicRouter.get("/:id/ideas", ideaController.allIdeasOfOneTopic);

topicRouter.post("/", topicController.create);

topicRouter.put("/:id", topicController.update);

topicRouter.delete("/:id", topicController.remove);

module.exports = { topicRouter };
