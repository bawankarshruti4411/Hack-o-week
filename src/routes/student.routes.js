const express = require('express');
const router = express.Router();

const studentController = require('../controllers/student.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const {
  createStudentValidator,
  updateStudentValidator,
  studentIdValidator,
  listStudentsValidator,
} = require('../validators/student.validator');

// All routes require authentication
router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management CRUD operations
 */

/**
 * @swagger
 * /students/stats/departments:
 *   get:
 *     summary: Get department-wise statistics (Admin only)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics fetched successfully
 */
router.get(
  '/stats/departments',
  authorize('admin'),
  studentController.getDepartmentStats
);

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students (with pagination, sorting, filtering, search)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: sort
 *         schema: { type: string, default: "-createdAt" }
 *         description: "Sort field. Prefix with - for descending. e.g. name, -age"
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Search by name, email, or department
 *       - in: query
 *         name: department
 *         schema: { type: string }
 *       - in: query
 *         name: semester
 *         schema: { type: integer }
 *       - in: query
 *         name: minAge
 *         schema: { type: integer }
 *       - in: query
 *         name: maxAge
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Students fetched successfully
 */
router.get('/', listStudentsValidator, validate, studentController.getAllStudents);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student (Admin only)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateStudent'
 *     responses:
 *       201:
 *         description: Student created successfully
 *       409:
 *         description: Student with email already exists
 *       422:
 *         description: Validation error
 */
router.post(
  '/',
  authorize('admin'),
  createStudentValidator,
  validate,
  studentController.createStudent
);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Student fetched successfully
 *       404:
 *         description: Student not found
 */
router.get(
  '/:id',
  studentIdValidator,
  validate,
  studentController.getStudentById
);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update student by ID (Admin only)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStudent'
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       404:
 *         description: Student not found
 */
router.put(
  '/:id',
  authorize('admin'),
  studentIdValidator,
  updateStudentValidator,
  validate,
  studentController.updateStudent
);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete student by ID (Admin only)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 */
router.delete(
  '/:id',
  authorize('admin'),
  studentIdValidator,
  validate,
  studentController.deleteStudent
);

module.exports = router;
