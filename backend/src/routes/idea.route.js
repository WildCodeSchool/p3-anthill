const { Router } = require("express");
const ideaController = require("../controllers/idea.controller");

const ideaRouter = new Router();

ideaRouter.get("/", ideaController.list);
ideaRouter.post("/", ideaController.create);
ideaRouter.get("/:id", ideaController.get);
ideaRouter.put("/:id", ideaController.update);
ideaRouter.delete("/:id", ideaController.remove);

module.exports = { ideaRouter };
