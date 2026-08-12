# Technical Requirements Document (TRD)

## Project: Student Management REST API

## 1. Technical Overview

The application is a single-process Node.js server built on the Express.js framework. It exposes a RESTful HTTP API for managing student records that are held entirely in server memory (a JavaScript array). There is no external database, no build step, and no compiled language — everything runs directly via `node server.js`.

## 2. Technology Stack

| Layer            | Technology       |
|-------------------|------------------|
| Runtime            | Node.js          |
| Web framework       | Express.js 4.x   |
| Language            | JavaScript (CommonJS modules) |
| Package manager     | npm              |
| Data storage        | In-memory JavaScript array |
| API testing         | Postman          |

## 3. Architecture

The project follows a simple layered architecture:

```text
Client (Postman / browser)
        |
        v
   Express Server (server.js)
        |
        v
  Middleware (JSON parsing, logging)
        |
        v
   Router (routes/students.js)
        |
        v
 Controller (controllers/studentController.js)
        |
        v
  Data Layer (data/students.js)
        |
        v
     JSON Response
```

## 4. Modules

- **server.js** — application entry point; configures middleware, mounts routes, starts the HTTP listener, and defines the 404 and error-handling middleware.
- **routes/students.js** — an Express Router instance mapping HTTP method + path combinations to controller functions.
- **controllers/studentController.js** — contains the business logic for each endpoint: fetching, validating, creating, updating, and deleting students.
- **data/students.js** — exports the in-memory array of student objects and a helper function for generating new IDs.

## 5. Folder Structure

```text
student-management-api/
├── controllers/
│   └── studentController.js
├── routes/
│   └── students.js
├── data/
│   └── students.js
├── screenshots/
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
├── Student-Management-API.postman_collection.json
└── documentation/
```

## 6. Runtime Requirements

- Node.js (v16 or later recommended)
- npm (bundled with Node.js)
- Port 3000 available on the host machine

## 7. Dependencies

| Package  | Purpose                          |
|----------|-----------------------------------|
| express  | HTTP server and routing framework |

No dev dependencies, database drivers, or ORMs are required.

## 8. API Design

The API follows REST conventions:

- Resources are nouns (`/students`), not verbs.
- HTTP methods indicate the action: `GET` (read), `POST` (create), `PUT` (update), `DELETE` (remove).
- Responses are always JSON.
- Status codes communicate the outcome of the request (see API-Documentation.md for full details).

## 9. Error Handling

Error handling happens at three levels:

1. **Validation errors** — caught explicitly inside controller functions and returned as `400 Bad Request` with a descriptive message.
2. **Not found errors** — when a student ID doesn't match any record, controllers return `404 Not Found`.
3. **Unhandled/unexpected errors** — any error passed to `next(err)` is caught by the centralized error-handling middleware in `server.js`, which logs the error and responds with `500 Internal Server Error`.

Unknown routes (no matching route at all) are caught by a dedicated 404 middleware registered after all defined routes.

## 10. Data Storage

Student records are stored in a plain JavaScript array (`data/students.js`), pre-loaded with 5 sample students. New students are appended to this array with an auto-incrementing ID. Updates mutate the matching object in place; deletions use `Array.prototype.splice`. Because this is in-memory storage, all data is lost and reset to the original sample data when the Node.js process restarts.
