# Product Requirements Document (PRD)
## 🎓 Student Management REST API

---

## 1. Executive Summary
The Student Management REST API is a backend application designed to handle administrative operations for educational institutions. The system provides secure student enrollment, search, modification, deletion, and statistical analysis. It features role-based access control, strict input validation, security headers, rate limiting, and fully interactive Swagger documentation.

---

## 2. Goals & Objectives
- **Standardized Backend**: Build a production-grade, REST-compliant interface using the MVC (Model-View-Controller) architecture.
- **Secure Access Control**: Differentiate actions between institutional Administrators (`admin`) and Students (`student`).
- **Data Integrity**: Validate all inputs at the entry-point to prevent corrupted database records.
- **Reporting Capability**: Expose aggregate reporting metrics (such as average student age, total counts, and semester distributions per department) for quick decision-making.

---

## 3. User Personas & Roles

| Role | Description | Permissions & Privileges |
| :--- | :--- | :--- |
| **Administrator (Admin)** | Academic registrar, staff member, or IT administrator. | Full access to create, update, delete, view all students, and view department-level metrics. |
| **Student** | Registered student in the college. | Read-only access to view their own profile and search/view lists of other students. Re-setting own password. |

---

## 4. Functional Requirements

### 4.1 Authentication & Profile Management
- **User Registration**: Anyone can register a new account as an `admin` or a `student`. Password hashing must be applied.
- **User Login**: Users authenticate using their registered email and password to receive a JSON Web Token (JWT).
- **Session Management**: Secure logout mechanism (invalidates token client-side).
- **Profile Inspection**: Authenticated users can retrieve their logged-in user details (`GET /auth/me`).
- **Credential Rotation**: Users can update their passwords securely by verifying their current password (`PUT /auth/change-password`).

### 4.2 Student Record Management (CRUD)
- **Create Student (Admin Only)**: Create new student profiles with detailed fields:
  - Name, Unique Email, Phone Number, Age, Department, Semester, and physical address structure (Street, City, State, Pincode, Country).
- **Read Student List (Admin, Student)**: Fetch list of all active students.
- **Read Student by ID (Admin, Student)**: View detailed profile of a single student.
- **Update Student (Admin Only)**: Modify fields on an existing student profile.
- **Delete Student (Admin Only)**: Permanently remove a student record from the system.

### 4.3 Query, Pagination, and Search
- **Text Search**: Support fuzzy search on student name, email, or department.
- **Filters**: Filter records by department, semester, minimum age, or maximum age.
- **Sorting**: Sort results by any field (e.g. `createdAt`, `age`) in ascending or descending order.
- **Pagination**: Implement standard offset pagination (`page`, `limit`) with meta information indicating total count, page count, and next/prev availability.

### 4.4 Reporting & Analytics
- **Department Statistics (Admin Only)**: Generate department-wise stats aggregating:
  - Total student enrollment.
  - Average age of active students.
  - Distinct semesters active in the department.

---

## 5. Non-Functional Requirements

### 5.1 Security
- **Data Protection**: Store all passwords as safe hashes using `bcryptjs` (12 rounds).
- **Authentication Protocol**: Require standard `Bearer <Token>` format for all non-public APIs.
- **Headers Protection**: Implement Express `helmet` middleware to set standard HTTP headers shielding against clickjacking, script injection, and sniffing.
- **CORS Protection**: Prevent arbitrary external domains from querying the API, while allowing trusted local dev environments (e.g. ports 3000, 5000, 5173).
- **Rate Limiting**: Protect endpoints against brute force and DDoS attacks:
  - General API: Max 100 requests per 15 minutes.
  - Auth routes: Max 20 requests per 15 minutes.

### 5.2 Performance & Scalability
- **Standardized Payload**: All success responses follow a structured `{ success: true, message, data }` format, and errors follow `{ success: false, message, errors }`.
- **Database Query Optimizations**: Use indexed unique email columns for users and students to perform fast O(1) checks.

---

## 6. Out of Scope (Future Phases)
- Email verification during registration.
- Profile photo/avatar upload (using cloud storage).
- Real-time notification services (WebSockets).
- Course registration and grading modules.
