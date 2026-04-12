const authService = require('../services/auth.service');

exports.register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const authData = await authService.login(email, password);
    res.status(200).json({
      message: 'Connexion réussie',
      ...authData
    });
  } catch (error) {
    next(error);
  }
};
