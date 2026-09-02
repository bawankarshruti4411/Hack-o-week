const { students, getNextId } = require("../data/students");
function isValidEmail(email) {
  const basicEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return basicEmailPattern.test(email);
}
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

  return null; 
}

function getAllStudents(req, res) {
  res.status(200).json(students);
}

function getStudentById(req, res) {
  const studentId = Number(req.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(student);
}
function createStudent(req, res) {
  const errorMessage = validateStudentInput(req.body);

  if (errorMessage) {
    return res.status(400).json({ message: errorMessage });
  }

  const { name, department, year, email } = req.body;

  const newStudent = {
    id: getNextId(), 
    name,
    department,
    year,
    email,
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
}
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

  student.name = name;
  student.department = department;
  student.year = year;
  student.email = email;

  res.status(200).json(student);
}
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
