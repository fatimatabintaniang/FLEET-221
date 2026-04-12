const Joi = require('joi');

const createChauffeurSchema = Joi.object({
  prenom: Joi.string().min(2).required().messages({
    'string.min': 'Le prénom doit avoir au moins 2 caractères.',
    'any.required': 'Le prénom est obligatoire.'
  }),
  nom: Joi.string().min(2).required().messages({
    'string.min': 'Le nom doit avoir au moins 2 caractères.',
    'any.required': 'Le nom est obligatoire.'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'L\'email doit être valide.',
    'any.required': 'L\'email est obligatoire.'
  }),
  numPermis: Joi.string().required().messages({
    'any.required': 'Le numéro de permis est obligatoire.',
    'string.empty': 'Le numéro de permis est requis.'
  }),
  telephone: Joi.string()
    .pattern(/^\+221(76|77|78|71)\d{7}$/)
    .required()
    .messages({
      'any.required': 'Le téléphone est obligatoire.',
      'string.empty': 'Le téléphone est requis.',
      'string.pattern.base':
        'Le téléphone doit être un numéro sénégalais valide (ex: +221761234567). Les préfixes autorisés sont : 76, 77, 78, 71.'
    })
});

module.exports = {
  createChauffeurSchema
};
