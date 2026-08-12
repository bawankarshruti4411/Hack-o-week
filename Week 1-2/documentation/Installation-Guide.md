# Installation Guide

## Project: Student Management REST API

## Prerequisites

Before installing this project, make sure you have:

- A computer running Windows, macOS, or Linux
- Internet access (needed once, to download the Express.js package)
- At least 100 MB of free disk space
- Port `3000` free (not already used by another application)

## Node.js Installation

1. Visit [https://nodejs.org](https://nodejs.org).
2. Download the **LTS** version recommended for most users.
3. Run the installer for your operating system and complete the setup wizard using default settings.
4. Confirm the installation succeeded by opening a terminal and running:

   ```bash
   node -v
   npm -v
   ```

   You should see version numbers printed for both commands (for example `v20.11.0` and `10.2.4`). If you get a "command not found" error, restart your terminal or your computer and try again.

## Project Setup

1. Extract `Student-Management-REST-API.zip` to a folder of your choice.
2. Open a terminal and navigate into the extracted folder:

   ```bash
   cd student-management-api
   ```

## Dependency Installation

Install the project's only dependency (Express.js) by running:

```bash
npm install
```

This reads `package.json`, downloads the required packages, and creates a `node_modules` folder along with a `package-lock.json` file (if not already present).

## Starting the Server

Start the API server with:

```bash
npm start
```

If successful, you'll see:

```text
Server is running at http://localhost:3000
```

Open a browser or Postman and visit `http://localhost:3000` to confirm the server is responding.

To stop the server, press `Ctrl + C` in the terminal.

## Troubleshooting

| Problem | Likely Cause | Solution |
|---|---|---|
| `npm: command not found` | Node.js/npm not installed or not in PATH | Reinstall Node.js from nodejs.org and restart your terminal |
| `Error: Cannot find module 'express'` | Dependencies not installed | Run `npm install` inside the project folder |
| `Error: listen EADDRINUSE: address already in use :::3000` | Another process is already using port 3000 | Stop the other process, or change the `PORT` constant in `server.js` |
| Server starts but Postman requests fail | Server not running, or wrong URL | Make sure `npm start` is running and requests use `http://localhost:3000` |
| Changes to code don't seem to apply | Server needs to be restarted after edits | Stop the server (`Ctrl+C`) and run `npm start` again |
| `npm install` fails with network errors | No internet connection, or blocked npm registry | Check your internet connection and any firewall/proxy settings |
