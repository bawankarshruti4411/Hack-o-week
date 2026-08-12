// server.js
// This is the entry point of our application.
// It sets up Express, registers our middleware, connects the
// student routes, and finally starts the server on port 3000.

const express = require("express");
const studentRoutes = require("./routes/students");

const app = express();
const PORT = 3000;

// -----------------------------------------------------------
// MIDDLEWARE
// -----------------------------------------------------------

// Built-in middleware that parses incoming JSON request bodies
// and makes the data available on req.body.
app.use(express.json());

// Simple custom middleware that logs every incoming request:
// method, URL, and a timestamp. Example log line:
// [2026-08-12T10:30:00.000Z] GET /students
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next(); // pass control to the next middleware/route handler
});

// -----------------------------------------------------------
// ROUTES
// -----------------------------------------------------------

// A small welcome route just so visiting http://localhost:3000
// in a browser shows something useful instead of "Cannot GET /".
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Student Management REST API is running",
    endpoints: {
      getAllStudents: "GET /students",
      getStudentById: "GET /students/:id",
      createStudent: "POST /students",
      updateStudent: "PUT /students/:id",
      deleteStudent: "DELETE /students/:id",
    },
  });
});

// All "/students" URLs are handled by the studentRoutes router.
app.use("/students", studentRoutes);

// -----------------------------------------------------------
// 404 HANDLER
// This runs only if no route above matched the incoming request.
// -----------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// -----------------------------------------------------------
// CENTRAL ERROR HANDLER
// Express recognizes this as an error handler because it takes
// FOUR arguments (err, req, res, next). If any route or
// middleware calls next(err), execution lands here.
// -----------------------------------------------------------
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// -----------------------------------------------------------
// START THE SERVER
// -----------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
