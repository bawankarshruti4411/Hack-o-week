const AppError = require('../utils/AppError');

/**
 * Handle Database CastError (invalid ID)
 */
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

/**
 * Handle Database Duplicate Key Error
 */
const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = `Duplicate value '${value}' for field '${field}'. Please use a different value.`;
  return new AppError(message, 409);
};

/**
 * Handle Database Validation Error
 */
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => ({
    field: el.path,
    message: el.message,
  }));
  return new AppError('Validation failed', 422, errors);
};

/**
 * Handle Prisma Errors
 */
const handlePrismaError = (err) => {
  if (err.code === 'P2002') {
    const field = err.meta && err.meta.target ? err.meta.target.join(', ') : 'field';
    const message = `Duplicate value for field '${field}'. Please use a different value.`;
    return new AppError(message, 409);
  }
  if (err.code === 'P2025') {
    const message = err.meta && err.meta.cause ? err.meta.cause : 'Record not found';
    return new AppError(message, 404);
  }
  return new AppError(err.message, 400);
};

/**
 * Handle JWT Errors
 */
const handleJWTError = () => new AppError('Invalid token. Please login again.', 401);
const handleJWTExpiredError = () => new AppError('Token expired. Please login again.', 401);

/**
 * Send error in development (detailed)
 */
const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

/**
 * Send error in production (clean)
 */
const sendErrorProd = (err, res) => {
  // Operational / trusted errors: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    });
  }

  // Programming or unknown errors: don't leak details
  console.error('UNHANDLED ERROR 💥', err);
  return res.status(500).json({
    success: false,
    message: 'Something went wrong. Please try again later.',
  });
};

/**
 * Global Error Handling Middleware
 */
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err, message: err.message };

    if (err.name === 'CastError') error = handleCastError(err);
    if (err.code === 11000) error = handleDuplicateKeyError(err);
    if (err.name === 'ValidationError') error = handleValidationError(err);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();
    if (err.code && typeof err.code === 'string' && err.code.startsWith('P')) error = handlePrismaError(err);

    sendErrorProd(error, res);
  }
};

/**
 * Handle 404 - Route Not Found
 */
const notFound = (req, res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

module.exports = { globalErrorHandler, notFound };
