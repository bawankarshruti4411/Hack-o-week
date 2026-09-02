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
let nextId = 6;
function getNextId() {
  const idToUse = nextId;
  nextId = nextId + 1;
  return idToUse;
}
module.exports = {
  students,
  getNextId,
};
