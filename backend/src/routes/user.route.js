const { Router } = require("express");
const userController = require("../controllers/user.controller");
const badgeController = require("../controllers/badge.controller");
const topicController = require("../controllers/topic.controller");
const {
  login,
  hashPassword,
  getUserByEmailWithPassword,
  verifyToken,
} = require("../controllers/auth.controller");

const userRouter = new Router();

userRouter.get("/", verifyToken, userController.list);
userRouter.get("/currentUser", verifyToken, userController.getCurrentUser);
userRouter.get("/:id", verifyToken, userController.get);
userRouter.get("/email/:email", userController.getOneByEmail);
userRouter.get("/:id/badges", verifyToken, badgeController.getUserBadges);
userRouter.get("/:id/topics", verifyToken, topicController.getUserTopics);

userRouter.post("/signupgoogle", userController.create);
userRouter.post("/signup", hashPassword, userController.create);
userRouter.post("/login", getUserByEmailWithPassword, login);

userRouter.put("/:id", verifyToken, userController.update);

userRouter.delete("/:id", verifyToken, userController.remove);

module.exports = { userRouter };
