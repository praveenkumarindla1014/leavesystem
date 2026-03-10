# Simple Leave Management System

A full-stack web application that allows **Employees** to apply for leave and **Employers** to approve or reject leave requests.

Built as an intern assignment for Hugki AI.

---

## 🛠 Tech Stack

| Layer      | Technology                                  |
| ---------- | ------------------------------------------- |
| Frontend   | Vue 3 (Composition API) + Vite              |
| Backend    | Node.js + Express.js                        |
| Database   | MongoDB Atlas (Mongoose ODM)                |
| Auth       | JSON Web Tokens (JWT) + bcrypt              |
| Validation | express-validator                           |
| Styling    | Vanilla CSS (premium dark glassmorphism)    |

---

## ✨ Features

### Core
- **Employee:** Apply for leave (Sick, Casual, PTO) with date range and reason.
- **Employee:** View personal leave history with real-time status.
- **Employer:** View all employee leave requests in a centralized dashboard.
- **Employer:** Approve or reject pending leave requests.

### Bonus Points ✅
- **JWT Authentication** – Secure, stateless sessions with bearer tokens.
- **Role-based Access Control** – Middleware restricts routes by role (employee/employer).
- **Input Validation** – Server-side validation using express-validator.
- **Error Handling** – Graceful error responses with meaningful messages.

---

## 📁 Project Structure

```
leave-management-system/
├── backend/
│   ├── controllers/        # Business logic
│   │   ├── authController.js
│   │   └── leaveController.js
│   ├── middleware/          # Auth & role guards
│   │   └── auth.js
│   ├── models/             # Mongoose schemas
│   │   ├── User.js
│   │   └── LeaveRequest.js
│   ├── routes/             # API route definitions
│   │   ├── authRoutes.js
│   │   └── leaveRoutes.js
│   ├── server.js           # Entry point
│   ├── .env                # Environment variables
│   └── package.json
└── frontend/
    └── src/
        ├── components/     # Reusable UI components
        │   └── Navbar.vue
        ├── views/          # Page-level views
        │   ├── Login.vue
        │   ├── Signup.vue
        │   ├── EmployeeDashboard.vue
        │   └── EmployerDashboard.vue
        ├── router/         # Vue Router with guards
        │   └── index.js
        ├── services/       # API layer (Axios)
        │   └── api.js
        ├── App.vue
        ├── main.js
        └── style.css
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works)

### 1. Clone the Repository
```bash
git clone <repo-url>
cd leave-management-system
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file and fill credentials:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/leaveManagement
JWT_SECRET=your_super_secret_key
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

## 📡 API Endpoints

| Method | Endpoint                 | Access    | Description                  |
| ------ | ------------------------ | --------- | ---------------------------- |
| POST   | `/api/auth/signup`       | Public    | Register a new user          |
| POST   | `/api/auth/login`        | Public    | Login and get JWT token      |
| POST   | `/api/leaves`            | Employee  | Apply for a new leave        |
| GET    | `/api/leaves`            | Auth'd    | Get leaves (role-scoped)     |
| PUT    | `/api/leaves/:id/status` | Employer  | Approve or reject a leave    |

---

## 🌐 Deployment

| Service  | Platform           |
| -------- | ------------------ |
| Backend  | Render / Railway   |
| Frontend | Vercel / Netlify   |
| Database | MongoDB Atlas      |

> Update the API base URL in `frontend/src/services/api.js` to point to your deployed backend URL before deploying the frontend.

---

## 📝 License

This project is built for the Hugki AI internship assignment.
