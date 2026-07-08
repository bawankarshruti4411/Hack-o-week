const prisma = require('../config/database');
const crypto = require('crypto');
const AppError = require('../utils/AppError');
const { buildQuery, buildPaginationMeta } = require('../utils/queryBuilder');

// Helper to format user for output
const formatUser = (user) => {
  if (!user) return null;
  const formatted = { ...user, _id: user.id };
  delete formatted.id;
  delete formatted.password;
  return formatted;
};

// Helper to format student for output
const formatStudent = (student) => {
  if (!student) return null;
  const formatted = { ...student, _id: student.id };
  delete formatted.id;

  if (student.creator) {
    formatted.createdBy = formatUser(student.creator);
    delete formatted.creator;
  } else if (student.createdBy) {
    // If createdBy is populated or a string, keep it as is
  }

  return formatted;
};

class StudentService {
  /**
   * Create a new student
   */
  async createStudent(data, userId) {
    const existing = await prisma.student.findUnique({
      where: { email: data.email.toLowerCase() },
    });
    if (existing) {
      throw new AppError(`Student with email '${data.email}' already exists.`, 409);
    }

    const id = crypto.randomBytes(12).toString('hex');
    const student = await prisma.student.create({
      data: {
        id,
        name: data.name,
        email: data.email.toLowerCase(),
        phone: data.phone,
        age: parseInt(data.age),
        department: data.department,
        semester: parseInt(data.semester),
        address: data.address || {},
        createdBy: userId,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });

    return formatStudent(student);
  }

  /**
   * Get all students with pagination, sorting, filtering, and search
   */
  async getAllStudents(queryParams) {
    const { filter, skip, limit, page, sort } = buildQuery(queryParams);

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where: filter,
        orderBy: sort,
        skip,
        take: limit,
        include: {
          creator: true,
        },
      }),
      prisma.student.count({ where: filter }),
    ]);

    const pagination = buildPaginationMeta(total, page, limit);

    return {
      students: students.map(formatStudent),
      pagination,
    };
  }

  /**
   * Get a single student by ID
   */
  async getStudentById(id) {
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        creator: true,
      },
    });
    if (!student) {
      throw new AppError(`Student with ID '${id}' not found.`, 404);
    }
    return formatStudent(student);
  }

  /**
   * Update a student
   */
  async updateStudent(id, data, userRole) {
    // Check student exists
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) {
      throw new AppError(`Student with ID '${id}' not found.`, 404);
    }

    // Check email uniqueness if being changed
    if (data.email && data.email.toLowerCase() !== student.email) {
      const emailExists = await prisma.student.findFirst({
        where: {
          email: data.email.toLowerCase(),
          id: { not: id },
        },
      });
      if (emailExists) {
        throw new AppError(`Email '${data.email}' is already in use by another student.`, 409);
      }
    }

    // Build update data
    const updateData = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email.toLowerCase();
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.age !== undefined) updateData.age = parseInt(data.age);
    if (data.department !== undefined) updateData.department = data.department;
    if (data.semester !== undefined) updateData.semester = parseInt(data.semester);
    if (data.address !== undefined) updateData.address = data.address;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    const updatedStudent = await prisma.student.update({
      where: { id },
      data: updateData,
      include: {
        creator: true,
      },
    });

    return formatStudent(updatedStudent);
  }

  /**
   * Delete a student (soft delete by default, hard delete for admin)
   */
  async deleteStudent(id) {
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) {
      throw new AppError(`Student with ID '${id}' not found.`, 404);
    }

    await prisma.student.delete({ where: { id } });
    return true;
  }

  /**
   * Get department-wise statistics
   */
  async getDepartmentStats() {
    const stats = await prisma.$queryRaw`
      SELECT 
        department, 
        COUNT(*)::int AS "totalStudents", 
        ROUND(AVG(age)::numeric, 1)::float AS "avgAge", 
        ARRAY_AGG(DISTINCT semester) AS semesters
      FROM "Student"
      WHERE "isActive" = true
      GROUP BY department
      ORDER BY "totalStudents" DESC
    `;

    return stats;
  }
}

module.exports = new StudentService();
