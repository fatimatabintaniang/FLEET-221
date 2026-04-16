// cette classe d'erreur personnalisée permet de centraliser la gestion des erreurs dans l'application. 
// Elle étend la classe native Error de JavaScript et ajoute une propriété statusCode pour faciliter la gestion des réponses d'erreur dans les contrôleurs et les middlewares.
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
