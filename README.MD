# Medico

Medico is a full-stack healthcare management platform designed to streamline doctor consultations, online medicine ordering, and medical service management through a role-based access control (RBAC) system. The platform supports patient services, appointment scheduling, medicine e-commerce with mock payments, admin moderation, and user feedback handling.

---

## Features

- Role-Based Access Control (User, Admin)
- Secure Authentication & Authorization (JWT-based)
- Doctor Appointment Booking System
- Online Medicine Ordering with Cart
- Mock Payment System (UPI / Card / COD)
- Order & Appointment History
- User Profile Management
- Feedback Submission System
- Admin Moderation Dashboard
- Pagination, Filtering & Sorting
- Responsive UI with Loaders & Empty States

---

## Tech Stack

### Frontend

- React.js
- React Router
- Plain CSS 

### Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt.js
- RBAC Middleware

### Database

- MongoDB Atlas (Cloud-hosted)

---

## RBAC Roles

### User

- Register & log in
- Browse doctors by specialization
- Book doctor appointments
- Order medicines online
- Make mock payments
- View order & appointment history
- Submit feedback
- Manage profile

### Admin

- Access admin dashboard
- Add / edit / delete doctors
- Add / edit / delete medicines
- View and manage appointments
- Update order status
- View user feedback
- Moderate platform data

---

## 📂 Project Structure

Medico/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── config/
│ ├── app.js
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── assets/
│ │ └── App.jsx
│ └── main.jsx
│
└── README.md

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | /register | Register a new user | ❌ |
| POST | /login | Authenticate user & return JWT | ❌ |
| GET | /me | Get logged-in user profile | ✅ |
| POST | /logout | Logout user (client-side token clear) | ❌ |

### Doctors

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | / | Get all doctors (filters & sorting) | ❌
| GET | /:id | Get doctor details | ❌
| POST | / | Add doctor (Admin only) | ✅
| PUT | /:id | Update doctor details | ✅
| DELETE | /:id | Delete doctor | ✅

### Appointments

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET |	/ | Get all doctors (filters & sorting)	| ❌
| GET | /:id |Get doctor details	| ❌
| POST | / |Add doctor (Admin only)	| ✅
| PUT | /:id |Update doctor details	| ✅
| DELETE | /:id |Delete doctor	| ✅

### Appointments

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | / | Get all doctors (filters & sorting)	| ❌
| GET | /:id |Get doctor details	| ❌
| POST | / 	|Add doctor (Admin only)	| ✅
| PUT | /:id	|Update doctor details	| ✅
| DELETE | /:id	|Delete doctor	| ✅
| POST | /	|Book an appointment	| ✅
| GET | /	|Get user appointments	| ✅
| PUT | /:id	|Update appointment status	| ✅

### Medicines

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | /	|Get medicines with pagination & filters	| ❌
| POST | /	|Add medicine (Admin only)	| ✅
| PUT | /:id	|Update medicine	| ✅
| DELETE | /:id	|Delete medicine	| ✅

### Orders

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | /	|Place order (after mock payment)	| ✅
| GET | /	|Get user order history	| ✅
| PUT | /:id/status	|Update order status (Admin)	| ✅

### Feedback

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | /	|Submit user feedback	| ❌
| GET | /	|View feedback (Admin only)	| ✅

---

## Mock Payment System      

- The payment system simulates a real-world checkout experience without processing real transactions.
- Payment methods: UPI, Card, Cash on Delivery (Mock)
- Successful payment creates an order
- Cart is cleared automatically
- Order appears in order history
- Designed so real gateways (Razorpay/Stripe) can be integrated later

---

## Chatbot Setup

The project includes a website chatbot powered by `@paramkhodiyar/chat-widget` (frontend) and a streaming API route at `/api/chat` (backend).

### Required backend environment variable

- `GROQ_API_KEY=your_groq_api_key`

Optional:

- `GROQ_MODEL=llama-3.3-70b-versatile`
- `GROQ_TEMPERATURE=0.4`
- `GROQ_MAX_TOKENS=700`

If `GROQ_API_KEY` is not set, the bot still opens and returns a fallback message so integration can be tested.

### Local development

- Start backend on port `5001`
- Start frontend on port `5173`
- Vite proxy forwards `/api/*` calls from frontend to backend

---

## Disclaimer

This project is intended for learning, development, and demonstration purposes only.
All payments are simulated, and no real medical or financial transactions occur.

---

## Made with ❤️ by Pratiti Paul 
[GitHub](https://github.com/Pratiti-paul)
