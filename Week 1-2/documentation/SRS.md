# Software Requirements Specification (SRS)

## Project: Student Management REST API

## 1. Introduction

This document specifies the functional and non-functional requirements for the Student Management REST API, a Node.js/Express.js backend application for managing student records via HTTP.

## 2. Purpose

The purpose of this document is to describe, in detail, what the Student Management REST API must do and the conditions under which it must operate, serving as a reference for development, testing, and evaluation.

## 3. Scope

The system provides a RESTful HTTP interface for creating, reading, updating, and deleting student records. It is a standalone backend service with no database, no authentication layer, and no user interface beyond API responses.

## 4. Functional Requirements

| ID    | Requirement |
|-------|-------------|
| FR-1  | The system shall provide a `GET /students` endpoint that returns all student records. |
| FR-2  | The system shall provide a `GET /students/:id` endpoint that returns a single student record matching the given ID, or a 404 error if not found. |
| FR-3  | The system shall provide a `POST /students` endpoint that creates a new student record from the request body and auto-generates its ID. |
| FR-4  | The system shall provide a `PUT /students/:id` endpoint that updates an existing student's details. |
| FR-5  | The system shall provide a `DELETE /students/:id` endpoint that removes a student record. |
| FR-6  | The system shall validate that `name`, `department`, `year`, and `email` are present on create and update requests. |
| FR-7  | The system shall validate that `year` is a number between 1 and 4 (inclusive). |
| FR-8  | The system shall validate that `email` follows a basic valid email format. |
| FR-9  | The system shall log every incoming request's method, URL, and timestamp. |
| FR-10 | The system shall return a 404 response for any request to an undefined route. |
| FR-11 | The system shall handle unexpected errors centrally and return a 500 response without crashing the server. |

## 5. Non-Functional Requirements

| ID     | Requirement |
|--------|-------------|
| NFR-1  | The system shall respond to requests in a timely manner suitable for local development and testing (no artificial delays). |
| NFR-2  | The codebase shall be modular, separating routes, controllers, and data. |
| NFR-3  | The codebase shall use clear, meaningful variable and function names and include beginner-friendly comments. |
| NFR-4  | The system shall be runnable on any machine with Node.js installed, requiring only `npm install` and `npm start`. |
| NFR-5  | The system shall not depend on any external database or network service. |

## 6. System Requirements

- Node.js v16+ installed
- npm installed
- Available TCP port 3000
- A tool capable of sending HTTP requests (Postman, curl, or similar) for testing

## 7. User Requirements

- The user (developer/student) should be able to install and run the project without manual file creation.
- The user should be able to test every endpoint using the provided Postman collection.
- The user should be able to understand and explain each part of the code, including in a viva/interview setting.

## 8. Constraints

- No database may be used; data must be stored in memory.
- No TypeScript, frontend framework, or ORM may be used.
- The project must run on port 3000.

## 9. Assumptions

- The user has Node.js and npm installed on their machine.
- The user is running the project locally (not in a production/cloud environment).
- Data loss on restart is acceptable, since this is a learning project rather than a production system.
