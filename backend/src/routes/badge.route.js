const { Router } = require("express");
const badgeController = require("../controllers/badge.controller");

const badgeRouter = new Router();

badgeRouter.get("/", badgeController.list);
badgeRouter.post("/", badgeController.create);
badgeRouter.get("/:id", badgeController.get);
badgeRouter.put("/:id", badgeController.update);
badgeRouter.delete("/:id", badgeController.remove);
badgeRouter.get("/:id/badges", badgeController.getUserBadges);

module.exports = { badgeRouter };
