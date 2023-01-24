const { Router } = require("express");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const userController = require("../controllers/user.controller");
const badgeController = require("../controllers/badge.controller");
const topicController = require("../controllers/topic.controller");
const {
  login,
  hashPassword,
  getUserByEmailWithPassword,
  verifyToken,
} = require("../controllers/auth.controller");

const upload = multer({ dest: "uploads/" });

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

userRouter.patch("/:id", userController.updateAudrey);
userRouter.patch("/:id/picture", upload.single("picture"), (req, res) => {
  const { originalname } = req.file;
  const { filename } = req.file;
  fs.rename(
    `uploads/${filename}`,
    `uploads/${uuidv4()}-${originalname}`,
    (err) => {
      if (err) throw err;
      res.send("File uploaded");
    }
  );
});

userRouter.delete("/:id", verifyToken, userController.remove);

module.exports = { userRouter };
