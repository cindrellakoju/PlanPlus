# PlanPlus Backend API

A Node.js/Express backend server for the PlanPlus task management application with MySQL database integration.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Database Setup](#database-setup)
- [Project Structure](#project-structure)

---

## ✨ Features

- User authentication with JWT tokens
- Password hashing with bcryptjs
- MySQL database integration
- Task and schedule management
- Dynamic table creation
- CRUD operations for user data
- Component position tracking
- Completed task tracking

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MySQL
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Environment Variables:** dotenv
- **CORS:** cors middleware

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **MySQL** (v8.0 or higher) - [Download here](https://dev.mysql.com/downloads/)
- **MySQL Workbench** (optional, for database management)

---

## 🚀 Installation

1. **Navigate to the backend directory:**
   ```bash
   cd Backends
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install TypeScript and development dependencies (if not already included):**
   ```bash
   npm install --save-dev typescript ts-node nodemon @types/node
   ```

---

## 🔐 Environment Variables

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file with your actual values:**

```env
# Server Configuration
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_DATABASENAME=allmanager

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
```

**Important Notes:**
- Replace `your_mysql_password` with your actual MySQL password
- Replace `your_jwt_secret_key_here` with a secure random string (at least 32 characters)
- Use a strong JWT secret in production (you can generate one with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- Never commit the `.env` file to version control
- The `.env.example` file is provided as a template

---

## 🏃 Running the Server

### Development Mode (with hot reload)
```bash
npm run dev
```
The server will start on `http://localhost:5000` with auto-reload on file changes.

### Production Mode
```bash
# Build TypeScript files
npm run build

# Start the server
npm start
```

### Verify Server is Running
You should see:
```
Successfully connected to MYSQL Database
[server]: Server is running at http://localhost:5000
```

---

## 📚 API Documentation

Base URL: `http://localhost:5000`

### 🔑 Authentication

#### Sign Up
```http
POST /user/signup
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user_id": 1
}
```

---

#### Login
```http
POST /user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "user_id": 1,
    "first_name": "John",
    "last_name": "Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 👤 User Management

#### Get All Users
```http
GET /user/
```

**Response:**
```json
[
  {
    "user_id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com"
  }
]
```

---

### 📊 Table Management

#### Get User's Table Names
```http
GET /user/tablename/:user_id
```

**Example:** `GET /user/tablename/1`

**Response:**
```json
[
  {
    "table_id": 1,
    "table_name": "My Tasks",
    "user_id": 1
  }
]
```

---

#### Get Table Columns
```http
POST /user/tablecolumn/:user_id
Content-Type: application/json

{
  "tablename": "My Tasks"
}
```

**Response:**
```json
[
  {
    "column_name": "task_name",
    "column_type": "VARCHAR(255)"
  }
]
```

---

#### Get Column Data
```http
POST /user/columndata/:user_id
Content-Type: application/json

{
  "tablename": "My Tasks"
}
```

**Response:**
```json
[
  {
    "data_id": 1,
    "task_name": "Complete project",
    "status": "pending"
  }
]
```

---

#### Get Table Info
```http
GET /user/tableinfo
```

---

#### Insert New Table Name
```http
POST /user/inserttablename/:user_id
Content-Type: application/json

{
  "table_name": "New Project Tasks"
}
```

---

#### Update Table Info
```http
PUT /user/updatetable/:user_id
Content-Type: application/json

{
  "table_id": 1,
  "table_name": "Updated Tasks"
}
```

---

### 📝 Data Operations (CRUD)

#### Insert Data into Table
```http
POST /user/insertdata/:user_id
Content-Type: application/json

{
  "tablename": "My Tasks",
  "value": {
    "task_name": "New Task",
    "description": "Task description",
    "status": "pending"
  }
}
```

---

#### Update Table Data
```http
PUT /user/updatedata/:user_id
Content-Type: application/json

{
  "tablename": "My Tasks",
  "data_id": 1,
  "value": {
    "status": "completed"
  }
}
```

---

#### Delete Table Data
```http
POST /user/deletedataoftable/:user_id
Content-Type: application/json

{
  "data_id": 1
}
```

---

### 📅 Schedule Management

#### Get Schedule by Day
```http
POST /user/schedule/:user_id
Content-Type: application/json

{
  "days": "monday"
}
```

**Response:**
```json
[
  {
    "specific_day_col_data_id": 1,
    "time": "09:00",
    "task": "Morning Meeting",
    "data_id": 1
  }
]
```

---

#### Add Schedule
```http
POST /user/addintoschedule
Content-Type: application/json

{
  "day": "monday",
  "value": {
    "time": "14:00",
    "task": "Team Standup"
  },
  "data_id": 1
}
```

---

#### Update Schedule
```http
PUT /user/updateintoschedule
Content-Type: application/json

{
  "day": "monday",
  "time": "15:00",
  "task": "Updated Meeting",
  "data_id": 1,
  "specific_day_col_data_id": 1
}
```

---

### ✅ Completed Tasks

#### Get Completed Tasks
```http
POST /user/completedtask/:user_id
Content-Type: application/json

{
  "status": "completed"
}
```

---

### 🎨 Component Positions

#### Get Component Positions
```http
GET /user/componentsposition
```

---

#### Update Component Position
```http
PUT /user/componentsposition/edit/:id
Content-Type: application/json

{
  "position_x": 100,
  "position_y": 200,
  "width": 300,
  "height": 400
}
```

---

### 🛠️ Database Setup Endpoints

#### Create All Tables
```http
GET /user/createtables
```
Creates all necessary database tables for the application.

---

#### Insert Initial Data
```http
GET /user/insert
```
Inserts default/initial data into the database.

---

#### Create Custom User Table
```http
POST /user/usercreatetable/:user_id
Content-Type: application/json

{
  "table_name": "custom_table",
  "columns": [
    {
      "name": "column1",
      "type": "VARCHAR(255)"
    }
  ]
}
```

---

## 🗄️ Database Setup

### Step 1: Create Database

Open MySQL and run:
```sql
CREATE DATABASE allmanager;
USE allmanager;
```

### Step 2: Initialize Tables

Option A - Using API endpoint:
```bash
# Start the server first, then:
curl http://localhost:5000/user/createtables
```

Option B - Manual setup:
The application will automatically create tables on first run, or you can check the `src/scripts/dbtable.scripts.ts` file for table schemas.

### Step 3: Insert Initial Data (Optional)
```bash
curl http://localhost:5000/user/insert
```

---

## 📁 Project Structure

```
Backends/
├── src/
│   ├── config/
│   │   └── db.config.ts          # Database connection configuration
│   ├── controllers/              # Route handlers
│   │   ├── signup.controller.ts
│   │   ├── crudondata.controller.ts
│   │   ├── schedule.controller.ts
│   │   └── ...
│   ├── models/                   # Data models
│   │   ├── usertable.model.ts
│   │   ├── crudondata.model.ts
│   │   └── ...
│   ├── services/                 # Business logic
│   │   ├── usertable.services.ts
│   │   ├── crudondata.services.ts
│   │   └── ...
│   ├── routes/
│   │   └── user.routes.ts        # API routes
│   ├── scripts/
│   │   ├── dbtable.scripts.ts    # Database table creation
│   │   └── dbinsert.scripts.ts   # Initial data insertion
│   ├── types/
│   │   └── todo.type.ts          # TypeScript type definitions
│   ├── utils/
│   │   └── converttable.utils.ts # Utility functions
│   └── index.ts                  # Server entry point
├── test/                         # Test files
├── .env                          # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🐛 Troubleshooting

### Database Connection Issues
- Verify MySQL is running: `mysql --version`
- Check credentials in `.env` file
- Ensure database `allmanager` exists

### Port Already in Use
- Change `PORT` in `.env` file
- Or kill the process using port 5000:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### TypeScript Errors
```bash
npm run build
```
Check for compilation errors and fix them.

---

## 📝 Notes

- Always use HTTPS in production
- Implement rate limiting for production
- Add proper error logging (Winston, Morgan)
- Use environment-specific configurations
- Regularly backup your database
- Keep dependencies updated

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👥 Authors

- Your Name - Initial work

---

## 🔗 Related

- [Frontend README](../README.md)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Express.js Guide](https://expressjs.com/)
