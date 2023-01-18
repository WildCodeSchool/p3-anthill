const { Router } = require("express");
const userController = require("../controllers/user.controller");
const badgeController = require("../controllers/badge.controller");
const topicController = require("../controllers/topic.controller");
const { hashPassword, verifyPassword } = require("../../services/auth");

const userRouter = new Router();

userRouter.get("/", userController.list);
userRouter.get("/:id", userController.get);
userRouter.get("/email/:email", userController.getOneByEmail);
userRouter.get("/:id/badges", badgeController.getUserBadges);
userRouter.get("/:id/topics", topicController.getUserTopics);

userRouter.post("/", hashPassword, userController.create);
userRouter.post(
  "/login",
  userController.getUserByEmailWithPassword,
  verifyPassword
);

userRouter.put("/:id", userController.update);

userRouter.delete("/:id", userController.remove);

module.exports = { userRouter };
