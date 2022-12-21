const { Router } = require("express");
const topicController = require("../controllers/topic.controller");

const topicRouter = new Router();

topicRouter.get("/", topicController.list);
topicRouter.post("/", topicController.create);
topicRouter.get("/:id", topicController.get);
topicRouter.put("/:id", topicController.update);
topicRouter.delete("/:id", topicController.remove);

module.exports = { topicRouter };
