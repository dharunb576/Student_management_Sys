# 🎓 EduManage — Student Management System

A full-stack Student Management System built with **NestJS**, **TypeORM**, **PostgreSQL** on the backend and **HTML/CSS/Vanilla JavaScript** on the frontend.

---

## 📌 Features

- JWT-based Authentication (Login / Register)
- Role-Based Access Control (Admin, Teacher, Student)
- Student Records Management (CRUD)
- Course Management (CRUD)
- Enrollment Management (Enroll, Status Update, Remove)
- Swagger API Documentation
- Responsive Frontend UI

---

## 🛠️ Tech Stack

### Backend
| Tech | Purpose |
|---|---|
| NestJS | Backend framework |
| TypeScript | Programming language |
| TypeORM | ORM for database |
| PostgreSQL | Relational database |
| JWT | Authentication tokens |
| Passport.js | Auth middleware |
| bcrypt | Password hashing |
| class-validator | Input validation |
| Swagger | API documentation |

### Frontend
| Tech | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling |
| Vanilla JavaScript | Logic & API calls |
| Fetch API | HTTP requests to backend |
| localStorage | Token storage |

---

## 📁 Project Structure

```
Student management/
├── student-management-backend/     # NestJS API Server
│   ├── src/
│   │   ├── auth/                   # Authentication (login, register, JWT, guards)
│   │   ├── students/               # Student CRUD
│   │   ├── courses/                # Course CRUD
│   │   ├── enrollment/             # Enrollment management
│   │   ├── app.module.ts           # Root module (DB connection)
│   │   └── main.ts                 # Entry point (port 3000)
│   ├── .env                        # Environment variables (not pushed to GitHub)
│   └── package.json
│
└── student-management-frontend/    # Plain HTML Frontend
    ├── index.html                  # Login page
    ├── dashboard.html              # Dashboard with stats
    ├── students.html               # Students management page
    ├── courses.html                # Courses management page
    ├── enrollment.html             # Enrollment management page
    ├── css/
    │   └── style.css               # Global styles
    └── js/
        └── api.js                  # Core helper (fetch, auth, permissions)
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/) (v18 or above)
- [PostgreSQL](https://www.postgresql.org/) (running locally)
- [npm](https://www.npmjs.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/dharunb576/Student_management_Edu.git
cd Student_management_Edu
```

---

### 2. Setup the Backend

```bash
cd student-management-backend
npm install
```

Create a `.env` file inside `student-management-backend/` folder:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=student_management

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
```

> ⚠️ Make sure PostgreSQL is running and a database named `student_management` is created.
> You can create it by running this in pgAdmin or psql:
> ```sql
> CREATE DATABASE student_management;
> ```

Start the backend server:

```bash
npm run start:dev
```

Backend runs at: **http://localhost:3000**

Swagger API Docs: **http://localhost:3000/api-docs**

---

### 3. Setup the Frontend

No installation needed! Just open the HTML files directly in your browser.

- Open `student-management-frontend/index.html` in your browser
- Or use VS Code Live Server extension for a better experience

---

## 👥 User Roles & Permissions

| Permission | Admin | Teacher | Student |
|---|---|---|---|
| View students/courses/enrollments | ✅ | ✅ | ✅ |
| Create students/courses | ✅ | ✅ | ❌ |
| Edit students/courses | ✅ | ✅ | ❌ |
| Delete students/courses | ✅ | ❌ | ❌ |
| Enroll students | ✅ | ✅ | ❌ |
| Update enrollment status | ✅ | ✅ | ❌ |
| Create user accounts | ✅ | ❌ | ❌ |

---

## 🔐 API Endpoints

### Auth
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | /auth/register | Register a new user | No |
| POST | /auth/login | Login and get JWT token | No |

### Students
| Method | Endpoint | Description | Role Required |
|---|---|---|---|
| GET | /students | Get all students | Any logged in |
| GET | /students/:id | Get student by ID | Any logged in |
| POST | /students | Create student | Admin, Teacher |
| PUT | /students/:id | Update student | Admin, Teacher |
| DELETE | /students/:id | Delete student | Admin only |

### Courses
| Method | Endpoint | Description | Role Required |
|---|---|---|---|
| GET | /courses | Get all courses | Any logged in |
| GET | /courses/:id | Get course by ID | Any logged in |
| POST | /courses | Create course | Admin, Teacher |
| PUT | /courses/:id | Update course | Admin, Teacher |
| DELETE | /courses/:id | Delete course | Admin only |

### Enrollment
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | /enrollment | Get all enrollments | Yes |
| GET | /enrollment/student/:id | Get enrollments by student | Yes |
| GET | /enrollment/course/:id | Get enrollments by course | Yes |
| POST | /enrollment | Enroll a student | Yes |
| PUT | /enrollment/:id/status | Update enrollment status | Yes |
| DELETE | /enrollment/:id | Remove enrollment | Yes |

---

## 🧪 First Time Login

After starting the backend, register an admin account using Swagger or Postman:

```json
POST /auth/register
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

Then login:

```json
POST /auth/login
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

Copy the `access_token` from the response and use it in the frontend login page.

---

## 📜 Available Scripts (Backend)

| Command | Description |
|---|---|
| `npm run start:dev` | Start in development mode (auto-reload) |
| `npm run start` | Start normally |
| `npm run build` | Build the project |
| `npm run start:prod` | Start production build |
| `npm run test` | Run tests |
| `npm run lint` | Run ESLint |

---

## 👤 Author

**Dharun B** — [github.com/dharunb576](https://github.com/dharunb576)
