# Visitor Pass Management System

Production-focused MERN application for a visitor pass management interview assessment.

## Current Module

Module 1 is implemented:

- Login
- JWT authentication
- Password hashing
- Auth middleware
- Role middleware
- Protected frontend routes
- Persist login
- Logout

## Tech Stack

- Frontend: React, Vite, React Router DOM, Axios, TanStack React Query, React Hook Form, Zod, React Hot Toast
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, dotenv

## Local Setup

Install dependencies:

```bash
npm run install:all
```

Create environment files:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Start MongoDB locally or use MongoDB Atlas, then update `server/.env`.

Seed login users:

```bash
npm run seed --prefix server
```

Run the API:

```bash
npm run dev:server
```

Run the frontend:

```bash
npm run dev:client
```

## Demo Users

- Admin: `admin@example.com` / `Admin@123`
- Receptionist: `reception@example.com` / `Reception@123`
- Employee: `employee@example.com` / `Employee@123`

## API

Base URL: `/api/v1`

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| GET | `/health` | Public | Health check |
| POST | `/api/v1/auth/login` | Public | Login with email and password |
| GET | `/api/v1/auth/me` | Authenticated | Fetch current user |
| POST | `/api/v1/auth/logout` | Authenticated | Logout acknowledgement |

API error format:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

## Deployment

### Backend on Render

- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
  - `NODE_ENV=production`
  - `PORT`
  - `MONGO_URI`
  - `JWT_SECRET`
  - `JWT_EXPIRES_IN=7d`
  - `CLIENT_URL=https://your-frontend-domain`

### Frontend on Netlify or Vercel

- Root directory: `client`
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variables:
  - `VITE_API_BASE_URL=https://your-api-domain/api/v1`

## License

This project is licensed under the [MIT License](LICENSE).
