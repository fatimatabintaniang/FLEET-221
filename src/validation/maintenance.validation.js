const Joi = require('joi');

const createMaintenanceSchema = Joi.object({
  vehiculeId: Joi.number().integer().required().messages({
    'any.required': 'L\'ID du véhicule est obligatoire.'
  }),
  type: Joi.string().required().messages({
    'any.required': 'Le type de maintenance est obligatoire.',
    'string.empty': 'Le type de maintenance est requis.'
  }),
  date: Joi.date().iso().max('now').required().messages({
    'date.base': 'La date doit être une date valide.',
    'date.max': 'La date doit être inférieure ou égale à aujourd\'hui.',
    'any.required': 'La date est obligatoire.'
  }),
  cout: Joi.number().min(0).optional().messages({
    'number.base': 'Le coût doit être un nombre.',
    'number.min': 'Le coût doit être supérieur ou égal à 0.'
  }),
  description: Joi.string().optional().allow('')
});

module.exports = {
  createMaintenanceSchema
};
