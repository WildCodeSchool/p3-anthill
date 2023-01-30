const { Router } = require("express");
const badgeController = require("../controllers/badge.controller");
const { verifyToken } = require("../services/middlewares/auth.middleware");

const badgeRouter = new Router();

badgeRouter.use(verifyToken);

badgeRouter.get("/", badgeController.list);
badgeRouter.get("/:id", badgeController.get);

badgeRouter.post("/", badgeController.create);

badgeRouter.put("/:id", badgeController.update);

badgeRouter.delete("/:id", badgeController.remove);

module.exports = { badgeRouter };
