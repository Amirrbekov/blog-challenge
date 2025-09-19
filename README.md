# 📝 Blog Challenge Project

[![NestJS](https://img.shields.io/badge/NestJS-EE2C6B?logo=nestjs&logoColor=white)](https://nestjs.com/) 
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/) 
[![TypeORM](https://img.shields.io/badge/TypeORM-00597B?logo=typeorm&logoColor=white)](https://typeorm.io/) 
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![ShadCN](https://img.shields.io/badge/ShadCN-UI-blue)](https://ui.shadcn.com/)

A **fullstack blog application** with **NestJS backend** and **Next.js + ShadCN frontend**. Implements **JWT authentication**, client-side protected routes with **Zustand**, and a modern UI.

---

## ✨ Features

### Backend
- User registration & login with **JWT tokens**
- Refresh token system with **HTTP-only cookies**
- Password hashing with **Argon2**
- **Role-based authorization**: Users can manage only their own posts/comments
- CRUD operations for **Blog Posts** & **Comments**
- **PostgreSQL** + **TypeORM** integration
- Optional **Redis** for storing refresh tokens

### Frontend
- Built with **Next.js 14+** and **React 18+**
- **ShadCN UI + TailwindCSS** for modern, responsive design
- Client-side authentication with **Zustand**
- Protected pages & redirect to login if unauthenticated
- Blog list page, blog detail page with comments
- Create/Edit/Delete posts and add comments (authenticated users)

---

## 🛠️ Technologies

**Backend**: NestJS, TypeORM, PostgreSQL, Argon2, JWT, Passport, Redis  
**Frontend**: Next.js, React, ShadCN UI, TailwindCSS, Zustand, Axios  

---

## 🚀 Getting Started

### Backend

1. Clone the repo and go to the server folder:
```bash
git clone https://github.com/yourusername/blog-challenge.git
cd blog-challenge/server

Install dependencies:
```bash
yarn install 
```
2. Create a .env file:
```bash
DATABASE_HOST="172.17.0.4"
DATABASE_PORT=5432
DATABASE_USERNAME="valex"
DATABASE_PASSWORD="valex123"
DATABASE_NAME="blogChallenge"

JwtSecretoOrKey="supersecretkey"

PORT=4000
```
3. Start the backend:
```bash
npm run start:dev
```

### Frontend

1. Go to the client folder:
```bash
git clone https://github.com/yourusername/blog-challenge.git
cd blog-challenge/server

Install dependencies:
```bash
npm install
```

2. Create .env
```bash
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

3. Start development server:
```bash
npm run dev
```
