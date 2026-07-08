const authService = require('../services/auth.service');
const ApiResponse = require('../utils/apiResponse');

class AuthController {
  /**
   * @route   POST /api/v1/auth/register
   * @desc    Register a new user
   * @access  Public
   */
  async register(req, res, next) {
    try {
      const { name, email, password, role } = req.body;
      const { user, token } = await authService.register({ name, email, password, role });

      return ApiResponse.success(res, {
        statusCode: 201,
        message: 'Account created successfully',
        data: { user, token },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @route   POST /api/v1/auth/login
   * @desc    Login user and return token
   * @access  Public
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.login({ email, password });

      return ApiResponse.success(res, {
        statusCode: 200,
        message: 'Login successful',
        data: { user, token },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @route   POST /api/v1/auth/logout
   * @desc    Logout user (client should discard token)
   * @access  Private
   */
  async logout(req, res, next) {
    try {
      return ApiResponse.success(res, {
        statusCode: 200,
        message: 'Logged out successfully. Please discard your token.',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @route   GET /api/v1/auth/me
   * @desc    Get current logged in user profile
   * @access  Private
   */
  async getMe(req, res, next) {
    try {
      const user = await authService.getProfile(req.user._id);

      return ApiResponse.success(res, {
        message: 'Profile fetched successfully',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @route   PUT /api/v1/auth/change-password
   * @desc    Change current user's password
   * @access  Private
   */
  async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      await authService.changePassword(req.user._id, { currentPassword, newPassword });

      return ApiResponse.success(res, {
        message: 'Password changed successfully. Please login with your new password.',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
