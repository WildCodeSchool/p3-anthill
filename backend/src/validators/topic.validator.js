const Joi = require("joi");

const userSchema = Joi.object({
  title: Joi.string().max(255).required(),
  description: Joi.string().max(500).required(),
  deadline: Joi.string().max(255).required(),
});

const validateCreateTopic = (req, res, next) => {
  const { title, description, deadline } = req.body;

  const { error } = userSchema.validate(
    { title, description, deadline },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = { validateCreateTopic };
