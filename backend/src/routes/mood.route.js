const { Router } = require("express");
const moodController = require("../controllers/mood.controller");

const moodRouter = new Router();

moodRouter.get("/", moodController.list);
moodRouter.post("/", moodController.create);
moodRouter.get("/:id", moodController.get);
moodRouter.put("/:id", moodController.update);
moodRouter.delete("/:id", moodController.remove);

module.exports = { moodRouter };
