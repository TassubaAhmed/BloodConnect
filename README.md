# 🩸 BloodConnect — Blood Donor Matching Platform

A comprehensive full-stack platform connecting blood donors with recipients for emergency blood requests, featuring smart matching, real-time tracking, and administrative dashboards.

![BloodConnect](https://img.shields.io/badge/Status-Active-success)
![Tech](https://img.shields.io/badge/Stack-MERN-blue)
![Team](https://img.shields.io/badge/Team-Group%202-red)

---

## 👥 Team — Group 2

| Student ID | Name | Role |
|-----------|------|------|
| **22221120** | Tassuba Ahmed | Donor Management & Search |
| **24341065** | Jareen Tasnim Bushra | Blood Requests & Matching |
| **23301666** | Tasnuba Tabassum Ahona | Responses, Admin & Analytics |

---

## 📋 Feature Distribution

### 👤 Tassuba Ahmed (22221120) — Donor Management
1. Donor Profile Management
2. Health Information Management
3. Donor Availability Status
4. Donor Search & Filtering
5. Emergency Contact Information

**Files:**
- `backend/models/DonorProfile.js`
- `backend/models/User.js`
- `backend/routes/donors.js`
- `frontend/src/pages/DonorProfile.js`
- `frontend/src/pages/DonorSearch.js`
- `frontend/src/components/BloodGroupBadge.js`

---

### 👤 Jareen Tasnim Bushra (24341065) — Blood Requests
1. Emergency Blood Request Submission
2. Smart Donor Matching
3. Blood Compatibility Suggestions
4. Active Blood Request Dashboard
5. Blood Request Search & Filtering

**Files:**
- `backend/models/BloodRequest.js`
- `backend/routes/bloodRequests.js`
- `backend/config/db.js`
- `frontend/src/pages/BloodRequests.js`
- `frontend/src/pages/CreateBloodRequest.js`
- `frontend/src/pages/BloodRequestDetail.js`

---

### 👤 Tasnuba Tabassum Ahona (23301666) — Responses & Admin
1. Donate Response System
2. Request Status Tracking
3. Donation History
4. Admin Dashboard
5. Reports & Analytics

**Files:**
- `backend/models/DonationResponse.js`
- `backend/routes/admin.js`
- `backend/middleware/auth.js`
- `backend/seeds/seed.js`
- `frontend/src/pages/Dashboard.js`
- `frontend/src/pages/DonationHistory.js`
- `frontend/src/pages/AdminDashboard.js`
- `frontend/src/components/StatusBadge.js`

---

## 🚀 Features (15 Core + 3 Auth)

### Core Features
1. ✅ Donor Profile Management
2. ✅ Health Information Management
3. ✅ Donor Availability Status
4. ✅ Emergency Blood Request Submission
5. ✅ Smart Donor Matching
6. ✅ Blood Compatibility Suggestions
7. ✅ Active Blood Request Dashboard
8. ✅ Donor Search & Filtering
9. ✅ Blood Request Search & Filtering
10. ✅ Donate Response System
11. ✅ Request Status Tracking
12. ✅ Donation History
13. ✅ Emergency Contact Information
14. ✅ Admin Dashboard
15. ✅ Reports & Analytics

### Authentication (Shared)
- Registration (Donor/Recipient/Admin)
- Secure Login with JWT
- Session Management

---

## 🛠 Tech Stack

### Frontend
- **React 18** — UI library
- **React Router v6** — Client-side routing
- **Axios** — HTTP client
- **Lucide React** — Icons
- **CSS3** — Custom styling (no framework)

### Backend
- **Node.js + Express** — REST API server
- **MongoDB + Mongoose** — Database & ODM
- **JWT** — Authentication tokens
- **bcryptjs** — Password hashing
- **CORS** — Cross-origin support

---

## 📦 Project Structure

\`\`\`
BloodConnect/
├── backend/
│   ├── models/
│   │   ├── DonorProfile.js       ← Tassuba
│   │   ├── User.js               ← Tassuba
│   │   ├── BloodRequest.js       ← Jareen
│   │   └── DonationResponse.js   ← Tasnuba
│   ├── routes/
│   │   ├── donors.js             ← Tassuba
│   │   ├── bloodRequests.js      ← Jareen
│   │   └── admin.js              ← Tasnuba
│   ├── middleware/
│   │   └── auth.js               ← Tasnuba
│   ├── config/
│   │   └── db.js                 ← Jareen
│   └── seeds/
│       └── seed.js               ← Tasnuba
│
└── frontend/
    └── src/
        ├── pages/
        │   ├── DonorProfile.js       ← Tassuba
        │   ├── DonorSearch.js        ← Tassuba
        │   ├── BloodRequests.js      ← Jareen
        │   ├── CreateBloodRequest.js ← Jareen
        │   ├── BloodRequestDetail.js ← Jareen
        │   ├── Dashboard.js          ← Tasnuba
        │   ├── DonationHistory.js    ← Tasnuba
        │   └── AdminDashboard.js     ← Tasnuba
        └── components/
            ├── BloodGroupBadge.js    ← Tassuba
            └── StatusBadge.js        ← Tasnuba
\`\`\`

---

## 🔑 Blood Compatibility Chart

| Recipient | Compatible Donors |
|-----------|-------------------|
| **A+** | A+, A-, O+, O- |
| **A-** | A-, O- |
| **B+** | B+, B-, O+, O- |
| **B-** | B-, O- |
| **AB+** | Universal (All 8 groups) |
| **AB-** | A-, B-, AB-, O- |
| **O+** | O+, O- |
| **O-** | O- only |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/TassubaAhmed/BloodConnect.git
cd BloodConnect

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
\`\`\`

### Environment Setup

Create `backend/.env`:
\`\`\`env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blood_donor_platform
\`\`\`

### Run the Application

\`\`\`bash
# Terminal 1 — Seed the database
cd backend
npm run seed

# Terminal 2 — Start backend
npm run dev

# Terminal 3 — Start frontend
cd frontend
npm start
\`\`\`

Visit **http://localhost:3000**

---

## 🧪 Test Accounts

Password for all accounts: `password123`

| Role | Email |
|------|-------|
| 🔴 Admin | admin@gmail.com |
| 🟢 Donor | donor@gmail.com |
| 🔵 Recipient | recipient@gmail.com |

---

## 📸 Screenshots

### Homepage
Beautiful landing page with hero section, features, and team info.

### Dashboard
Role-based dashboard with real-time stats.

### Blood Request
Emergency request form with smart matching.

### Admin Panel
Complete platform analytics and user management.

---

## 🎨 Design Highlights

- **Minimalistic & Professional UI**
- **Red gradient theme** (#dc2626 → #b91c1c)
- **Smart matching algorithm**
- **Fully responsive** (mobile-first)
- **Accessibility-friendly**
- **Real-time notifications**

---

## 📝 API Endpoints Highlight

### Donor Management (Tassuba)
- `POST   /api/donors/profile` — Create/update profile
- `GET    /api/donors` — Search donors with filters
- `PATCH  /api/donors/availability` — Update availability

### Blood Requests (Jareen)
- `POST   /api/blood-requests` — Create request (auto-match)
- `GET    /api/blood-requests` — Filter by group/urgency
- `GET    /api/blood-requests/:id` — Get single with compatibility

### Responses & Admin (Tasnuba)
- `POST   /api/blood-requests/:id/respond` — Volunteer to donate
- `GET    /api/admin/stats` — Platform analytics
- `GET    /api/admin/users` — Manage users

---

## 🏆 Project Highlights

- ✨ **15 core features** implemented
- 🎯 **3-tier user roles** (Donor, Recipient, Admin)
- 🩸 **Smart blood matching** with compatibility logic
- 📊 **Real-time analytics** dashboard
- 🔒 **JWT-based authentication**
- 📱 **Fully responsive** design

---

## 👨‍💻 Contributing

This is a group academic project. Team members:
- Tassuba Ahmed
- Jareen Tasnim Bushra
- Tasnuba Tabassum Ahona

---

## 📄 License

Academic Project — BRAC University · 2024

---

**Made with ❤️ by Group 2 — BloodConnect Team**