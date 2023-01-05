const { Router } = require("express");
const userController = require("../controllers/user.controller");
const badgeController = require("../controllers/badge.controller");

const userRouter = new Router();

userRouter.get("/", userController.list);
userRouter.post("/", userController.create);
userRouter.get("/:id", userController.get);
userRouter.put("/:id", userController.update);
userRouter.delete("/:id", userController.remove);
userRouter.get("/:id/badges", badgeController.getUserBadges);

module.exports = { userRouter };
