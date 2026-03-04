# Chordly 🎵

Chordly is a SaaS platform that connects music students with teachers and supports the full learning journey in one place.

Unlike simple booking tools, Chordly gives teachers the tools to manage their students, assign exercises, track practice habits, and handle scheduling — all from a single dashboard. Students get a clear view of their progress, upcoming lessons, and assigned exercises.

Built with a focus on real-world usability, role-based access, and clean architecture.

---

## ✨ Features

- Role-based authentication (students / teachers)
- Teacher discovery with search and instrument filters
- Lesson booking and rescheduling system
- Student and teacher dashboards
- Weekly calendar with lesson management
- Practice tracking and exercise assignment
- Pricing plans with plan management
- WCAG accessibility (Lighthouse score 100)

---

## 🛠 Tech Stack

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Clerk** – authentication
- **Neon** – serverless PostgreSQL
- **Drizzle ORM** – database access
- **Uploadthing** – file/image uploads

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
- NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
- NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
- NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
- NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
- DATABASE_URL=your_neon_database_url
- UPLOADTHING_TOKEN=your_uploadthing_token
- NEXT_PUBLIC_BASE_URL=your_base_url

### 4. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser to view the application.

## 🌐 Live Demo

👉 https://chordly-tau.vercel.app/

### 🔑 Demo Accounts

**Teacher account**

- Email: `demo.teacher@demo.com`
- Password: `chordly_demo`

**Student account**

- Email: `demo.student@demo.com`
- Password: `chordly_demo`
