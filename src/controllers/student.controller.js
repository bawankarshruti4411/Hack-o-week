const studentService = require('../services/student.service');
const ApiResponse = require('../utils/apiResponse');

class StudentController {
  /**
   * @route   POST /api/v1/students
   * @desc    Create a new student
   * @access  Private (Admin only)
   */
  async createStudent(req, res, next) {
    try {
      const student = await studentService.createStudent(req.body, req.user._id);

      return ApiResponse.success(res, {
        statusCode: 201,
        message: 'Student created successfully',
        data: { student },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @route   GET /api/v1/students
   * @desc    Get all students with pagination, sorting, filtering, search
   * @access  Private (Admin, Student)
   */
  async getAllStudents(req, res, next) {
    try {
      const { students, pagination } = await studentService.getAllStudents(req.query);

      return ApiResponse.paginated(res, {
        message: 'Students fetched successfully',
        data: students,
        pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @route   GET /api/v1/students/:id
   * @desc    Get single student by ID
   * @access  Private (Admin, Student)
   */
  async getStudentById(req, res, next) {
    try {
      const student = await studentService.getStudentById(req.params.id);

      return ApiResponse.success(res, {
        message: 'Student fetched successfully',
        data: { student },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @route   PUT /api/v1/students/:id
   * @desc    Update a student
   * @access  Private (Admin only)
   */
  async updateStudent(req, res, next) {
    try {
      const student = await studentService.updateStudent(
        req.params.id,
        req.body,
        req.user.role
      );

      return ApiResponse.success(res, {
        message: 'Student updated successfully',
        data: { student },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @route   DELETE /api/v1/students/:id
   * @desc    Delete a student
   * @access  Private (Admin only)
   */
  async deleteStudent(req, res, next) {
    try {
      await studentService.deleteStudent(req.params.id);

      return ApiResponse.success(res, {
        message: 'Student deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @route   GET /api/v1/students/stats/departments
   * @desc    Get department-wise student statistics
   * @access  Private (Admin only)
   */
  async getDepartmentStats(req, res, next) {
    try {
      const stats = await studentService.getDepartmentStats();

      return ApiResponse.success(res, {
        message: 'Department statistics fetched successfully',
        data: { stats },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StudentController();
