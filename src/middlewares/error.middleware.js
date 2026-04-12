const errorHandler = (err, req, res, next) => {
  console.error(err);

  // permet de gérer les erreurs de type "unique constraint violation" de Prisma, qui sont courantes lors de la création ou de la mise à jour d'enregistrements avec des champs uniques.
  if (err.code === 'P2002') {
    return res.status(400).json({
      message: `La valeur du champ de type unique existe déjà: ${err.meta.target}`,
      error: 'Conflict'
    });
  }

  // permet de gérer les erreurs de type "record not found" de Prisma, qui sont courantes lors de la suppression ou de la mise à jour d'enregistrements inexistants.
  if (err.code === 'P2025') {
    return res.status(404).json({
      message: "Enregistrement non trouvé.",
      error: 'Not Found'
    });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Erreur Interne du Serveur',
    error: err.name || 'InternalServerError',
  });
};

module.exports = errorHandler;
