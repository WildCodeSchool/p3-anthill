const { Router } = require("express");
const userController = require("../controllers/user.controller");

const userRouter = new Router();

userRouter.get("/", userController.list);
userRouter.post("/", userController.create);
userRouter.get("/:id", userController.get);
userRouter.get("/:id/badges", userController.getBadgesForOneUser);
userRouter.put("/:id", userController.update);
userRouter.delete("/:id", userController.remove);

module.exports = { userRouter };
