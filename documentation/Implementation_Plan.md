# Implementation & Debugging Guide
## 🎓 Student Management REST API

---

## 1. Setup & Installation

Follow these steps to deploy and run the Student Management API locally.

### 1.1 Prerequisites
- **Node.js**: Version 18.0.0 or higher.
- **PostgreSQL**: Local or cloud-hosted instance running on port `5432` (or custom port).

### 1.2 Installation
1. Install project dependencies:
   ```bash
   npm install
   ```
2. Set up environmental configuration by copying `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

### 1.3 Environment Variable Setup (`.env`)
Configure the variables inside your `.env` file to match your PostgreSQL instance:
```ini
PORT=5000
NODE_ENV=development

# Database URL format: postgresql://[user]:[password]@[host]:[port]/[database]
DATABASE_URL="postgresql://postgres:password@localhost:5432/studentdb?sslmode=disable"

JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 1.4 Database Sync
Push the Prisma schemas to your database to automatically create the tables and relations:
```bash
npx prisma db push
```

---

## 2. Bug Diagnostics & Resolution Log

During the development and testing phase, the following core bugs were identified and fixed.

### Bug 1: Unreachable Database URL Configuration
- **Symptom**: Prisma failed to reach the database, displaying `Error: P1001: Can't reach database server at localhost:51214`.
- **Cause**: The `.env` template had a placeholder database string pointing to port `51214` (which was inactive).
- **Resolution**: Updated `DATABASE_URL` in `.env` to target the active local PostgreSQL database running on the standard port `5432` with credentials `postgres` and `password`.

### Bug 2: Swagger UI CORS Policy Block
- **Symptom**: Calling endpoints from the Swagger UI at `http://localhost:5000` failed with a `500 Internal Server Error` and the message: `CORS: Origin 'http://localhost:5000' not allowed`.
- **Cause**: The CORS middleware whitelist in `app.js` was hardcoded to only allow `http://localhost:3000`. Swagger requests on same-origin (port 5000) send an `Origin` header in Chrome, triggering rejection.
- **Resolution**: Modified the CORS options callback in `src/app.js` to dynamically match and allow any localhost/127.0.0.1 origins on any port (using regex matching `^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$`), ensuring local clients and Swagger UI can interact with the server.

### Bug 3: Incomplete Error Payloads in AppError
- **Symptom**: Standard input validation errors (e.g. invalid emails, ages, or passwords) threw a general 500 error or returned empty lists instead of detailing which fields were invalid.
- **Cause**: The `AppError` class constructor was missing the `errors` parameter, meaning `this.errors = errors` was never set on instantiation, causing the global error handler to return undefined.
- **Resolution**: Updated the constructor inside `src/utils/AppError.js` to accept and assign `errors`:
  ```javascript
  class AppError extends Error {
    constructor(message, statusCode = 500, errors = null) {
      super(message);
      this.statusCode = statusCode;
      this.errors = errors;
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  ```

---

## 3. Testing & Verification

### 3.1 Running the Server
To run the server in development mode with hot-reloading (auto-reload on code change):
```bash
npm run dev
```

### 3.2 Swagger Verification (Browser)
1. Navigate to: `http://localhost:5000/api-docs`
2. Locate the **POST /auth/register** endpoint.
3. Click "Try it out" and submit a register payload.
4. Locate the **POST /auth/login** endpoint and authenticate with the registered credentials to obtain your JWT token.
5. Click **Authorize** at the top of the Swagger page and paste the JWT token to unlock and test protected student endpoints (like `POST /students` or `GET /students`).

### 3.3 Postman Collection
Import the file `StudentManagementAPI.postman_collection.json` directly into Postman. The collection has pre-configured test scripts that automatically capture and save the authentication JWT token, allowing you to run requests sequentially without manual copy-pasting.
