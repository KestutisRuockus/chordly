# Chordly 🎵

Chordly is a SaaS platform designed to connect music students with teachers and support the full learning process in one place.

The platform goes beyond simple lesson booking by focusing on long-term progress tracking, practice management, and role-based dashboards for both students and teachers.

The project is currently under active development and is being built as a real-world SaaS product.

---

## ✨ Features (Work in Progress)

- User authentication with role-based access (students / teachers)
- Teacher discovery and profile pages
- Lesson booking flow
- Student and teacher dashboards
- Practice and learning progress tracking
- Calendar-based lesson management

---

## 🛠 Tech Stack

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Clerk** – authentication
- **Neon** – serverless PostgreSQL
- **Drizzle ORM** – database access

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/KestutisRuockus/chordly.git
cd chordly
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a .env.local file in the root directory and add the following environment variables:

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
- CLERK_SECRET_KEY=your_clerk_secret_key
- DATABASE_URL=your_neon_database_url

### 4. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser to view the application.

## 🌐 Live Demo

👉 https://chordly-tau.vercel.app/

## 📌 Project Status

Chordly is under active development.

## Current focus:

Core functionality

Application architecture

Authentication and data layer

UI design and visual polish are planned for a later development phase.
