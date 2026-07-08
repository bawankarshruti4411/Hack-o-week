const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student Management REST API',
      version: '1.0.0',
      description: `
## Student Management REST API

A production-ready REST API built with **Node.js**, **Express.js**, and **PostgreSQL (via Prisma)**.

### Features
- 🔐 JWT Authentication with Role-Based Access Control
- 👥 Roles: \`admin\` and \`student\`
- 📚 Full Student CRUD operations
- 🔍 Search, Filter, Sort, and Pagination
- ✅ Input validation with express-validator
- 🛡️ Security: Helmet, CORS, Rate Limiting

### Authentication
All protected endpoints require a **Bearer Token** in the Authorization header.

\`\`\`
Authorization: Bearer <your_jwt_token>
\`\`\`

Get a token by calling \`POST /api/v1/auth/login\` or \`POST /api/v1/auth/register\`.
      `,
      contact: {
        name: 'API Support',
        email: 'support@studentapi.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Development Server',
      },
      {
        url: 'https://your-production-domain.com/api/v1',
        description: 'Production Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '665f1a2b3c4d5e6f7a8b9c0d' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            role: { type: 'string', enum: ['admin', 'student'], example: 'student' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Student: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '665f1a2b3c4d5e6f7a8b9c0d' },
            name: { type: 'string', example: 'Rahul Sharma' },
            email: { type: 'string', example: 'rahul@example.com' },
            phone: { type: 'string', example: '9876543210' },
            age: { type: 'integer', example: 20 },
            department: {
              type: 'string',
              enum: [
                'Computer Science', 'Information Technology', 'Electronics',
                'Mechanical', 'Civil', 'Electrical', 'Chemical', 'Biotechnology', 'MBA', 'MCA',
              ],
              example: 'Computer Science',
            },
            semester: { type: 'integer', minimum: 1, maximum: 8, example: 4 },
            address: {
              type: 'object',
              properties: {
                street: { type: 'string', example: '123 Main Street' },
                city: { type: 'string', example: 'Nagpur' },
                state: { type: 'string', example: 'Maharashtra' },
                pincode: { type: 'string', example: '440001' },
                country: { type: 'string', example: 'India' },
              },
            },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        CreateStudent: {
          type: 'object',
          required: ['name', 'email', 'phone', 'age', 'department', 'semester'],
          properties: {
            name: { type: 'string', example: 'Rahul Sharma' },
            email: { type: 'string', example: 'rahul@example.com' },
            phone: { type: 'string', example: '9876543210' },
            age: { type: 'integer', example: 20 },
            department: { type: 'string', example: 'Computer Science' },
            semester: { type: 'integer', example: 4 },
            address: {
              type: 'object',
              properties: {
                street: { type: 'string', example: '123 Main St' },
                city: { type: 'string', example: 'Nagpur' },
                state: { type: 'string', example: 'Maharashtra' },
                pincode: { type: 'string', example: '440001' },
                country: { type: 'string', example: 'India' },
              },
            },
          },
        },
        UpdateStudent: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Rahul Sharma Updated' },
            phone: { type: 'string', example: '9999999999' },
            age: { type: 'integer', example: 21 },
            department: { type: 'string', example: 'Information Technology' },
            semester: { type: 'integer', example: 5 },
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: { type: 'object' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message' },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        PaginatedResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string' },
            data: { type: 'array', items: { $ref: '#/components/schemas/Student' } },
            pagination: {
              type: 'object',
              properties: {
                total: { type: 'integer', example: 100 },
                page: { type: 'integer', example: 1 },
                limit: { type: 'integer', example: 10 },
                totalPages: { type: 'integer', example: 10 },
                hasNextPage: { type: 'boolean', example: true },
                hasPrevPage: { type: 'boolean', example: false },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  // Swagger UI
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customSiteTitle: 'Student API Docs',
      customCss: '.swagger-ui .topbar { display: none }',
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
      },
    })
  );

  // Raw JSON spec
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log('📄 Swagger docs available at http://localhost:5000/api-docs');
};

module.exports = setupSwagger;
