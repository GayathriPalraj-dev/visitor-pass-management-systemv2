# Visitor Pass Management System

A production-oriented **MERN Stack Visitor Pass Management System** designed to manage the complete visitor lifecycle inside an organization — from visitor registration and employee approval to check-in, check-out, activity tracking, and reporting.

The application implements **JWT authentication, Role-Based Access Control (RBAC), server-side business-rule validation, RESTful APIs, MongoDB persistence, and role-specific dashboards**.

> Developed as part of a MERN Stack Technical Assessment.

---

## 🌐 Live Demo

**Frontend:**  
https://visitor-pass-management-systemv2-iota.vercel.app

**Backend API:**  
https://visitor-pass-management-systemv2.onrender.com

**Source Code:**  
https://github.com/GayathriPalraj-dev/visitor-pass-management-systemv2

---

## 📌 Project Overview

The Visitor Pass Management System provides a structured workflow for organizations to manage visitors securely and efficiently.

The system supports three primary roles:

| Role | Responsibilities |
|---|---|
| **Administrator** | Manage employees/users, view dashboards, reports and activity history |
| **Receptionist** | Register visitors, search visitors, check-in/check-out and manage visitor records |
| **Employee** | Review visitor requests and approve/reject requests with remarks |

### Core Workflow

```text
Receptionist
     │
     ▼
Register Visitor
     │
     ▼
PENDING
     │
     ▼
Employee Reviews Request
     │
     ├──────────────┐
     ▼              ▼
  APPROVED       REJECTED
     │
     ▼
Receptionist Checks In
     │
     ▼
CHECKED_IN
     │
     ▼
Receptionist Checks Out
     │
     ▼
CHECKED_OUT
     │
     ▼
Activity History + Reports
```

---

# ✨ Features

## 🔐 Authentication & Authorization

- JWT-based authentication
- Secure login
- Password hashing with `bcryptjs`
- Protected frontend routes
- Protected backend APIs
- Role-Based Access Control
- Session persistence
- Unauthorized access prevention
- Centralized authentication handling

---

## 👥 Role-Based Access Control

### Administrator

- View overall dashboard
- Manage employees
- Manage user accounts
- View visitor reports
- View activity history

### Receptionist

- Register visitors
- Edit visitor requests
- Cancel visitor requests
- Search visitors
- Filter visitors
- View visitor history
- Check in visitors
- Check out visitors

### Employee

- View assigned visitor requests
- View pending approvals
- Approve visitor requests
- Reject visitor requests
- Add remarks
- View approval history

---

# 🚶 Visitor Management

The system supports the complete visitor lifecycle:

- Register visitor
- Assign employee
- Schedule visit
- Edit visitor request
- Cancel visitor request
- Search visitors
- Filter visitors
- View visitor details
- Track visitor status
- Maintain visitor history

### Visitor Status Lifecycle

```text
PENDING
   │
   ├──► APPROVED
   │       │
   │       ▼
   │   CHECKED_IN
   │       │
   │       ▼
   │   CHECKED_OUT
   │
   ├──► REJECTED
   │
   └──► CANCELLED
```

---

# ✅ Business Rules

The application implements the visitor-management rules defined by the assessment.

1. A visitor cannot have more than one active visit at the same time.
2. Duplicate visitor registrations for the same visitor on the same date are not allowed.
3. Visit date cannot be earlier than the current date.
4. For today's registrations, expected arrival time cannot be earlier than the current time.
5. An employee cannot have more than three pending visitor requests awaiting approval.
6. Visitors can only be checked in after approval.
7. A visitor who is already checked in cannot be checked in again until checked out.
8. Check-out time must always be later than check-in time.
9. Rejected visitor requests cannot be checked in.
10. Cancelled visits should not appear in active visitor lists.

---

# 📊 Dashboards

Each role receives a role-specific dashboard.

### Dashboard Statistics

- Pending Requests
- Today's Visitors
- Approved Visitors
- Rejected Visitors
- Checked-In Visitors
- Checked-Out Visitors
- Visitors Currently Inside
- Total Employees
- Scheduled Visitors

