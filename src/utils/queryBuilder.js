/**
 * Query Builder Utility
 * Handles pagination, sorting, filtering for Prisma PostgreSQL queries
 */

const buildQuery = (queryParams) => {
  const {
    page = 1,
    limit = 10,
    sort = '-createdAt',
    search,
    department,
    semester,
    minAge,
    maxAge,
    isActive,
    ...rest
  } = queryParams;

  // Pagination
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
  const skip = (pageNum - 1) * limitNum;

  // Filter object (Prisma where)
  const filter = {};

  // Text search
  if (search) {
    filter.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { department: { contains: search, mode: 'insensitive' } },
    ];
  }

  // Department filter
  if (department) {
    filter.department = department;
  }

  // Semester filter
  if (semester) {
    filter.semester = parseInt(semester);
  }

  // Age range filter
  if (minAge || maxAge) {
    filter.age = {};
    if (minAge) filter.age.gte = parseInt(minAge);
    if (maxAge) filter.age.lte = parseInt(maxAge);
  }

  // isActive filter
  if (isActive !== undefined) {
    filter.isActive = isActive === 'true';
  }

  // Sort string: e.g. "name" → ascending, "-name" → descending
  const sortObj = {};
  const sortFields = sort.split(',');
  sortFields.forEach((field) => {
    if (field.startsWith('-')) {
      sortObj[field.slice(1)] = 'desc';
    } else {
      sortObj[field] = 'asc';
    }
  });

  return { filter, skip, limit: limitNum, page: pageNum, sort: sortObj };
};

const buildPaginationMeta = (total, page, limit) => ({
  total,
  page,
  limit,
  totalPages: Math.ceil(total / limit),
  hasNextPage: page < Math.ceil(total / limit),
  hasPrevPage: page > 1,
});

module.exports = { buildQuery, buildPaginationMeta };
