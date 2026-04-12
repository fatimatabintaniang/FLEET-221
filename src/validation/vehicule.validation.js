const Joi = require('joi');

const createVehiculeSchema = Joi.object({
  immatriculation: Joi.string().required().messages({
    'string.empty': 'L\'immatriculation est requise.',
    'any.required': 'L\'immatriculation est obligatoire.',
  }),
  marque: Joi.string().required().messages({
    'string.empty': 'La marque est requise.',
    'any.required': 'La marque est obligatoire.',
  }),
  modele: Joi.string().required().messages({
    'string.empty': 'Le modèle est requis.',
    'any.required': 'Le modèle est obligatoire.',
  }),
  kilometrage: Joi.number().integer().min(0).optional().messages({
    'number.base': 'Le kilométrage doit être un nombre.',
    'number.integer': 'Le kilométrage doit être un entier.',
    'number.min': 'Le kilométrage doit être au moins de 0.',
  })
});

module.exports = {
  createVehiculeSchema
};
