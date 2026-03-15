# 🎓 EduManage — Student Management System

A full-stack Student Management System built with **NestJS**, **TypeORM**, **PostgreSQL** on the backend and **HTML/CSS/Vanilla JavaScript** on the frontend. The frontend is served directly by the NestJS backend — no separate server needed.

---

## 📌 Features

- JWT-based Authentication (Login only — accounts created by Admin)
- Role-Based Access Control (Admin, Teacher, Student)
- Student Records Management (CRUD)
- Course Management (CRUD)
- Enrollment Management (Enroll, Status Update, Remove)
- Admin can create user accounts (student/teacher/admin)
- Swagger API Documentation
- Responsive Frontend UI
- Frontend served by NestJS (single port setup)

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
└── student-management-system/         # NestJS API Server + Frontend
    ├── public/                         # Frontend (served by NestJS)
    │   ├── index.html                  # Login page
    │   ├── dashboard.html              # Dashboard with stats
    │   ├── students.html               # Students management page
    │   ├── courses.html                # Courses management page
    │   ├── enrollment.html             # Enrollment management page
    │   ├── css/
    │   │   └── style.css               # Global styles
    │   └── js/
    │       └── api.js                  # Core helper (fetch, auth, permissions)
    │
    ├── src/
    │   ├── auth/                       # Authentication module
    │   │   ├── dto/                    # Register & Login DTOs
    │   │   ├── auth.controller.ts      # Auth routes
    │   │   ├── auth.service.ts         # Auth logic (bcrypt, JWT)
    │   │   ├── auth.module.ts          # Auth module
    │   │   ├── user.entity.ts          # User database entity
    │   │   ├── jwt.strategy.ts         # JWT validation strategy
    │   │   ├── jwt-auth.guard.ts       # JWT auth guard
    │   │   ├── roles.guard.ts          # Role-based access guard
    │   │   └── roles.decorator.ts      # @Roles() decorator
    │   │
    │   ├── students/                   # Students module
    │   │   ├── dto/
    │   │   │   └── create-student.dto.ts
    │   │   ├── student.entity.ts       # Student database entity
    │   │   ├── students.controller.ts  # Student routes
    │   │   ├── students.service.ts     # Student business logic
    │   │   └── students.module.ts
    │   │
    │   ├── courses/                    # Courses module
    │   │   ├── dto/
    │   │   │   └── create-course.dto.ts
    │   │   ├── course.entity.ts        # Course database entity
    │   │   ├── courses.controller.ts   # Course routes
    │   │   ├── courses.service.ts      # Course business logic
    │   │   └── courses.module.ts
    │   │
    │   ├── enrollment/                 # Enrollment module
    │   │   ├── dto/
    │   │   │   └── create-enrollment.dto.ts
    │   │   ├── enrollment.entity.ts    # Enrollment database entity
    │   │   ├── enrollment.controller.ts
    │   │   ├── enrollment.service.ts
    │   │   └── enrollment.module.ts
    │   │
    │   ├── app.module.ts               # Root module (DB connection)
    │   └── main.ts                     # Entry point (port 3000)
    │
    ├── .env                            # Environment variables (not pushed to GitHub)
    ├── .gitignore
    └── package.json
```

---

## 🗄️ Database Tables

| Table | Description |
|---|---|
| `users` | Login accounts (admin/teacher/student) |
| `students` | Student records with personal details |
| `courses` | Available courses |
| `enrollments` | Links students to courses with status |

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or above)
- [PostgreSQL](https://www.postgresql.org/) (running locally)
- [npm](https://www.npmjs.com/)

---

### 1. Clone the Repository
```bash
git clone https://github.com/dharunb576/Student_management_Sys.git
cd Student_management_Sys
```

---

### 2. Setup the Backend
```bash
cd student-management-system
npm install
```

Create a `.env` file inside `student-management-system/`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=student_management

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
```

> ⚠️ Make sure PostgreSQL is running and create the database:
> ```sql
> CREATE DATABASE student_management;
> ```

---

### 3. Start the Application
```bash
npm run start:dev
```

That's it! Everything runs on one port.

| URL | Description |
|---|---|
| `http://localhost:3000` | Frontend Login page |
| `http://localhost:3000/dashboard.html` | Dashboard |
| `http://localhost:3000/api-docs` | Swagger API docs |
| `http://localhost:3000/auth/login` | Login API endpoint |

---

## 🔐 First Time Setup

Register an admin account using Postman or Swagger:
```json
POST http://localhost:3000/auth/register
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

Then open `http://localhost:3000` and login with those credentials.

> ⚠️ After first admin is created, disable public registration by removing the register endpoint or restricting it to admin only.

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

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /auth/register | Register user (admin use only) |
| POST | /auth/login | Login and get JWT token |

### Students
| Method | Endpoint | Role Required |
|---|---|---|
| GET | /students | Any logged in |
| GET | /students/:id | Any logged in |
| POST | /students | Admin, Teacher |
| PUT | /students/:id | Admin, Teacher |
| DELETE | /students/:id | Admin only |

### Courses
| Method | Endpoint | Role Required |
|---|---|---|
| GET | /courses | Any logged in |
| GET | /courses/:id | Any logged in |
| POST | /courses | Admin, Teacher |
| PUT | /courses/:id | Admin, Teacher |
| DELETE | /courses/:id | Admin only |

### Enrollment
| Method | Endpoint | Description |
|---|---|---|
| GET | /enrollment | Get all enrollments |
| GET | /enrollment/student/:id | Get by student |
| GET | /enrollment/course/:id | Get by course |
| POST | /enrollment | Enroll a student |
| PUT | /enrollment/:id/status | Update status |
| DELETE | /enrollment/:id | Remove enrollment |

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run start:dev` | Start in development mode (auto-reload) |
| `npm run start` | Start normally |
| `npm run build` | Build the project |
| `npm run start:prod` | Start production build |
| `npm run lint` | Run ESLint |

---

## 👤 Author

**Dharun B** — [github.com/dharunb576](https://github.com/dharunb576)