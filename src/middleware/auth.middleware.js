const { verifyToken } = require('../utils/jwtHelper');
const prisma = require('../config/database');
const AppError = require('../utils/AppError');

/**
 * Protect routes - Verify JWT token
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Access denied. No token provided.', 401));
    }

    // Verify token
    const decoded = verifyToken(token);

    // Check if user still exists
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return next(new AppError('User belonging to this token no longer exists.', 401));
    }

    delete user.password;
    user._id = user.id;

    // Check if user is active
    if (!user.isActive) {
      return next(new AppError('Your account has been deactivated. Contact admin.', 403));
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token. Please login again.', 401));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Token expired. Please login again.', 401));
    }
    next(error);
  }
};

/**
 * Role-based access control middleware
 * @param {...string} roles - Allowed roles
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Authentication required.', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          `Access forbidden. Role '${req.user.role}' is not authorized for this action.`,
          403
        )
      );
    }

    next();
  };
};

module.exports = { protect, authorize };
