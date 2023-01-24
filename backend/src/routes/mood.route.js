const { Router } = require("express");
const moodController = require("../controllers/mood.controller");
const { verifyToken } = require("../controllers/auth.controller");

const moodRouter = new Router();

moodRouter.use(verifyToken);

moodRouter.get("/", moodController.list);
moodRouter.get("/:id", moodController.get);

moodRouter.post("/", moodController.create);

moodRouter.put("/:id", moodController.update);

moodRouter.delete("/:id", moodController.remove);

module.exports = { moodRouter };
