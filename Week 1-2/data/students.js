// data/students.js
// This file holds our "database" for the project.
// Since we are NOT using a real database, we simply store
// student records in a JavaScript array that lives in memory.
//
// IMPORTANT: Because this is just an array in memory, all data
// will reset back to these 5 sample students every time the
// server is restarted.

// Pre-loaded sample student records
let students = [
  {
    id: 1,
    name: "Rahul Sharma",
    department: "CSE",
    year: 3,
    email: "rahul@example.com",
  },
  {
    id: 2,
    name: "Priya Patil",
    department: "CSE",
    year: 2,
    email: "priya@example.com",
  },
  {
    id: 3,
    name: "Amit Verma",
    department: "ECE",
    year: 3,
    email: "amit@example.com",
  },
  {
    id: 4,
    name: "Sneha Joshi",
    department: "IT",
    year: 4,
    email: "sneha@example.com",
  },
  {
    id: 5,
    name: "Arjun Mehta",
    department: "ME",
    year: 2,
    email: "arjun@example.com",
  },
];

// nextId keeps track of which ID should be assigned to the
// next student that gets created. It starts at 6 because we
// already used IDs 1 to 5 for the sample data above.
let nextId = 6;

// A small helper function so the controller doesn't need to
// know how "nextId" works internally. It just calls this
// function and gets back a fresh, unused ID.
function getNextId() {
  const idToUse = nextId;
  nextId = nextId + 1;
  return idToUse;
}

// We export the array and the helper function so that the
// controller file can use (and modify) them.
module.exports = {
  students,
  getNextId,
};
