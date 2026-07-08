/**
 * Custom Application Error Class
 * Extends native Error with HTTP status code support
 */
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Distinguishes from programming errors

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
