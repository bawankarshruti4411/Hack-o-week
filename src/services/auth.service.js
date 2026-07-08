const prisma = require('../config/database');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { generateToken } = require('../utils/jwtHelper');
const AppError = require('../utils/AppError');

// Helper to generate 24-char hex string (simulates Mongo ObjectId)
const generateObjectId = () => crypto.randomBytes(12).toString('hex');

// Helper to format user for output
const formatUser = (user) => {
  if (!user) return null;
  const formatted = { ...user, _id: user.id };
  delete formatted.id;
  delete formatted.password;
  return formatted;
};

class AuthService {
  /**
   * Register a new user
   */
  async register({ name, email, password, role }) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (existingUser) {
      throw new AppError('Email already registered. Please use a different email or login.', 409);
    }

    // Generate custom 24-character hex ID (Mongo ObjectId)
    const id = generateObjectId();

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        id,
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: role || 'student',
      },
    });

    // Generate token
    const token = generateToken({ id: user.id, role: user.role });

    return { user: formatUser(user), token };
  }

  /**
   * Login user
   */
  async login({ email, password }) {
    // Find user with password field
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      throw new AppError('Invalid email or password.', 401);
    }

    // Check if account is active
    if (!user.isActive) {
      throw new AppError('Your account has been deactivated. Please contact admin.', 403);
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password.', 401);
    }

    // Update last login
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Generate token
    const token = generateToken({ id: updatedUser.id, role: updatedUser.role });

    return { user: formatUser(updatedUser), token };
  }

  /**
   * Get user profile
   */
  async getProfile(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new AppError('User not found.', 404);
    }
    return formatUser(user);
  }

  /**
   * Change password
   */
  async changePassword(userId, { currentPassword, newPassword }) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new AppError('Current password is incorrect.', 400);
    }

    // Hash new password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return true;
  }
}

module.exports = new AuthService();
