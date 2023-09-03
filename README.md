# express-note-taker

## Description

A web application for taking and managing notes. It creates a web server that listens on a specific port, serves static files, provide API routes and renders HTML pages for different routes.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Test](#test)
- [Links](#links)
- [Contact Me](#contact-me)

## Installation

- Node.js
- npm
- Express.js
- UUID Package

## Usage

- Download or clone the code
- Install the Dependencies
- Run the Server
- Open a browser or insomnia
- Access and use the application.

## Test

To Test the Web Interface in a Browser,

- Open a web browser
- Enter the URL
- Click the "Get Started" button on the landing page
- Interact with the user interface by:
  - Adding new note
  - Editing an existing note
  - Deleting a note

To Test the API endpoints in Insomnia,

- In a workspace:
  - GET /api/notes: to retrieve all notes
  - POST /api/notes: to create a new note
    Ex:{
    "title": "Test Note",
    "text": "This is a test note."
    }
  - DELETE /api/notes/:id: to delete a note by replacing ':id' with the ID of the note to delete

To Stop the Server, press Ctrl+C in the terminal where the server is running

## Links

Here is the link to the starter code for this project:

- Starter Code: [miniature-eureka](https://github.com/coding-boot-camp/miniature-eureka)

## Contact-Me

If you encounter any issues, please report them on the project's [GitHub repository](https://github.com/Clkwong3/express-note-taker).

You can also connect with me on [GitHub](https://github.com/Clkwong3).
