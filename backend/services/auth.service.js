const argon2 = require("argon2");
const userModel = require("../src/models/auth.model");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.hashedPassword, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

async function getUserByEmailWithPassword(req, res, next) {
  const user = await userModel.getUserByEmailWithPassword(req.body.email);
  if (user) {
    req.user = user;
    next();
  } else {
    res.sendStatus(400);
  }
}

module.exports = {
  hashPassword,
  getUserByEmailWithPassword,
};
