const { Router } = require("express");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
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
userRouter.patch("/:id/picture", upload.single("picture"), (req, res) => {
  const { originalname } = req.file;
  const { filename } = req.file;
  fs.rename(
    `public/uploads/${filename}`,
    `public/uploads/${uuidv4()}-${originalname}`,
    (err) => {
      if (err) throw err;
      res.send("File uploaded");
    }
  );
});

userRouter.delete("/:id", userController.remove);

module.exports = { userRouter };
