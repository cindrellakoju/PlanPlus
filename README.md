# PlanPlus - Task Management Application

A full-stack task management and scheduling application built with React, TypeScript, and Node.js/Express with MySQL database.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Environment Setup](#environment-setup)
- [Available Scripts](#available-scripts)
- [Documentation](#documentation)

---

## 🌟 Overview

PlanPlus is a comprehensive task management application that allows users to:
- Create and manage multiple task tables
- Schedule daily activities
- Track completed tasks
- Customize component layouts
- Choose from multiple theme options

---

## ✨ Features

### Frontend Features
- 🎨 **Multiple Themes** - Choose from three different UI themes
- 📅 **Calendar View** - Visual calendar for task overview
- 📊 **Dynamic Tables** - Create custom task tables
- ✅ **Task Management** - Add, edit, delete, and mark tasks complete
- 📱 **Responsive Design** - Works on desktop and mobile
- 🔐 **User Authentication** - Secure login and signup
- 💾 **Local Storage** - Cache data for offline access

### Backend Features
- 🔒 **JWT Authentication** - Secure token-based auth
- 🗄️ **MySQL Database** - Reliable data storage
- 🔑 **Password Hashing** - bcrypt encryption
- 🌐 **RESTful API** - Clean API architecture
- 📦 **CRUD Operations** - Complete data management
- 🕒 **Schedule Management** - Daily schedule tracking

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18.3
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS, Custom CSS
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Drag & Drop:** React Beautiful DnD

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MySQL
- **Authentication:** JWT
- **Password Hash:** bcryptjs

---

## 📦 Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **MySQL** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/)
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/cindrellakoju/PlanPlus.git
cd PlanPlus
```

### 2. Setup Backend
```bash
cd Backends
npm install

# Create .env file from example
cp .env.example .env

# Edit .env file with your actual values
# Update DB_PASSWORD and JWT_SECRET

# Start MySQL and create database
mysql -u root -p
CREATE DATABASE allmanager;
exit;

# Run backend
npm run dev
```

Backend will run on: `http://localhost:5000`

### 3. Setup Frontend
```bash
# Open a new terminal in project root
npm install

# Optional: Create .env file from example
cp .env.example .env

# Run frontend
npm run dev
```

Frontend will run on: `http://localhost:3000`

### 4. Initialize Database Tables
Visit: `http://localhost:5000/user/createtables` in your browser or use:
```bash
curl http://localhost:5000/user/createtables
```

---

## 📁 Project Structure

```
PlanPlus/
├── Backends/                    # Backend server
│   ├── src/
│   │   ├── config/             # Database config
│   │   ├── controllers/        # Route controllers
│   │   ├── models/             # Data models
│   │   ├── services/           # Business logic
│   │   ├── routes/             # API routes
│   │   ├── scripts/            # DB scripts
│   │   ├── types/              # TypeScript types
│   │   └── index.ts            # Entry point
│   ├── .env                    # Environment variables
│   ├── package.json
│   └── README.md               # Backend documentation
├── src/                        # Frontend source
│   ├── components/             # React components
│   │   ├── allrequire/        # Required components
│   │   ├── calender/          # Calendar components
│   │   ├── homepage/          # Home page components
│   │   ├── notLogin/          # Auth components
│   │   ├── smallcomponent/    # Reusable components
│   │   ├── themeone/          # Theme 1
│   │   ├── themetwo/          # Theme 2
│   │   └── themethree/        # Theme 3
│   ├── pages/                 # Page components
│   ├── context/               # React Context
│   ├── hooks/                 # Custom hooks
│   ├── services/              # API services
│   ├── routes/                # Route definitions
│   ├── styles/                # CSS files
│   ├── types/                 # TypeScript types
│   ├── utils/                 # Utility functions
│   └── App.tsx                # Root component
├── public/                     # Static assets
├── index.html                  # HTML template
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind config
├── package.json
└── README.md                  # This file
```

---

## 🏃 Running the Application

### Development Mode

**Backend:**
```bash
cd Backends
npm run dev
```
Server runs with hot-reload on `http://localhost:5000`

**Frontend:**
```bash
npm run dev
```
App runs with hot-reload on `http://localhost:3000`

### Production Build

**Frontend:**
```bash
npm run build
npm run preview
```

**Backend:**
```bash
cd Backends
npm run build
npm start
```

---

## 🔐 Environment Setup

### Backend `.env` (in `Backends/` folder)

1. Copy the example file:
   ```bash
   cd Backends
   cp .env.example .env
   ```

2. Update with your values:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_DATABASENAME=allmanager
   JWT_SECRET=your_jwt_secret_key_here
   ```

### Frontend `.env` (in root folder) - Optional

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Update if needed:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

**⚠️ Important:** 
- Never commit `.env` files to version control!
- `.env.example` files are provided as templates
- Generate a secure JWT secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

---

## 📜 Available Scripts

### Frontend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Scripts
```bash
npm run dev          # Start dev server with nodemon
npm run build        # Compile TypeScript
npm start            # Run compiled code
npm test             # Run tests
```

---

## 📚 Documentation

- **Backend API Documentation:** See [Backends/README.md](./Backends/README.md)
- **API Endpoints:** Full REST API documentation in backend README
- **Database Schema:** Check `Backends/src/scripts/dbtable.scripts.ts`

---

## 🎯 Key Features Guide

### 1. User Authentication
- Sign up with email and password
- Secure login with JWT tokens
- Password hashing with bcrypt

### 2. Task Management
- Create custom task tables
- Add, edit, and delete tasks
- Mark tasks as complete
- View task history

### 3. Schedule Management
- Daily schedule view
- Add tasks to specific days
- Update schedule entries
- Time-based task organization

### 4. Theme Customization
- Choose from 3 different themes
- Customizable component positions
- Responsive layout options

### 5. Calendar View
- Monthly calendar overview
- Date-based task filtering
- Visual task indicators

---

## 🐛 Troubleshooting

### Backend won't start
- Check if MySQL is running
- Verify database credentials in `.env`
- Ensure port 5000 is not in use

### Frontend won't connect to backend
- Verify backend is running on port 5000
- Check CORS settings in `Backends/src/index.ts`
- Ensure API URL is correct

### Database errors
- Run `http://localhost:5000/user/createtables` to create tables
- Check MySQL user permissions
- Verify database name is correct

### Build errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# For backend
cd Backends
rm -rf node_modules package-lock.json
npm install
```

---

## 🔒 Security Notes

- Always use HTTPS in production
- Keep JWT_SECRET secure and complex
- Never expose `.env` files
- Implement rate limiting in production
- Regularly update dependencies
- Use prepared statements (already implemented)

---

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend Deployment (Heroku/Railway)
- Set environment variables in hosting platform
- Use production MySQL database
- Enable SSL for database connections

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 👥 Authors

- **cindrellakoju** - *Initial work* - [GitHub](https://github.com/cindrellakoju)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the lightning-fast build tool
- Express.js community
- All open-source contributors

---

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

---

## 🔗 Links

- [Backend API Documentation](./Backends/README.md)
- [GitHub Repository](https://github.com/cindrellakoju/PlanPlus)
- [Report Issues](https://github.com/cindrellakoju/PlanPlus/issues)

---

## 📖 Project Overview

**Frontend:** PlanPlus frontend is a modern React application built with TypeScript and Vite, featuring a responsive task management interface with three customizable themes. It utilizes React Context API for state management, React Router for navigation, and React Beautiful DnD for drag-and-drop functionality. The application includes a calendar view, dynamic task tables, schedule management, and user authentication flows. It communicates with the backend through Axios HTTP requests and implements local storage caching for improved performance and offline capabilities.

**Backend:** The backend is a Node.js/Express RESTful API server that provides secure authentication, database management, and comprehensive CRUD operations. Built with TypeScript and MySQL, it features JWT-based authentication with bcrypt password hashing, dynamic table creation, schedule management, and task tracking. The architecture follows MVC patterns with clear separation between controllers, services, and models, ensuring maintainable and scalable code. All database queries use parameterized statements for security against SQL injection attacks.

---

**Happy Coding! 🎉**