---

# 📈 Reports

The application provides visitor statistics through:

- Daily reports
- Weekly reports
- Monthly reports
- Custom date-range reports
- Visitor status statistics
- Approval statistics
- Check-in/check-out statistics

---

# 📝 Activity History

Important visitor lifecycle actions are recorded.

Supported activities include:

```text
Visitor Registered
       ↓
Visitor Approved / Rejected
       ↓
Visitor Checked-In
       ↓
Visitor Checked-Out
```

Other supported events include:

- Cancelled
- Approval actions
- Check-in actions
- Check-out actions

Each activity records:

- Action performed
- Date & time
- User who performed the action

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │     React + Vite     │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                             Axios
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Express REST API   │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │    Middleware        │
                    │ Auth + RBAC +        │
                    │ Validation + Errors  │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │    Controllers       │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │      Services        │
                    │ Business Rules       │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │    Mongoose Models   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      MongoDB         │
                    └──────────────────────┘
```

### Backend Architecture

```text
Routes
  ↓
Middleware
  ↓
Controllers
  ↓
Services
  ↓
Models
  ↓
MongoDB
```

### Frontend Architecture

```text
Pages
  ↓
Layouts / Components
  ↓
Hooks / Contexts
  ↓
Services
  ↓
Axios API Layer
  ↓
REST API
```

---

# 🛠️ Technology Stack

## Frontend

- React 19
- Vite
- React Router DOM
- Axios
- TanStack React Query
- React Hook Form
- Zod
- React Hot Toast
- CSS3

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Helmet
- CORS
- Express Validator

## Development & Deployment Tools

- Git
- GitHub
- VS Code
- Postman
- MongoDB Compass
- Vercel
- Render
- MongoDB Atlas

---

# 📁 Project Structure

```text
visitor-pass-management-systemv2/
│
├── client/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── contexts/
│       ├── hooks/
│       ├── layouts/
│       ├── pages/
│       ├── routes/
│       ├── services/
│       ├── utils/
│       └── constants/
│
├── server/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── services/
│       ├── validators/
│       ├── database/
│       ├── seed/
│       └── utils/
│
├── docs/
├── screenshots/
├── README.md
├── LICENSE
└── package.json
```

---

# 🚀 Getting Started

## Prerequisites

- Node.js 18+
- npm
- MongoDB or MongoDB Atlas
- Git

## 1. Clone Repository

```bash
git clone https://github.com/GayathriPalraj-dev/visitor-pass-management-systemv2.git
cd visitor-pass-management-systemv2
```

## 2. Backend Setup

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
CLIENT_URL=http://localhost:5173
```

Run the seed script if required:

```bash
npm run seed
```

Start the backend:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

## 3. Frontend Setup

Open another terminal:

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# ⚙️ Environment Variables

## Server

```env
PORT=
MONGO_URI=
JWT_SECRET=
CLIENT_URL=
```

## Client

```env
VITE_API_BASE_URL=
```

> Never commit `.env` files, database credentials, JWT secrets, or production passwords to GitHub.

---

# 🔌 API Overview

The backend exposes RESTful APIs under:

```text
/api/v1
```

## Authentication

| Method | Endpoint |
|---|---|
| POST | `/auth/login` |
| GET | `/auth/me` |
| POST | `/auth/logout` |

## Employees

| Method | Endpoint |
|---|---|
| GET | `/employees` |

## Visitors

| Method | Endpoint |
|---|---|
| GET | `/visitors` |
| POST | `/visitors` |
| PATCH | `/visitors/:id` |
| PATCH | `/visitors/:id/cancel` |

## Approvals

| Method | Endpoint |
|---|---|
| GET | `/approvals/pending` |
| GET | `/approvals/history` |
| PATCH | `/approvals/:id/approve` |
| PATCH | `/approvals/:id/reject` |

## Check-In / Check-Out

| Method | Endpoint |
|---|---|
| PATCH | `/checkin/:id` |
| PATCH | `/checkout/:id` |

## Dashboards

