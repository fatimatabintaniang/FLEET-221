const Joi = require('joi');

const createMissionSchema = Joi.object({
  chauffeurId: Joi.number().integer().required().messages({
    'any.required': 'L\'ID du chauffeur est obligatoire.'
  }),
  vehiculeId: Joi.number().integer().required().messages({
    'any.required': 'L\'ID du véhicule est obligatoire.'
  }),
  destination: Joi.string().required().messages({
    'any.required': 'La destination est obligatoire.',
    'string.empty': 'La destination est requise.'
  }),
  dateDepart: Joi.date().iso().min('now').required().messages({
    'date.base': 'La date de départ doit être une date valide.',
    'date.min': 'La date de départ doit être supérieure ou égale à aujourd\'hui.',
    'any.required': 'La date de départ est obligatoire.'
  }),

  dateRetour: Joi.date().iso().greater(Joi.ref('dateDepart')).required().messages({
    'date.base': 'La date de retour doit être une date valide.',
    'date.greater': 'La date de retour doit être strictement supérieure à la date de départ.',
    'any.required': 'La date de retour est obligatoire.'
  })
});

module.exports = {
  createMissionSchema
};
