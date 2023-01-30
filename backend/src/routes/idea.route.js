const { Router } = require("express");
const ideaController = require("../controllers/idea.controller");
const { verifyToken } = require("../services/middlewares/auth.middleware");

const ideaRouter = new Router();

ideaRouter.use(verifyToken); // Authorization middleware

ideaRouter.get("/", ideaController.list);
ideaRouter.get("/:id", ideaController.get);

ideaRouter.put("/:id", ideaController.update);

ideaRouter.delete("/:id", ideaController.remove);

module.exports = { ideaRouter };
