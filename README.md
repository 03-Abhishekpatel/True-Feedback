# True Feedback

A secure, anonymous feedback platform built with **Next.js**, **TypeScript**, **MongoDB**, and **NextAuth**. Users can register, verify their email, log in, and accept or reject anonymous messages via a personal dashboard.  

[Live Demo (if deployed)](your-deployment-link)

---

## Features

- **User Authentication**
  - Sign up with email and password
  - Email verification before login
  - Sign in with email or username
  - Secure password hashing with bcrypt

- **Anonymous Messaging**
  - Users can receive messages anonymously
  - Accept or reject messages via dashboard
  - Copy a unique profile link to share

- **Real-time Dashboard**
  - View all received messages
  - Delete messages
  - Toggle message acceptance

- **Security**
  - JWT-based session handling with NextAuth
  - Passwords hashed using bcrypt
  - API routes protected for authenticated users only

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Node.js
- **Database:** MongoDB (Atlas)
- **Authentication:** NextAuth.js (CredentialsProvider)
- **Email:** Resend API for email verification
- **Validation:** Zod + React Hook Form
- **Notifications:** Sonner for toast notifications
- **Icons:** Lucide-react

---

## Screenshots

*(Add screenshots of your sign-up, login, dashboard, and messages page here)*

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/03-Abhishekpatel/True-Feedback.git
cd True-Feedback
2. Install dependencies
npm install
# or
yarn




You can refer to .env.example for guidance.

4. Run the development server
npm run dev
# or
yarn dev
