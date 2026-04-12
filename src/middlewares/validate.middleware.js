const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({
      message: 'Erreur de validation',
      errors: errorMessages,
    });
  }

  req.body = value;
  next();
};

module.exports = validate;
