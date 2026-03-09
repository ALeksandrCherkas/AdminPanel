🛠Portfolio Auth Dashboard

A Fullstack project built with React + TypeScript + Node.js + Express + PostgreSQL + Prisma.

This project features:
-User authentication and registration (JWT)
-RBAC (Role-Based Access Control) for Admins and regular users
-Admin dashboard with statistics and user management
-CRUD operations via API
-Form validation, toast notifications, and confirmation modals
-React Query for server state management

📁Project Structure:
/backend      # Node.js + Express + Prisma
  prisma/     # Database schema and migrations
  index.js    # Entry point
  prismaClient.js
/frontend     # React + TypeScript
  src/
    api/      # ApiClient, authApi, adminApi
    components/
    hooks/
    store/
    pages/
.env          # Environment variables (DO NOT commit!)
.gitignore
package.json

⚡Installation
1. Clone the repository
git clone https://github.com/USERNAME/REPO_NAME.git
cd REPO_NAME
2. Install dependencies

Backend:

cd backend
npm install

Frontend:

cd frontend
npm install
🖥 Database Setup

Install PostgreSQL.

Create a database:

CREATE DATABASE portfolio;

Create a .env file in backend/:

DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/portfolio
JWT_SECRET=some_long_secret_key

Apply Prisma migrations:

cd backend
npx prisma migrate dev

🚀 Running the Project
Backend
cd backend
npm run dev

Server runs at http://localhost:5000

Frontend
cd frontend
npm start

Frontend runs at http://localhost:3000

🔐 Features

Passwords are securely hashed using bcrypt

JWT tokens for authentication

RBAC: Only admins can view stats and manage users

Confirmation modals for delete actions
