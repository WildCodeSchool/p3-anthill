const { Router } = require("express");
const bubbleController = require("../controllers/bubble.controller");

const bubbleRouter = new Router();

bubbleRouter.get("/:topicId/bubbles", bubbleController.listBubblesOfOneTopic);
bubbleRouter.get("/:topicId/bubbles/:bubbleId", bubbleController.get);
bubbleRouter.post("/:topicId/bubbles", bubbleController.create);
bubbleRouter.put("/:topicId/bubbles/:bubbleId", bubbleController.update);
bubbleRouter.delete("/:topicId/bubbles/:bubbleId", bubbleController.remove);

module.exports = { bubbleRouter };