| Method | Endpoint |
|---|---|
| GET | `/dashboard/admin` |
| GET | `/dashboard/receptionist` |
| GET | `/dashboard/employee` |

## Reports

| Method | Endpoint |
|---|---|
| GET | `/reports` |

## Activity

| Method | Endpoint |
|---|---|
| GET | `/activity` |

---

# 🔐 Security

- JWT authentication
- Password hashing using bcrypt
- Role-based authorization
- Protected REST APIs
- Server-side validation
- Client-side validation
- Centralized error handling
- Helmet security headers
- CORS configuration
- Environment-based secrets
- Business-rule enforcement on the server

---

# 🧪 Validation & Testing

The project has been validated through:

- Frontend linting
- Frontend production build
- Backend syntax validation
- Authentication testing
- Role-based access testing
- Visitor registration testing
- Approval workflow testing
- Check-in/check-out testing
- Activity history verification
- Production API workflow testing

### End-to-End Workflow

```text
Login
 ↓
Register Visitor
 ↓
Visitor = PENDING
 ↓
Employee Login
 ↓
Approve Visitor
 ↓
Visitor = APPROVED
 ↓
Receptionist Login
 ↓
Check-In
 ↓
Visitor = CHECKED_IN
 ↓
Check-Out
 ↓
Visitor = CHECKED_OUT
 ↓
Activity History Updated
```

---

# 🌍 Deployment

## Frontend

**Platform:** Vercel

Live application:

https://visitor-pass-management-systemv2-iota.vercel.app

## Backend

**Platform:** Render

Backend API:

https://visitor-pass-management-systemv2.onrender.com

## Database

**Platform:** MongoDB Atlas

The production backend uses MongoDB Atlas for persistent application data.

---

# 📸 Screenshots

Recommended screenshots for the assessment submission:

```text
screenshots/
├── login.png
├── admin-dashboard.png
├── receptionist-dashboard.png
├── employee-dashboard.png
├── visitor-registration.png
├── visitor-list.png
├── employee-approval.png
├── check-in.png
├── check-out.png
├── reports.png
└── activity-history.png
```

---

# 📋 Assessment Requirements Coverage

| Requirement | Status |
|---|---|
| MERN Stack | ✅ |
| Authentication | ✅ |
| Role-Based Access Control | ✅ |
| Administrator Role | ✅ |
| Receptionist Role | ✅ |
| Employee Role | ✅ |
| Visitor Registration | ✅ |
| Employee Approval | ✅ |
| Visitor Rejection | ✅ |
| Check-In | ✅ |
| Check-Out | ✅ |
| Search & Filtering | ✅ |
| Reports | ✅ |
| Activity History | ✅ |
| Input Validation | ✅ |
| Error Handling | ✅ |
| Responsive UI | ✅ |
| MongoDB Persistence | ✅ |
| REST API | ✅ |

---

# 👤 Demo Accounts

For security reasons, **production passwords are not published in this README**.

The application supports these roles:

```text
Administrator
admin@example.com

Receptionist
reception@example.com

Employee
employee@example.com
```

For local development, configure the seed credentials through environment variables.

> Do not publish production passwords or secrets in the repository.

---

# 🎯 Assessment Objective

This project demonstrates practical skills in:

- Full-stack MERN development
- REST API design
- MongoDB data modeling
- Business-rule implementation
- Authentication and authorization
- Role-Based Access Control
- React application architecture
- API integration
- Form validation
- Error handling
- Production deployment
- Maintainable software architecture

---

# 👩‍💻 Author

**Gayathri Palraj**

BE Computer Science & Engineering  
MERN Stack Developer  
Chennai, Tamil Nadu, India

**GitHub:**  
https://github.com/GayathriPalraj-dev

---

# 📄 License

This project is licensed under the **MIT License**.

---

## 🙏 Acknowledgement

Developed as part of a **MERN Stack Technical Assessment** to demonstrate full-stack application development, secure authentication, role-based authorization, RESTful API design, MongoDB data modeling, business-rule enforcement, and production deployment.
