# Admin API Usage

The admin panel consumes the backend routes documented in `backend/docs/api.md`.

## Auth

### POST `/api/admin/auth/login`

Headers: `Content-Type: application/json`  
Authorization: public  
Body:

```json
{ "email": "admin@kmmuscles.com", "password": "ChangeMe123!" }
```

Success:

```json
{
  "success": true,
  "data": {
    "accessToken": "jwt",
    "admin": { "id": "uuid", "email": "admin@kmmuscles.com", "role": "SUPER_ADMIN" }
  }
}
```

Error responses: `401 INVALID_CREDENTIALS`, `429 RATE_LIMITED`.

### POST `/api/admin/auth/refresh`

Headers: refresh cookie from backend  
Authorization: HTTP-only refresh cookie  
Success: new access token and admin profile.  
Error responses: `401 REFRESH_REQUIRED`, `401 INVALID_TOKEN`.

## Main Admin Reads

The app reads:

- `GET /api/admin/dashboard`
- `GET /api/admin/products`
- `GET /api/admin/orders`
- `GET /api/admin/categories`
- `GET /api/admin/brands`
- `GET /api/admin/goals`
- `GET /api/admin/banners`
- `GET /api/admin/policies`
- `GET /api/admin/media`
- `GET /api/admin/settings/site`
- `GET /api/admin/settings/contact`
- `GET /api/admin/settings/payments`
- `GET /api/admin/users`

All require:

```http
Authorization: Bearer <accessToken>
```

## Main Admin Mutations

- `POST /api/admin/products`
- `DELETE /api/admin/products/:id`
- `POST /api/admin/categories`
- `DELETE /api/admin/categories/:id`
- `POST /api/admin/brands`
- `DELETE /api/admin/brands/:id`
- `POST /api/admin/goals`
- `DELETE /api/admin/goals/:id`
- `PATCH /api/admin/orders/:id/status`
- `PATCH /api/admin/orders/:id/payment-status`

Validation errors use backend `VALIDATION_ERROR` responses and are surfaced in the workspace.
