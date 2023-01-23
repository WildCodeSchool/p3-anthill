const { Router } = require("express");
const ideaController = require("../controllers/idea.controller");
const { verifyToken } = require("../controllers/auth.controller");

const ideaRouter = new Router();

ideaRouter.get("/", ideaController.list);
ideaRouter.get("/:id", ideaController.get);

ideaRouter.use(verifyToken); // Authorization middleware

ideaRouter.put("/:id", ideaController.update);
ideaRouter.delete("/:id", ideaController.remove);

module.exports = { ideaRouter };
