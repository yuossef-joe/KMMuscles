# KMMuscles Backend

Secure MVP backend API for the KMMuscles supplements storefront, CMS, and admin dashboard.

## Stack

- Node.js 20+
- Express
- TypeScript
- Prisma
- PostgreSQL
- Zod
- JWT admin auth
- Jest + Supertest

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

The API runs at `http://localhost:5000` by default.

## Scripts

- `npm run dev` starts the API with `nodemon`.
- `npm run build` compiles TypeScript to `dist`.
- `npm run start` runs the compiled server.
- `npm run lint` checks TypeScript source and tests.
- `npm test` runs Jest/Supertest tests.
- `npm run prisma:validate` validates the Prisma schema.

## Auth Model

Admin login returns a short-lived access token in JSON and sets the refresh token in a secure HTTP-only cookie scoped to `/api/admin/auth`.

## Uploads

Development uploads use local disk storage under `uploads/`. Cloudinary settings are present in `.env.example`, but the local storage driver is the MVP default.
