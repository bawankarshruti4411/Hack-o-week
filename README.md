# 🎓 Student Management REST API

A production-ready REST API for managing students, built with **Node.js**, **Express.js**, **PostgreSQL**, and **Prisma ORM**.

---

## 📌 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (v18+) |
| Framework | Express.js |
| Database | PostgreSQL + Prisma ORM |
| Auth | JWT + bcryptjs |
| Validation | express-validator |
| Security | Helmet, CORS, Rate Limiting |
| Logging | Morgan |
| Docs | Swagger (OpenAPI 3.0) |

---

## 📁 Folder Structure

```
student-api/
├── prisma/
│   ├── schema.prisma            # Prisma schema (PostgreSQL)
│   └── migrations/              # Database migration logs
├── src/
│   ├── config/
│   │   └── database.js          # Prisma Client setup
│   ├── controllers/
│   │   ├── auth.controller.js   # Auth logic
│   │   └── student.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js   # JWT + Role middleware
│   │   ├── error.middleware.js  # Global error handler
│   │   └── validate.middleware.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── student.routes.js
│   │   └── index.js
│   ├── services/
│   │   ├── auth.service.js      # Business logic
│   │   └── student.service.js
│   ├── validators/
│   │   ├── auth.validator.js
│   │   └── student.validator.js
│   ├── utils/
│   │   ├── apiResponse.js       # Standardized responses
│   │   ├── AppError.js          # Custom error class
│   │   ├── jwtHelper.js         # JWT utilities
│   │   └── queryBuilder.js      # Pagination/filter helper
│   ├── docs/
│   │   └── swagger.js           # Swagger config
│   ├── app.js                   # Express app setup
│   └── server.js                # Entry point
├── prisma.config.ts             # Prisma environment config
├── .env.example
├── .env
├── .gitignore
├── package.json
├── StudentManagementAPI.postman_collection.json
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- PostgreSQL (local or cloud-hosted like Neon)
- Git

---

### Step 1 — Clone or Create Project Folder

```bash
mkdir student-api
cd student-api
```

### Step 2 — Open in VS Code

```bash
code .
```

### Step 3 — Initialize Node Project

```bash
npm init -y
```

### Step 4 — Install Dependencies

```bash
npm install express @prisma/client @prisma/adapter-pg pg bcryptjs jsonwebtoken express-validator helmet cors express-rate-limit morgan dotenv swagger-jsdoc swagger-ui-express
```

```bash
npm install --save-dev prisma nodemon
```

### Step 5 — Create Folder Structure

```bash
mkdir -p src/{config,controllers,middleware,routes,validators,utils,services,docs}
```

### Step 6 — Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL connection URL (`DATABASE_URL`).

### Step 7 — Sync Database Schema

Run Prisma schema synchronization to initialize your database tables:
```bash
npx prisma db push
```

### Step 8 — Run Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

### Step 9 — Test APIs

Open in browser:
- **API Base:** http://localhost:5000/api/v1/health
- **Swagger Docs:** http://localhost:5000/api-docs

---

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_token>
```

Get a token via `POST /api/v1/auth/login` or `POST /api/v1/auth/register`.

---

## 🌐 API Endpoints

### Auth Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/auth/register` | Register new user | Public |
| POST | `/api/v1/auth/login` | Login | Public |
| POST | `/api/v1/auth/logout` | Logout | Private |
| GET | `/api/v1/auth/me` | Get current user profile | Private |
| PUT | `/api/v1/auth/change-password` | Change password | Private |

### Student Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/v1/students` | List all students | Admin, Student |
| POST | `/api/v1/students` | Create student | Admin |
| GET | `/api/v1/students/:id` | Get student by ID | Admin, Student |
| PUT | `/api/v1/students/:id` | Update student | Admin |
| DELETE | `/api/v1/students/:id` | Delete student | Admin |
| GET | `/api/v1/students/stats/departments` | Department stats | Admin |

---

## 🔍 Query Parameters (GET /students)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `page` | number | Page number | `?page=2` |
| `limit` | number | Items per page (max 100) | `?limit=10` |
| `sort` | string | Sort field (prefix `-` for desc) | `?sort=-age` |
| `search` | string | Search name/email/department | `?search=rahul` |
| `department` | string | Filter by department | `?department=Computer Science` |
| `semester` | number | Filter by semester (1–8) | `?semester=4` |
| `minAge` | number | Minimum age filter | `?minAge=18` |
| `maxAge` | number | Maximum age filter | `?maxAge=25` |

**Example combined query:**
```
GET /api/v1/students?page=1&limit=5&sort=-createdAt&department=Computer Science&search=rahul
```

---

## 👥 Roles

| Role | Permissions |
|------|-------------|
| `admin` | Full CRUD on students, view all, stats |
| `student` | Read-only access to student list and profile |

---

## 📋 Student Model

| Field | Type | Validation |
|-------|------|------------|
| `name` | String | Required, 2–100 chars |
| `email` | String | Required, unique, valid email |
| `phone` | String | Required, 10-digit Indian number |
| `age` | Number | Required, 15–35 |
| `department` | String | Required, enum of 10 departments |
| `semester` | Number | Required, 1–8 |
| `address.street` | String | Optional |
| `address.city` | String | Optional |
| `address.state` | String | Optional |
| `address.pincode` | String | Optional, 6 digits |
| `address.country` | String | Optional, default: India |
| `createdAt` | Date | Auto |
| `updatedAt` | Date | Auto |

---

## 📬 Postman Collection

Import `StudentManagementAPI.postman_collection.json` into Postman.

The collection includes:
- Auto-saves JWT token on login/register
- Auto-saves Student ID after creation
- All CRUD operations
- Search, filter, sort, pagination examples
- Error scenario tests

---

## 🛡️ Security Features

- **Helmet** — Sets secure HTTP headers
- **CORS** — Configured allowed origins
- **Rate Limiting** — 100 req/15min globally, 20 req/15min on auth routes
- **JWT** — Signed tokens with expiry
- **bcrypt** — Password hashing with salt rounds 12
- **Input Validation** — All inputs validated and sanitized

---

## 📄 Swagger Documentation

Interactive API docs available at:
```
http://localhost:5000/api-docs
```

Raw OpenAPI JSON spec:
```
http://localhost:5000/api-docs.json
```

---

## 🔧 Git Setup

```bash
# Initialize git
git init

# Create .gitignore (already included)

# Stage all files
git add .

# Initial commit
git commit -m "feat: initial Student Management REST API"

# Connect to GitHub
git remote add origin https://github.com/yourusername/student-api.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 📦 NPM Scripts

```bash
npm start      # Production server
npm run dev    # Development with nodemon
```

---

## 🧪 Sample Request/Response

### Register
```json
POST /api/v1/auth/register
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "Admin123",
  "role": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "user": { "_id": "...", "name": "Admin User", "email": "admin@example.com", "role": "admin" },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Create Student
```json
POST /api/v1/students
Authorization: Bearer <token>
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "age": 20,
  "department": "Computer Science",
  "semester": 4
}
```

### Paginated List Response
```json
{
  "success": true,
  "message": "Students fetched successfully",
  "data": [...],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

## 📞 Support

For issues or questions, open a GitHub issue or contact the maintainer.

---

**MIT License** © 2024 Student Management API
