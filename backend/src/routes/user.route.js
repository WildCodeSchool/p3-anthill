const { Router } = require("express");
const multer = require("multer");

const userController = require("../controllers/user.controller");
const badgeController = require("../controllers/badge.controller");
const topicController = require("../controllers/topic.controller");
const { login } = require("../controllers/auth.controller");
const {
  hashPassword,
  getUserByEmailWithPassword,
} = require("../../services/auth.service");

const upload = multer({ dest: "public/uploads/" });

const userRouter = new Router();

userRouter.get("/", userController.list);
userRouter.get("/:id", userController.get);
userRouter.get("/email/:email", userController.getOneByEmail);
userRouter.get("/:id/badges", badgeController.getUserBadges);
userRouter.get("/:id/topics", topicController.getUserTopics);

userRouter.post("/signupgoogle", userController.create);
userRouter.post("/signup", hashPassword, userController.create);
userRouter.post("/login", getUserByEmailWithPassword, login);

userRouter.patch("/:id", userController.updateAudrey);
userRouter.patch(
  "/:id/picture",
  upload.single("picture"),
  userController.updatePicture
);

userRouter.delete("/:id", userController.remove);

module.exports = { userRouter };
