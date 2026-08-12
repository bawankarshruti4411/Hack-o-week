# User Manual

## Project: Student Management REST API

This manual walks a beginner through installing, running, and testing the Student Management REST API step by step.

## Step 1: Install Node.js

1. Go to [https://nodejs.org](https://nodejs.org).
2. Download the **LTS (Long-Term Support)** version for your operating system.
3. Run the installer and follow the on-screen instructions (default options are fine).
4. Verify the installation by opening a terminal/command prompt and running:

   ```bash
   node -v
   npm -v
   ```

   Both commands should print a version number.

## Step 2: Extract the Project

1. Locate the downloaded `Student-Management-REST-API.zip` file.
2. Right-click it and choose **Extract All** (Windows) or double-click it (macOS), or run:

   ```bash
   unzip Student-Management-REST-API.zip
   ```

3. You should now have a folder named `student-management-api`.

## Step 3: Open It in VS Code

1. Open **Visual Studio Code**.
2. Go to **File → Open Folder...**
3. Select the extracted `student-management-api` folder.

## Step 4: Open a Terminal

1. In VS Code, go to **Terminal → New Terminal**.
2. Confirm the terminal's current directory is `student-management-api` (you should see the project files listed if you run `ls` / `dir`).

## Step 5: Run `npm install`

In the terminal, run:

```bash
npm install
```

This downloads the Express.js package and creates a `node_modules` folder. This only needs to be done once (or whenever dependencies change).

## Step 6: Run `npm start`

Start the server:

```bash
npm start
```

You should see:

```text
Server is running at http://localhost:3000
```

Leave this terminal window open — closing it, or pressing `Ctrl+C`, will stop the server.

## Step 7: Open Postman

1. Download and install Postman from [https://www.postman.com/downloads/](https://www.postman.com/downloads/) if you don't already have it.
2. Open the Postman application.

## Step 8: Import the Collection

1. In Postman, click **Import** (top-left).
2. Select the file `Student-Management-API.postman_collection.json` from the project folder.
3. The collection **"Student Management API"** will appear in your Postman sidebar, containing 10 ready-made requests.

## Step 9: Test Each API

With the server still running (from Step 6), try each request in the collection, in order:

1. **Get All Students** — should return a list of 5 students with status `200`.
2. **Get Student By ID** — should return the student with id `1` and status `200`.
3. **Get Student By Invalid ID** — should return a "Student not found" message with status `404`.
4. **Create Student (Valid)** — should create a new student and return status `201`.
5. **Create Student (Invalid)** — should return a validation error with status `400`.
6. **Update Student (Valid)** — should update student id `1` and return status `200`.
7. **Update Student (Invalid)** — should return "Student not found" with status `404`.
8. **Delete Student (Valid)** — should delete student id `2` and return a success message with status `200`.
9. **Delete Student (Invalid)** — should return "Student not found" with status `404`.
10. **Get Unknown Route** — should return "Route not found" with status `404`.

After each request, check the **Status** code and the **Body** shown in Postman's response panel to confirm they match the expected results above.

Take screenshots of your results and place them in the project's `screenshots/` folder for your submission.

## Tip: Restarting the Server

If you want to reset the data back to the original 5 students, simply stop the server (`Ctrl+C` in the terminal) and run `npm start` again.
