// controllers/studentController.js
// This file contains the actual logic for each API endpoint.
// The routes file (routes/students.js) simply points a URL +
// HTTP method to one of these functions.

const { students, getNextId } = require("../data/students");

// -----------------------------------------------------------
// Helper: very basic email format checker.
// This is NOT a perfect email validator, just enough to catch
// obviously wrong input like "abc" or "abc@" for a student project.
// -----------------------------------------------------------
function isValidEmail(email) {
  const basicEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return basicEmailPattern.test(email);
}

// -----------------------------------------------------------
// Helper: validates the body sent for creating/updating a student.
// Returns an error message string if something is wrong,
// or null if everything looks fine.
// -----------------------------------------------------------
function validateStudentInput(body) {
  const { name, department, year, email } = body;

  if (!name || !department || year === undefined || year === null || !email) {
    return "Name, department, year and email are required";
  }

  if (typeof year !== "number" || year < 1 || year > 4) {
    return "Year must be a number between 1 and 4";
  }

  if (!isValidEmail(email)) {
    return "Please provide a valid email address";
  }

  return null; // no errors
}

// -----------------------------------------------------------
// GET /students
// Returns the full list of students.
// -----------------------------------------------------------
function getAllStudents(req, res) {
  res.status(200).json(students);
}

// -----------------------------------------------------------
// GET /students/:id
// Returns a single student that matches the given ID.
// -----------------------------------------------------------
function getStudentById(req, res) {
  // req.params.id always arrives as a string, so we convert it
  // to a number before comparing it with student.id.
  const studentId = Number(req.params.id);

  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(student);
}

// -----------------------------------------------------------
// POST /students
// Creates a new student using the data sent in the request body.
// -----------------------------------------------------------
function createStudent(req, res) {
  const errorMessage = validateStudentInput(req.body);

  if (errorMessage) {
    return res.status(400).json({ message: errorMessage });
  }

  const { name, department, year, email } = req.body;

  const newStudent = {
    id: getNextId(), // ID is generated automatically, never sent by the client
    name,
    department,
    year,
    email,
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
}

// -----------------------------------------------------------
// PUT /students/:id
// Updates an existing student's details.
// -----------------------------------------------------------
function updateStudent(req, res) {
  const studentId = Number(req.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const errorMessage = validateStudentInput(req.body);

  if (errorMessage) {
    return res.status(400).json({ message: errorMessage });
  }

  const { name, department, year, email } = req.body;

  // Update the student's fields in place (ID stays the same).
  student.name = name;
  student.department = department;
  student.year = year;
  student.email = email;

  res.status(200).json(student);
}

// -----------------------------------------------------------
// DELETE /students/:id
// Removes a student from the array.
// -----------------------------------------------------------
function deleteStudent(req, res) {
  const studentId = Number(req.params.id);
  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = students[studentIndex];
  students.splice(studentIndex, 1);

  res.status(200).json({
    message: `Student with id ${deletedStudent.id} was deleted successfully`,
  });
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
