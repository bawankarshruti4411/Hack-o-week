/**
 * Standardized API Response Utility
 */

class ApiResponse {
  /**
   * Send success response
   */
  static success(res, { statusCode = 200, message = 'Success', data = null, meta = null } = {}) {
    const response = {
      success: true,
      message,
    };

    if (data !== null) response.data = data;
    if (meta !== null) response.meta = meta;

    return res.status(statusCode).json(response);
  }

  /**
   * Send error response
   */
  static error(res, { statusCode = 500, message = 'Internal Server Error', errors = null } = {}) {
    const response = {
      success: false,
      message,
    };

    if (errors !== null) response.errors = errors;

    return res.status(statusCode).json(response);
  }

  /**
   * Send paginated response
   */
  static paginated(res, { message = 'Data fetched successfully', data, pagination }) {
    return res.status(200).json({
      success: true,
      message,
      data,
      pagination,
    });
  }
}

module.exports = ApiResponse;
