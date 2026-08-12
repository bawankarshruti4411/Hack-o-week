// routes/students.js
// This file defines the URL paths for everything related to students,
// and connects each one to the matching controller function.
// Notice this file doesn't contain any real logic -- it just
// wires up "which URL + method calls which function".

const express = require("express");
const router = express.Router();

const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// GET /students -> get every student
router.get("/", getAllStudents);

// GET /students/:id -> get one student by ID
router.get("/:id", getStudentById);

// POST /students -> create a new student
router.post("/", createStudent);

// PUT /students/:id -> update an existing student
router.put("/:id", updateStudent);

// DELETE /students/:id -> delete a student
router.delete("/:id", deleteStudent);

module.exports = router;
