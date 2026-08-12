# System Design

## Project: Student Management REST API

## 1. System Architecture

The application follows a simple, layered request-handling architecture typical of small Express.js applications:

```text
Postman Client
      |
      v
Express Server
      |
      v
Student Routes
      |
      v
Student Controller
      |
      v
In-Memory Student Array
      |
      v
JSON Response
```

## 2. Component Description

- **Postman Client** — the external client sending HTTP requests (GET, POST, PUT, DELETE) to the API. Could equally be a browser, curl, or a frontend application.
- **Express Server (server.js)** — the application entry point. Configures global middleware (JSON body parsing, request logging), mounts the student routes under `/students`, and defines fallback 404 and error-handling middleware.
- **Student Routes (routes/students.js)** — an Express Router that maps each HTTP method + path combination to the matching controller function.
- **Student Controller (controllers/studentController.js)** — contains the logic for each operation: validating input, finding/creating/updating/deleting records, and shaping the JSON response.
- **In-Memory Student Array (data/students.js)** — the "data layer" of the application; a plain array holding student objects, along with a helper for generating new IDs.
- **JSON Response** — the final output sent back to the client, always in JSON format, with an appropriate HTTP status code.

## 3. Request-Response Flow

1. A client sends an HTTP request (e.g., `GET /students/1`) to `http://localhost:3000`.
2. The request first passes through `express.json()` middleware, which parses any JSON body.
3. It then passes through the custom logging middleware, which records the method, URL, and timestamp to the console.
4. Express matches the request path against the mounted routers. Requests starting with `/students` are handed to `routes/students.js`.
5. The router matches the specific method + path (e.g., `GET /:id`) and calls the corresponding controller function.
6. The controller function reads from or modifies the in-memory `students` array, performing validation as needed.
7. The controller sends a JSON response with the appropriate status code (200, 201, 400, or 404).
8. If an unexpected error occurs anywhere in this chain, it's forwarded to the centralized error-handling middleware, which returns a 500 response.
9. If no route matches the request at all, the 404 handler middleware returns a "Route not found" response.

## 4. Data Flow

```text
Request Body (JSON)
      |
      v
express.json() middleware
      |
      v
req.body (JavaScript object)
      |
      v
Controller validation
      |
      v
In-memory array (read/write)
      |
      v
res.json() response
```

## 5. Module Interaction

- `server.js` imports and mounts `routes/students.js`.
- `routes/students.js` imports functions from `controllers/studentController.js`.
- `controllers/studentController.js` imports the `students` array and `getNextId` helper from `data/students.js`.
- No module reaches "backwards" up this chain — this keeps dependencies one-directional and easy to reason about.

## 6. Simple ASCII Architecture Diagram

```text
+------------------+
|  Postman Client  |
+--------+---------+
         |
         v
+------------------+
|  Express Server  |  <-- server.js (middleware, startup)
+--------+---------+
         |
         v
+------------------+
|  Student Routes  |  <-- routes/students.js
+--------+---------+
         |
         v
+--------------------+
| Student Controller |  <-- controllers/studentController.js
+---------+----------+
          |
          v
+-----------------------+
| In-Memory Student Array|  <-- data/students.js
+---------+--------------+
          |
          v
+------------------+
|   JSON Response   |
+------------------+
```
