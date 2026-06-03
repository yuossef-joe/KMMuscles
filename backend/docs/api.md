# KMMuscles API Documentation

Base URL: `/api`

Responses use:

```json
{ "success": true, "data": {} }
```

Errors use:

```json
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "Invalid request data" } }
```

## Public Endpoints

### GET `/health`

Description: API health check.
Headers: none.
Authorization: public.
Success: `200`.

Example response:

```json
{ "success": true, "data": { "status": "ok", "service": "kmmuscles-backend" } }
```

### GET `/products`

Description: List active products with filters, search, sorting, and pagination.
Headers: none.
Authorization: public.
Query parameters: `search`, `category`, `brand`, `goal`, `priceMin`, `priceMax`, `inStock`, `bestSeller`, `featured`, `sort`, `page`, `limit`.
Success: `200`.
Errors: `400 VALIDATION_ERROR`.

Example request:

```bash
curl "http://localhost:5000/api/products?category=protein&bestSeller=true&limit=8"
```

Example response:

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "name": "GOLD STANDARD WHEY PROTEIN",
        "slug": "gold-standard-whey-protein",
        "price": 5800,
        "currency": "EGP",
        "stockQuantity": 20
      }
    ],
    "pagination": { "page": 1, "limit": 8, "total": 1, "pages": 1 }
  }
}
```

### GET `/products/:slug`

Description: Get active product detail with gallery, variants, goals, SEO, and nutrition data.
Headers: none.
Authorization: public.
Success: `200`.
Errors: `404 PRODUCT_NOT_FOUND`.

### GET `/products/:slug/related`

Description: Get related active products by category, brand, or goal.
Query parameters: `limit`.
Authorization: public.

### GET `/categories`, `/brands`, `/goals`

Description: List active category, brand, or goal collections.
Authorization: public.

### GET `/categories/:slug`, `/brands/:slug`, `/goals/:slug`

Description: Get entity detail with active product summaries.
Authorization: public.
Errors: `404 CATEGORY_NOT_FOUND`, `BRAND_NOT_FOUND`, or `GOAL_NOT_FOUND`.

### GET `/content/home`

Description: Homepage CMS payload including hero content, goals, banners, best sellers, site, and contact data.
Authorization: public.

### GET `/banners`

Description: Active promotional banners.
Authorization: public.

### GET `/policies/:key`

Description: Published policy page content.
Authorization: public.
Errors: `404 POLICY_NOT_FOUND`.

### GET `/settings/site`

Description: Logo, SEO defaults, social links, and payment method display settings.
Authorization: public.

### GET `/settings/contact`

Description: Store email, phone, WhatsApp, address, map link, and social links.
Authorization: public.

### POST `/orders`

Description: Create checkout order from product/variant IDs. Server recalculates prices and stock.
Headers: `Content-Type: application/json`.
Authorization: public.
Request body:

```json
{
  "customer": {
    "fullName": "Youssef Ashraf",
    "phone": "+201159500155",
    "email": "customer@example.com"
  },
  "shippingAddress": {
    "governorate": "Luxor",
    "city": "Luxor City",
    "addressLine": "Full address"
  },
  "paymentMethod": "cash_on_delivery",
  "notes": "Call before delivery",
  "items": [{ "productId": "uuid", "variantId": null, "quantity": 1 }]
}
```

Success response:

```json
{
  "success": true,
  "data": {
    "reference": "KM-20260603-0001",
    "status": "NEW",
    "paymentStatus": "PENDING",
    "total": 5800,
    "currency": "EGP"
  }
}
```

Errors: `400 VALIDATION_ERROR`, `400 PRODUCT_UNAVAILABLE`, `400 VARIANT_UNAVAILABLE`, `409 INSUFFICIENT_STOCK`.

### GET `/order-confirmation/:reference`

Description: Safe order confirmation lookup by reference.
Authorization: public.
Errors: `404 ORDER_NOT_FOUND`.

## Admin Endpoints

Admin protected endpoints require:

```http
Authorization: Bearer <accessToken>
```

Refresh tokens are HTTP-only cookies set at login.

### POST `/admin/auth/login`

Description: Login admin and set refresh cookie.
Authorization: public with rate limiting.
Request body:

```json
{ "email": "admin@kmmuscles.com", "password": "ChangeMe123!" }
```

Success response:

```json
{
  "success": true,
  "data": {
    "accessToken": "jwt",
    "admin": { "id": "uuid", "email": "admin@kmmuscles.com", "role": "SUPER_ADMIN" }
  }
}
```

Errors: `401 INVALID_CREDENTIALS`, `429 RATE_LIMITED`.

### POST `/admin/auth/refresh`

Description: Issue a new access token from the HTTP-only refresh cookie.
Authorization: refresh cookie.
Errors: `401 REFRESH_REQUIRED`, `401 INVALID_TOKEN`.

### POST `/admin/auth/logout`

Description: Clear refresh cookie.
Authorization: public.

### GET `/admin/auth/me`

Description: Current admin profile from access token.
Authorization: admin.

### GET `/admin/dashboard`

Description: Order counts, revenue, low-stock products, recent orders.
Authorization: admin/order/product/content roles.

### `/admin/products`

Methods: `GET`, `POST`, `GET /:id`, `PATCH /:id`, `DELETE /:id`.
Description: Product management with goals, pricing, stock, badges, SEO, and archive delete.
Authorization: `SUPER_ADMIN`, `ADMIN`, `PRODUCT_MANAGER`.
Errors: `400 VALIDATION_ERROR`, `401 AUTH_REQUIRED`, `403 FORBIDDEN`, `409 DUPLICATE_VALUE`.

### `/admin/categories`, `/admin/brands`, `/admin/goals`

Methods: `GET`, `POST`, `PATCH /:id`, `DELETE /:id`.
Description: Catalog management. Deletes archive records with `isActive=false`.
Authorization: product/content roles depending on entity.

### `/admin/banners`

Methods: `GET`, `POST`, `PATCH /:id`, `DELETE /:id`.
Description: Banner and promotion management.
Authorization: content roles.

### `/admin/policies/:key`

Methods: `PUT`; list with `GET /admin/policies`.
Description: Policy page update and publishing.
Authorization: content roles.

### `/admin/settings/site`, `/admin/settings/contact`, `/admin/settings/payments`

Methods: `GET`, `PUT`.
Description: CMS settings management.
Authorization: content roles.

### `/admin/media`

Methods: `GET`, `POST multipart/form-data`, `PATCH /:id`, `DELETE /:id`.
Description: Local development media uploads with MIME and size validation.
Authorization: content/product roles.

### `/admin/orders`

Methods: `GET`, `GET /:id`, `PATCH /:id/status`, `PATCH /:id/payment-status`, `POST /:id/notes`.
Description: Order listing, status updates, payment updates, and internal notes.
Authorization: `SUPER_ADMIN`, `ADMIN`, `ORDER_STAFF`.

### `/admin/users`

Methods: `GET`, `POST`, `PATCH /:id`, `DELETE /:id`.
Description: Admin user and role management.
Authorization: `SUPER_ADMIN`, `ADMIN`.
