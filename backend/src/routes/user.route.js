const { Router } = require("express");
const multer = require("multer");

const userController = require("../controllers/user.controller");
const badgeController = require("../controllers/badge.controller");
const topicController = require("../controllers/topic.controller");
const authController = require("../controllers/auth.controller");
const {
  hashPassword,
  getUserByEmailWithPassword,
  verifyToken,
} = require("../services/middlewares/auth.middleware");

const upload = multer({ dest: "public/uploads/" });

const userRouter = new Router();

userRouter.get("/", verifyToken, userController.list);
userRouter.get("/currentUser", verifyToken, userController.getCurrentUser);
userRouter.get("/:id", verifyToken, userController.get);
userRouter.get("/email/:email", userController.getOneByEmail);
userRouter.get("/:id/badges", verifyToken, badgeController.getUserBadges);
userRouter.get("/:id/topics", verifyToken, topicController.getUserTopics);

userRouter.post("/signupgoogle", userController.create);
userRouter.post("/signup", hashPassword, userController.create);
userRouter.post("/login", getUserByEmailWithPassword, authController.login);
userRouter.post(
  "/:id/picture",
  verifyToken,
  upload.single("picture"),
  userController.updatePicture
);

userRouter.patch("/:id", verifyToken, userController.update);

userRouter.delete("/:id", verifyToken, userController.remove);

module.exports = { userRouter };
