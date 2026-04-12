const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/auth.repository');
const { JWT_SECRET } = require('../config/env.config');
const AppError = require('../utils/AppError');

class AuthService {
  async register(data) {
    const { email, password, prenom, nom } = data;

    const userExists = await authRepository.findUserByEmail(email);
    if (userExists) {
      throw new AppError('Cet email est déjà utilisé', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await authRepository.create({
      email,
      password: hashedPassword,
      prenom,
      nom
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(email, password) {
    const user = await authRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError('Identifiants invalides', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new AppError('Identifiants invalides', 401);
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { token, userId: user.id };
  }
}

module.exports = new AuthService();
