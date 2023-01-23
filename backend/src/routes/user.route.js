const { Router } = require("express");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const userController = require("../controllers/user.controller");
const badgeController = require("../controllers/badge.controller");
const topicController = require("../controllers/topic.controller");

const upload = multer({ dest: "uploads/" });

const userRouter = new Router();

userRouter.get("/", userController.list);
userRouter.get("/:id", userController.get);
userRouter.get("/:id/badges", badgeController.getUserBadges);

userRouter.post("/", userController.create);

userRouter.patch("/:id", userController.update);
userRouter.patch("/:id/picture", upload.single("picture"), (req, res) => {
  res.send("File uploaded");
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

userRouter.delete("/:id", userController.remove);

userRouter.get("/:id/badges", badgeController.getUserBadges);

userRouter.get("/:id/topics", topicController.getUserTopics);

module.exports = { userRouter };
