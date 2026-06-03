# KMMuscles Admin Panel

Standalone Vite + React admin dashboard for the KMMuscles backend API.

## Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Lucide React
- Recharts
- Motion
- Zod
- Vitest + Testing Library

## Setup

```bash
cd admin
npm install
cp .env.example .env
npm run dev
```

Default API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

## Security Notes

- Admin refresh tokens are handled by the backend as secure HTTP-only cookies.
- The admin access token is stored in React state only.
- On page load, the app calls `/api/admin/auth/refresh` with credentials.
- API requests include `credentials: "include"` and `Authorization: Bearer <accessToken>` when authenticated.
- The client rejects unsafe URL protocols in validation helpers.

## Implemented Workspaces

- `/login`
- `/`
- `/orders`
- `/products`
- `/categories`
- `/brands`
- `/goals`
- `/homepage`
- `/banners`
- `/customers`
- `/payments`
- `/policies`
- `/media`
- `/settings`
- `/users`

## Scripts

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run test`
