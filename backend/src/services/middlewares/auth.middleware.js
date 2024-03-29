const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const authModel = require("../../models/auth.model");
const userModel = require("../../models/user.model");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  if (!req.body?.password) {
    res.sendStatus(400);
    return;
  }

  argon2
    .hash(req.body.password, hashingOptions)
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
  if (!req.body.email) {
    res.sendStatus(400);
    return;
  }

  const user = await authModel.getUserByEmailWithPassword(req.body.email);
  if (user) {
    req.user = user;
    next();
  } else {
    res.sendStatus(400);
  }
}

async function verifyToken(req, res, next) {
  try {
    const authorizationHeader = req.get("Authorization");
    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");
    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    const { sub } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.getCurrentUser(sub);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;

    next();
  } catch (err) {
    console.error(err);
    res.send(err);
  }
}

module.exports = {
  hashPassword,
  getUserByEmailWithPassword,
  verifyToken,
};
