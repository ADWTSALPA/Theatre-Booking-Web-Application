<div align="center">

# 🎭 Theatre Booking Web App

### *Κλείσε θέση για την αγαπημένη σου παράσταση*

A full-stack web application for browsing theatre performances and booking seats online — with live availability, secure authentication, and self-service reservation management.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)
![MariaDB](https://img.shields.io/badge/MariaDB-10.4+-003545?style=flat-square&logo=mariadb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-Educational-blue?style=flat-square)

[Demo](#-demo) • [Features](#-features) • [Quick Start](#-quick-start) • [API](#-api-reference) • [Architecture](#-architecture)

</div>

---

##  Table of Contents

- [Overview](#-overview)
- [Demo](#-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [Database Schema](#-database-schema)
- [API Reference](#-api-reference)
- [Authentication & Security](#-authentication--security)
- [Testing with Postman](#-testing-with-postman)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

##  Overview

**Theatre Booking** is a modern, full-stack web application that brings theatre reservations online. Built as part of a Mobile & Distributed Systems coursework, the project demonstrates a complete three-tier architecture with React, Node.js/Express, and MariaDB.

---

##  Demo

| Login & Sign Up | Browse Theatres & Shows |
|:---:|:---:|
| ![Login] | ![Browse] |
| Tab switch · JWT auth · localStorage token | Cards with badges · Search bar |

| Seat Selection | Reservation Management |
|:---:|:---:|
| ![Seats] | ![Reservations] |
| Interactive grid · Legend · Multi-select | Live status · Cancel button |


---

##  Features

### For users
-  **Registration & Login** — secure account creation with hashed passwords
- **Unified search** — single search bar across theatre, location, and show title
- **Browse shows** — see theatre, location, duration, and age rating
-  **View showtimes** — pick from available dates, times, and halls
-  **Interactive seat selection** — color-coded grid with live availability
- **Multi-seat booking** — reserve several seats in one atomic transaction
-  **My Reservations** — view, manage, and cancel personal bookings
- **Smart cancellation** — only future shows can be cancelled

### Under the hood
-  **Database transactions** prevent race conditions on concurrent bookings
-  **Stateless JWT** authentication with automatic axios interceptor
-  **Modern UI** with dark theme, gold accents, and responsive layout
-  **Image-ready frontend** with graceful placeholders when images are missing
-  **Hot Module Replacement** for fast development (Vite)

---

##  Tech Stack

<table>
<tr>
<td valign="top" width="33%">

### Frontend
- **React 18** — UI with hooks
- **Vite** — build & dev server
- **Axios** — HTTP client
- **Vanilla CSS** — custom dark theme

</td>
<td valign="top" width="33%">

### Backend
- **Node.js** — runtime
- **Express** — REST API
- **mysql2/promise** — DB driver (works with MariaDB)
- **CORS** — cross-origin

</td>
<td valign="top" width="33%">

### Security & Data
- **bcrypt** — password hashing
- **jsonwebtoken** — JWT auth
- **dotenv** — env config
- **MariaDB 10.4+** — RDBMS

</td>
</tr>
</table>

---

## 🏗 Architecture

Three-tier client-server architecture with clean separation of concerns:

```
┌──────────────────┐         HTTP/REST         ┌──────────────────┐         SQL          ┌──────────────────┐
│                  │ ─────── JSON ──────────▶  │                  │ ─────── Queries ──▶ │                  │
│    FRONTEND      │                           │     BACKEND      │                     │     DATABASE     │
│  React + Vite    │                           │  Node + Express  │                     │     MariaDB      │
│                  │ ◀────── JWT in ─────────  │                  │ ◀──── Rows ────────│                  │
│   (port 5173)    │   Authorization header    │   (port 5000)    │                     │   (port 3306)    │
└──────────────────┘                           └──────────────────┘                     └──────────────────┘
```

### Backend layered pattern

```
HTTP Request
     │
     ▼
┌─────────────┐     ┌──────────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────┐
│   Routes    │ ──▶ │  Middleware  │ ──▶ │ Controllers  │ ──▶ │   Services  │ ──▶ │ Database │
│ (Express)   │     │ (JWT verify) │     │ (req/res)    │     │ (logic)     │     │ (MariaDB)│
└─────────────┘     └──────────────┘     └──────────────┘     └─────────────┘     └──────────┘
```

**Benefits:**
- Easy to test each layer in isolation
- Refactoring or swapping the DB doesn't touch the routes
- Clear responsibilities — no business logic in controllers, no SQL in services that doesn't belong

---

## 📁 Project Structure

```
theatre-booking/
├── backend/
│   ├── config/
│   │   └── db.js                       # MariaDB connection pool
│   ├── controllers/
│   │   ├── authController.js           # HTTP layer (req/res)
│   │   ├── theatreController.js
│   │   ├── showController.js
│   │   └── reservationController.js
│   ├── middleware/
│   │   └── authMiddleware.js           # JWT verification
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── theatreRoutes.js
│   │   ├── showRoutes.js
│   │   ├── showtimes.js
│   │   ├── seats.js
│   │   └── reservationRoutes.js
│   ├── services/
│   │   ├── authService.js              # Business logic
│   │   ├── theatreService.js
│   │   ├── showService.js
│   │   └── reservationService.js
│   ├── sql/
│   │   ├── schema.sql                  # CREATE TABLE statements
│   │   └── seed.sql                    # Sample data
│   ├── .env                            # (gitignored)
│   ├── package.json
│   └── server.js                       # Express entry point
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── App.jsx                     # Main React component
│   │   ├── App.css
│   │   ├── api.js                      # Axios instance + interceptor
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   ├── screenshots/                    # UI screenshots
│   └── Theatre_Booking_Presentation.pptx
│
├── postman/
│   ├── Theatre_Booking_API.postman_collection.json
│   └── Theatre_Booking_Environment.postman_environment.json
│
├── .gitignore
└── README.md
```

---

##  Quick Start

### Prerequisites

| Tool | Version | Download |
|------|---------|----------|
| Node.js | 18+ | [nodejs.org](https://nodejs.org/) |
| MariaDB | 10.4+ | [mariadb.org](https://mariadb.org/download/) |
| npm | 9+ | ships with Node.js |

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/theatre-booking.git
cd theatre-booking
```

###  Set up the database

Open the MariaDB CLI and create the database:

```bash
mariadb -u root -p -e "CREATE DATABASE theatre_booking CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

Then load the schema and seed data:

```bash
mariadb -u root -p theatre_booking < backend/sql/schema.sql
mariadb -u root -p theatre_booking < backend/sql/seed.sql
```

###  Configure backend

Create `backend/.env`:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=theatre_booking

JWT_SECRET=replace_me_with_a_long_random_string
```

###  Install dependencies & start backend

```bash
cd backend
npm install
npm start
```

You should see:
```
Server running on port 5000
```

###  Install dependencies & start frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

###  Open in browser

Navigate to **http://localhost:5173** — register an account, browse, and start booking! 🎉

---

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Backend server port | `5000` |
| `DB_HOST` | MariaDB host | `localhost` |
| `DB_USER` | MariaDB username | `root` |
| `DB_PASSWORD` | MariaDB password | `mypassword` |
| `DB_NAME` | Database name | `theatre_booking` |
| `JWT_SECRET` | Signing key for JWTs (use a long random string!) | `a8f5f167f44f...` |

> 

---

## 🗄 Database Schema

### Entity overview

| Table | Description |
|-------|-------------|
| `users` | Registered accounts with hashed passwords |
| `theatres` | Physical theatres (name, location) |
| `shows` | Performances belonging to a theatre |
| `showtimes` | Specific dates/times when a show plays |
| `seats` | Per-showtime seat inventory with `is_reserved` flag |
| `reservations` | A user's booking for a showtime |
| `reservation_seats` | Join table linking reservations to seats |

### Relationships

```
users ───────────1:N─────────▶ reservations
theatres ────────1:N─────────▶ shows
shows ───────────1:N─────────▶ showtimes
showtimes ───────1:N─────────▶ seats
reservations ────N:M─────────▶ seats     (via reservation_seats)
```

### Schema highlights

- All tables use `utf8mb4` to support Greek and emoji characters
- Primary keys are auto-increment integers
- Seats are scoped per **showtime** (not per hall), so availability is tracked per individual performance
- `reservation_seats` has its own surrogate PK (`reservation_seat_id`) plus the two FKs

---

## 🔌 API Reference

Base URL: `http://localhost:5000`

### Authentication

| Method | Endpoint | Auth | Description |
|:------:|----------|:----:|-------------|
| `POST` | `/auth/register` | — | Create a new account |
| `POST` | `/auth/login` | — | Authenticate and receive a JWT token |
| `GET` | `/auth/profile` | 🔒 | Get current user's profile |

### Theatres

| Method | Endpoint | Description |
|:------:|----------|-------------|
| `GET` | `/theatres` | List all theatres |
| `GET` | `/theatres?q=Αθήνα` | Search across name, location, description (LIKE %q%) |

### Shows

| Method | Endpoint | Description |
|:------:|----------|-------------|
| `GET` | `/shows` | List all shows (joined with theatre info) |
| `GET` | `/shows?q=Οιδίπους` | Search across title, theatre name, and location |
| `GET` | `/shows?theatreId=1` | Filter by exact theatre ID |
| `GET` | `/shows/:id` | Get a single show by ID |

### Showtimes & Seats

| Method | Endpoint | Description |
|:------:|----------|-------------|
| `GET` | `/showtimes?showId=1` | List showtimes for a show |
| `GET` | `/seats/:showtimeId` | List seats with availability |

### Reservations 

| Method | Endpoint | Description |
|:------:|----------|-------------|
| `POST` | `/reservations` | Create a reservation (transactional) |
| `GET` | `/reservations/my` | List current user's reservations |
| `DELETE` | `/reservations/:id` | Cancel a reservation (future-only) |

### Example: Create a reservation

```http
POST /reservations
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "showtime_id": 1,
  "seats": [12, 13, 14]
}
```

**Response (201 Created):**
```json
{
  "message": "Reservation created successfully",
  "reservationId": 23
}
```

**Error (400) if seats are taken:**
```json
{
  "message": "Some seats are already reserved"
}
```

---

##  Authentication & Security

### JWT Authentication Flow

```
1. User submits credentials  →  POST /auth/login
2. Server verifies password   →  bcrypt.compare(plain, hash)
3. Server signs a JWT         →  jwt.sign(payload, secret, { expiresIn: '1h' })
4. Client stores token        →  localStorage
5. Axios adds header          →  Authorization: Bearer <token>
6. Middleware verifies        →  jwt.verify(token, secret)
7. req.user is populated      →  Services use req.user.userId
```

### Security measures

| Concern | Mitigation |
|---------|------------|
|  Plain-text passwords | **bcrypt** hashing with 10 salt rounds |
|  Session hijacking | **Short-lived JWTs** (1 hour expiration) |
|  SQL injection | **Parameterized queries** everywhere (no string concatenation) |
|  Race conditions on booking | **Database transactions** with rollback on conflict |
|  DB connection exhaustion | **Connection pool** (limit: 10) |
|  Cross-origin attacks | **CORS** middleware configured |

---

##  Testing with Postman

A complete Postman collection is provided in `postman/`:

1. Open **Postman**
2. Click **Import** → drop both JSON files:
   - `Theatre_Booking_API.postman_collection.json`
   - `Theatre_Booking_Environment.postman_environment.json`
3. Select the **"Theatre Booking — Local"** environment (top-right dropdown)
4. Run **Auth → Login** first
   - The included test script auto-saves the JWT to `{{token}}`
5. Try any request — `{{token}}` is automatically used for protected endpoints

The collection includes ready-to-run examples for:
- ✅ Unified search (`?q=Αθήνα`, `?q=Εθνικό`, etc.)
- ✅ All CRUD endpoints
- ✅ Multiple example response bodies (success + error cases)

---

##  Future Improvements

- **Image upload** — backend endpoint with multer instead of URL-only image fields
-  **Admin panel** for managing theatres, shows, and showtimes
- **Payment integration** (Stripe / PayPal)
-  **Email confirmations** on successful bookings (Nodemailer)
- **i18n support** (English / Greek toggle)
-  **Test coverage** — Jest (unit) + Supertest (integration)
-  **Refresh tokens** for longer sessions
-  **Rate limiting** on auth endpoints (`express-rate-limit`)
-  **PWA / mobile app** version
-  **QR code tickets** generated on successful booking
-  **Analytics dashboard** for theatre owners

---

##  Author

**Τσαλπατούρος Ανδρέας**

- 🎓 Mobile & Distributed Systems · Μητροπολιτικό Κολλέγιο
- 🐙 GitHub: [@your-username](https://github.com/your-username)
- 📧 Email: atsalpatouros23b@amcstudent.edu.gr

---

##  License

This project is developed for **educational purposes** as part of a university coursework deliverable.

---

<div align="center">


</div>
