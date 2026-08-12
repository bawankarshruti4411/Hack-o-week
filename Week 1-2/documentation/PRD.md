# Product Requirements Document (PRD)

## Project: Student Management REST API

## 1. Project Overview

The Student Management REST API is a backend application that allows a client (such as Postman, a frontend app, or another service) to manage student records through standard HTTP requests. It is designed as an educational project to demonstrate REST API fundamentals using Node.js and Express.js, without the added complexity of a database.

## 2. Problem Statement

Students learning backend development often jump straight into database-driven projects, which can obscure the core concepts of REST APIs (routing, HTTP methods, status codes, validation, middleware). There is a need for a minimal, well-structured project that isolates and clearly demonstrates these concepts using a simple in-memory data store.

## 3. Objectives

- Provide a working example of a RESTful API built with Express.js
- Demonstrate all four core CRUD operations
- Show proper use of HTTP methods and status codes
- Illustrate a clean, modular project structure (routes, controllers, data)
- Include practical middleware examples (logging, 404 handling, error handling)
- Provide a Postman collection for hands-on testing

## 4. Scope

**In scope:**
- CRUD operations for student records
- In-memory data storage
- Basic request validation
- Request logging
- Centralized error and 404 handling
- Postman collection and documentation

**Out of scope:**
- Persistent storage (database)
- User authentication / authorization
- Frontend interface
- Deployment to production infrastructure

## 5. Target Users

- Engineering students learning backend development and REST API design
- Instructors demonstrating REST concepts in a classroom setting
- Anyone looking for a minimal reference implementation of an Express.js CRUD API

## 6. Features

- `GET /students` — list all students
- `GET /students/:id` — retrieve one student
- `POST /students` — create a student
- `PUT /students/:id` — update a student
- `DELETE /students/:id` — delete a student
- Input validation with descriptive error messages
- Request logging middleware
- 404 handler for unmatched routes
- Centralized error-handling middleware

## 7. Functional Overview

The API exposes a `/students` resource. Clients send standard HTTP requests (GET, POST, PUT, DELETE) to interact with student records stored in a server-side in-memory array. Each request passes through a logging middleware, is routed via Express Router to the appropriate controller function, validated where necessary, and responded to with an appropriate JSON payload and HTTP status code.

## 8. Success Criteria

- All five endpoints function correctly and return the expected status codes
- Validation correctly rejects malformed input with `400 Bad Request`
- Requests for non-existent students return `404 Not Found`
- Unknown routes return `404 Not Found`
- Unexpected errors are caught by the central error handler and return `500 Internal Server Error`
- The Postman collection successfully exercises every endpoint
- The project can be installed and run with just `npm install` and `npm start`

## 9. Limitations

- Data does not persist between server restarts (in-memory only)
- No authentication, so all endpoints are publicly accessible
- No support for concurrent-write conflict resolution (not a concern for a single in-memory array, but noted for future database migration)
