const { body, param, query } = require('express-validator');

const DEPARTMENTS = [
  'Computer Science',
  'Information Technology',
  'Electronics',
  'Mechanical',
  'Civil',
  'Electrical',
  'Chemical',
  'Biotechnology',
  'MBA',
  'MCA',
];

const createStudentValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[6-9]\d{9}$/).withMessage('Please provide a valid 10-digit Indian phone number'),

  body('age')
    .notEmpty().withMessage('Age is required')
    .isInt({ min: 15, max: 35 }).withMessage('Age must be between 15 and 35'),

  body('department')
    .trim()
    .notEmpty().withMessage('Department is required')
    .isIn(DEPARTMENTS).withMessage(`Department must be one of: ${DEPARTMENTS.join(', ')}`),

  body('semester')
    .notEmpty().withMessage('Semester is required')
    .isInt({ min: 1, max: 8 }).withMessage('Semester must be between 1 and 8'),

  body('address.street').optional().trim(),
  body('address.city').optional().trim(),
  body('address.state').optional().trim(),
  body('address.pincode')
    .optional()
    .trim()
    .matches(/^\d{6}$/).withMessage('Pincode must be 6 digits'),
  body('address.country').optional().trim(),
];

const updateStudentValidator = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('phone')
    .optional()
    .trim()
    .matches(/^[6-9]\d{9}$/).withMessage('Please provide a valid 10-digit Indian phone number'),

  body('age')
    .optional()
    .isInt({ min: 15, max: 35 }).withMessage('Age must be between 15 and 35'),

  body('department')
    .optional()
    .trim()
    .isIn(DEPARTMENTS).withMessage(`Department must be one of: ${DEPARTMENTS.join(', ')}`),

  body('semester')
    .optional()
    .isInt({ min: 1, max: 8 }).withMessage('Semester must be between 1 and 8'),

  body('address.street').optional().trim(),
  body('address.city').optional().trim(),
  body('address.state').optional().trim(),
  body('address.pincode')
    .optional()
    .trim()
    .matches(/^\d{6}$/).withMessage('Pincode must be 6 digits'),
];

const studentIdValidator = [
  param('id')
    .isMongoId().withMessage('Invalid student ID format'),
];

const listStudentsValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),

  query('semester')
    .optional()
    .isInt({ min: 1, max: 8 }).withMessage('Semester must be between 1 and 8'),

  query('minAge')
    .optional()
    .isInt({ min: 15 }).withMessage('minAge must be at least 15'),

  query('maxAge')
    .optional()
    .isInt({ max: 35 }).withMessage('maxAge cannot exceed 35'),
];

module.exports = {
  createStudentValidator,
  updateStudentValidator,
  studentIdValidator,
  listStudentsValidator,
};
