Visitor Pass Management System
📖 Project Overview

The Visitor Pass Management System is a full-stack MERN application developed to streamline visitor management within an organization. It enables receptionists to register visitors, employees to approve or reject visitor requests, and receptionists to manage visitor check-in and check-out while maintaining complete activity history and reports.

The project follows a secure Role-Based Access Control (RBAC) model and provides real-time dashboards, reports, and visitor tracking.

✨ Features
Authentication
JWT Authentication
Secure Login
Protected Routes
Session Persistence
Password Encryption (bcrypt)
Role-Based Access Control
Admin
Receptionist
Employee
Visitor Management
Register Visitor
Edit Visitor
Cancel Visitor
Search Visitors
Filter Visitors
View Visitor Details
Employee Approval
Pending Requests
Approve Visitor
Reject Visitor
Approval History
Check-In / Check-Out
Visitor Check-In
Visitor Check-Out
Status Tracking
Timestamp Recording
Dashboard
Live Statistics
Today's Visitors
Pending Requests
Approved Visitors
Checked-In Visitors
Checked-Out Visitors
Rejected Visitors
Reports
Daily Reports
Weekly Reports
Monthly Reports
Custom Date Range Reports
Activity History
Visitor Registered
Visitor Approved
Visitor Rejected
Visitor Checked-In
Visitor Checked-Out
Visitor Cancelled
Validation & Security
Server-side Validation
Client-side Validation
Centralized Error Handling
JWT Authorization
Protected APIs
Secure Password Hashing
🏗 Architecture
Client (React + Vite)
        │
Axios API
        │
Express REST API
        │
Service Layer
        │
MongoDB (Mongoose)
Backend Architecture
Routes
   ↓
Controllers
   ↓
Services
   ↓
Models
   ↓
MongoDB
Frontend Architecture
Pages
   ↓
Components
   ↓
Services
   ↓
API Layer
🛠 Tech Stack
Frontend
React 19
Vite
React Router DOM
Axios
TanStack React Query
React Hook Form
Zod
React Hot Toast
CSS3
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT
bcryptjs
Helmet
CORS
Express Validator
Tools
Git
GitHub
MongoDB Compass
VS Code
Postman
📁 Folder Structure
visitor-pass-management-system/

├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── constants/
│   └── public/
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── database/
│   │   └── utils/
│
├── docs/
├── screenshots/
├── README.md
├── LICENSE
└── package.json
🚀 Installation
Clone Repository
git clone <repository-url>

cd visitor-pass-management-system
Backend
cd server

npm install

npm run seed

npm run dev
Frontend
cd client

npm install

npm run dev
⚙ Environment Variables
Server (.env)
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
Client (.env)
VITE_API_BASE_URL=http://localhost:5000/api/v1
🔌 API Endpoints
Authentication
Method	Endpoint
POST	/api/v1/auth/login
GET	/api/v1/auth/me
POST	/api/v1/auth/logout
Employees
Method	Endpoint
GET	/api/v1/employees
Visitors
Method	Endpoint
GET	/api/v1/visitors
POST	/api/v1/visitors
PATCH	/api/v1/visitors/:id
PATCH	/api/v1/visitors/:id/cancel
Approvals
Method	Endpoint
GET	/api/v1/approvals/pending
GET	/api/v1/approvals/history
PATCH	/api/v1/approvals/:id/approve
PATCH	/api/v1/approvals/:id/reject
Check-In / Check-Out
Method	Endpoint
PATCH	/api/v1/checkin/:id
PATCH	/api/v1/checkout/:id
Dashboard
Method	Endpoint
GET	/api/v1/dashboard/admin
GET	/api/v1/dashboard/receptionist
GET	/api/v1/dashboard/employee
Reports
Method	Endpoint
GET	/api/v1/reports
Activity
Method	Endpoint
GET	/api/v1/activity
🔄 Business Workflow
Receptionist Login
        │
        ▼
Register Visitor
        │
        ▼
Status = PENDING
        │
        ▼
Employee Login
        │
        ▼
Approve / Reject
        │
        ▼
Receptionist
        │
        ▼
Check-In
        │
        ▼
Check-Out
        │
        ▼
Dashboard Updated
        │
        ▼
Reports Updated
        │
        ▼
Activity History Recorded
👤 Demo Credentials

Replace these with your seeded demo accounts before publishing.

Role	Email	Password
Admin	admin@example.com	********
Receptionist	reception@example.com	********
Employee	employee@example.com	********
🌐 Deployment
Backend
Render
MongoDB Atlas
Frontend
Vercel or Netlify
Environment

Update:

VITE_API_BASE_URL=https://your-backend-url/api/v1
📷 Screenshots

Include screenshots for:

Login Page
Admin Dashboard
Receptionist Dashboard
Employee Dashboard
Visitor Registration
Employee Approval
Check-In / Check-Out
Reports
Activity History

Example folder:

screenshots/

login.png

dashboard.png

visitor-registration.png

employee-approval.png

reports.png

activity-history.png
📄 License

This project is licensed under the MIT License.

🙏 Acknowledgements

Developed as part of a MERN Stack technical assessment to demonstrate full-stack development skills, secure authentication, role-based authorization, RESTful API design, responsive user interfaces, and modern software engineering best practices.