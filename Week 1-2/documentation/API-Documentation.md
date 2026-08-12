# API Documentation

## Project: Student Management REST API

Base URL: `http://localhost:3000`

All responses are in JSON format.

---

## 1. Get All Students

- **Method:** GET
- **URL:** `/students`
- **Purpose:** Retrieve the full list of student records.
- **Request Body:** None

**Response — 200 OK**

```json
[
  {
    "id": 1,
    "name": "Rahul Sharma",
    "department": "CSE",
    "year": 3,
    "email": "rahul@example.com"
  }
]
```

---

## 2. Get Student By ID

- **Method:** GET
- **URL:** `/students/:id`
- **Purpose:** Retrieve a single student record by its ID.
- **Request Body:** None

**Response — 200 OK**

```json
{
  "id": 1,
  "name": "Rahul Sharma",
  "department": "CSE",
  "year": 3,
  "email": "rahul@example.com"
}
```

**Error Response — 404 Not Found**

```json
{
  "message": "Student not found"
}
```

---

## 3. Create Student

- **Method:** POST
- **URL:** `/students`
- **Purpose:** Create a new student record. The ID is generated automatically.

**Request Body**

```json
{
  "name": "Neha Singh",
  "department": "CSE",
  "year": 3,
  "email": "neha@example.com"
}
```

**Response — 201 Created**

```json
{
  "id": 6,
  "name": "Neha Singh",
  "department": "CSE",
  "year": 3,
  "email": "neha@example.com"
}
```

**Error Response — 400 Bad Request**

```json
{
  "message": "Name, department, year and email are required"
}
```

Other possible validation error messages:

```json
{ "message": "Year must be a number between 1 and 4" }
```

```json
{ "message": "Please provide a valid email address" }
```

---

## 4. Update Student

- **Method:** PUT
- **URL:** `/students/:id`
- **Purpose:** Update an existing student's details. All fields are replaced with the values provided.

**Request Body**

```json
{
  "name": "Rahul Sharma Updated",
  "department": "CSE",
  "year": 4,
  "email": "rahul.updated@example.com"
}
```

**Response — 200 OK**

```json
{
  "id": 1,
  "name": "Rahul Sharma Updated",
  "department": "CSE",
  "year": 4,
  "email": "rahul.updated@example.com"
}
```

**Error Response — 404 Not Found**

```json
{
  "message": "Student not found"
}
```

**Error Response — 400 Bad Request**

```json
{
  "message": "Name, department, year and email are required"
}
```

---

## 5. Delete Student

- **Method:** DELETE
- **URL:** `/students/:id`
- **Purpose:** Delete a student record.
- **Request Body:** None

**Response — 200 OK**

```json
{
  "message": "Student with id 1 was deleted successfully"
}
```

**Error Response — 404 Not Found**

```json
{
  "message": "Student not found"
}
```

---

## 6. Unknown Route

- **Method:** Any
- **URL:** Any undefined path
- **Purpose:** Demonstrates the API's fallback handler for undefined routes.

**Response — 404 Not Found**

```json
{
  "message": "Route not found"
}
```

---

## 7. Unexpected Server Error

If an unhandled error occurs while processing a request, the centralized error handler responds with:

**Response — 500 Internal Server Error**

```json
{
  "message": "Internal Server Error"
}
```
