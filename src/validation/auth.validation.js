const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'L\'email doit être valide.',
    'any.required': 'L\'email est obligatoire.'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Le mot de passe doit contenir au moins 6 caractères.',
    'any.required': 'Le mot de passe est obligatoire.'
  }),
  prenom: Joi.string().required(),
  nom: Joi.string().required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'L\'email est obligatoire.'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Le mot de passe est obligatoire.'
  })
});

module.exports = {
  registerSchema,
  loginSchema
};
