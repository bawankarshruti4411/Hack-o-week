# Test Plan

## Project: Student Management REST API

This test plan was executed manually against a running instance of the server (`npm start`) using `curl`/Postman-equivalent HTTP requests. All test cases below were run during development and passed.

| Test Case ID | Test Scenario | HTTP Method | Endpoint | Input | Expected Status | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|---|---|
| TC-01 | Get all students | GET | /students | None | 200 | Returns array of 5 sample students | Returned array of 5 students | Pass |
| TC-02 | Get student by valid ID | GET | /students/1 | None | 200 | Returns student with id 1 | Returned student with id 1 | Pass |
| TC-03 | Get student by invalid ID | GET | /students/999 | None | 404 | Returns "Student not found" | Returned "Student not found" | Pass |
| TC-04 | Create student with valid data | POST | /students | Valid student JSON | 201 | Returns new student with auto-generated id | Returned new student with id 6 | Pass |
| TC-05 | Create student with missing fields | POST | /students | `{"name":"Missing Fields"}` | 400 | Returns validation error message | Returned "Name, department, year and email are required" | Pass |
| TC-06 | Create student with invalid year | POST | /students | year: 9 | 400 | Returns year validation error | Returned "Year must be a number between 1 and 4" | Pass |
| TC-07 | Create student with invalid email | POST | /students | email: "notanemail" | 400 | Returns email validation error | Returned "Please provide a valid email address" | Pass |
| TC-08 | Update student with valid data | PUT | /students/1 | Valid updated JSON | 200 | Returns updated student | Returned updated student record | Pass |
| TC-09 | Update student with invalid ID | PUT | /students/999 | Valid JSON | 404 | Returns "Student not found" | Returned "Student not found" | Pass |
| TC-10 | Update student with missing fields | PUT | /students/1 | Incomplete JSON | 400 | Returns validation error | Returned validation error message | Pass |
| TC-11 | Delete student with valid ID | DELETE | /students/2 | None | 200 | Returns success message | Returned "Student with id 2 was deleted successfully" | Pass |
| TC-12 | Delete student with invalid ID | DELETE | /students/999 | None | 404 | Returns "Student not found" | Returned "Student not found" | Pass |
| TC-13 | Access unknown route | GET | /unknown-route | None | 404 | Returns "Route not found" | Returned "Route not found" | Pass |
| TC-14 | Verify data persists across requests within same server run | GET | /students | None | 200 | Reflects prior create/update/delete operations | Array correctly reflected all changes made during the session | Pass |
| TC-15 | Verify request logger output | Any | Any | Any | N/A | Console logs method, URL, and timestamp for every request | Console showed correctly formatted log lines for every request | Pass |
| TC-16 | Root welcome route | GET | / | None | 200 | Returns welcome message with endpoint list | Returned welcome JSON with endpoint list | Pass |

## Notes

- Positive test cases (TC-01, TC-02, TC-04, TC-08, TC-11, TC-16) confirm the "happy path" for each endpoint.
- Negative test cases (TC-03, TC-05, TC-06, TC-07, TC-09, TC-10, TC-12, TC-13) confirm that validation and error handling behave correctly.
- Because data is stored in memory, re-running this test plan after restarting the server will reset IDs and records back to the original 5 sample students.
- All test cases were executed and passed during development of this project, prior to packaging.
