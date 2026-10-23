# Student Management System

A web-based application built using **Node.js, Express.js, MongoDB, HTML, CSS, and JavaScript** to manage student records and user profiles.

## Features

- Student CRUD operations (Create, Read, Update, Delete)
- Search student records by name
- User registration and login
- Password hashing using bcrypt
- Session-based authentication and logout
- Profile management and photo upload using Multer
- MongoDB database integration

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Frontend:** HTML, CSS, JavaScript
- **Authentication:** bcryptjs, express-session
- **File Uploads:** Multer

## Installation

1. Clone the repository:

   ```bash
   git clone YOUR_REPOSITORY_URL
   cd StudentManagement
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```env
   PORT=3000
   MONGO_URL=mongodb://localhost:27017/
   DB_NAME=StudentManagement
   SESSION_SECRET=your_random_secret
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Open http://localhost:3000 in your browser.

## Database Collections

- `mypercentage` — Student records
- `admin-users` — User accounts and profile information

## Author

**Nishchay Pratap Singh**  
MERN Stack Developer
