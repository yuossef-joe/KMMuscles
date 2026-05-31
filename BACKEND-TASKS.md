# Backend Development Tasks — KMMuscles E-Commerce & CMS

**Project:** KMMuscles — Supplements E-Commerce Website, CMS & Admin Dashboard  
**Stack:** Node.js 20+ · Express · TypeScript · Prisma · PostgreSQL 15+  
**Payments:** Cash on Delivery, Vodafone Cash manual confirmation, card gateway-ready  
**Currency:** EGP  
**Last Updated:** May 31, 2026

## Referenced Requirements

- `KMMuscles_BRD.md`
- `KMMuscles_Technical-Specifications-Frontend-Backend.md`
- `KMMuscles_UI-UX-Design-Requirements.md`
- `backend-structure.md`

---

## MVP Scope & Priorities

### Must Ship

1. Public website APIs for homepage CMS content, products, categories, brands, goals, banners, policies, settings, and contact data.
2. Product catalog with search, category/brand/goal filtering, price filtering, sorting, pagination, badges, variants, stock, and SEO fields.
3. Guest cart support on the frontend with server-side stock/price validation at checkout.
4. Checkout and order creation for Cash on Delivery and Vodafone Cash manual confirmation.
5. Order reference generation using `KM-YYYYMMDD-NNNN`.
6. Admin authentication with role-based access.
7. Admin APIs for products, categories, brands, goal collections, homepage CMS, banners, media, orders, customers, policies, payment methods, settings, and users.
8. Media upload to Cloudinary or S3-compatible storage with alt text.
9. Email/admin notification hooks for new orders and customer confirmation.
10. Security, validation, rate limiting, logging, tests, and deployment readiness.

### Phase 2 / Future

- Customer accounts, saved addresses, order history, reorder, wishlist.
- Coupon and loyalty program.
- WhatsApp ordering automation.
- Online card payment gateway integration.
- Advanced analytics.
- Product import/export tooling.

### Out of Scope for Initial Release

- Native mobile apps.
- Multi-vendor marketplace.BACKEND-TASKS
- Subscription supplement plans.
- Advanced warehouse/ERP/accounting integration.
- International shipping or multi-currency checkout.
- AI recommendations.

---

## Phase 1: Project Setup & Core Infrastructure

### Task 1.1: Initialize Backend Project

- [ ] Initialize Node.js TypeScript project.
- [ ] Install runtime dependencies:
  - `express`, `dotenv`, `cors`, `helmet`, `morgan`, `express-rate-limit`
  - `@prisma/client`, `zod`, `jsonwebtoken`, `bcrypt` or `argon2`
  - `multer`, `nodemailer`
  - Cloudinary SDK or `@aws-sdk/client-s3`
- [ ] Install dev dependencies:
  - `typescript`, `ts-node`, `nodemon`, `prisma`
  - `jest`, `ts-jest`, `supertest`
  - ESLint and Prettier.
- [ ] Configure `tsconfig.json`, `nodemon.json`, `jest.config.ts`, ESLint, Prettier, and npm scripts.
- [ ] Create `.env.example` matching the environment variables in `backend-structure.md`.
- [ ] Set up folder structure from `backend-structure.md`.

### Task 1.2: Express App Configuration

- [ ] Create `src/app.ts` with:
  - Helmet security headers.
  - CORS from `CORS_ORIGINS`.
  - JSON and URL-encoded parsers.
  - Morgan/request logger.
  - Global API rate limiting.
  - Routes mounted under `/api`.
  - Global error handler as the final middleware.
- [ ] Create `src/index.ts` with:
  - Env loading.
  - Prisma connection check.
  - Server listen on `PORT`.
  - Graceful shutdown.

### Task 1.3: Config Modules

- [ ] `src/config/index.ts` validates and exports typed config.
- [ ] `src/config/database.ts` exports Prisma singleton.
- [ ] `src/config/jwt.ts` separates admin and customer token settings.
- [ ] `src/config/email.ts` configures SMTP.
- [ ] `src/config/storage.ts` configures Cloudinary or S3-compatible storage.
- [ ] `src/config/cors.ts` parses allowed origins.

### Task 1.4: Core Utilities

- [ ] `api-error.ts` custom HTTP error class.
- [ ] `api-response.ts` standardized success/error/pagination responses.
- [ ] `async-handler.ts` route wrapper.
- [ ] `pagination.ts` parser and metadata builder.
- [ ] `slug.ts` slug generation and uniqueness checks.
- [ ] `token.ts` admin/customer JWT helpers.
- [ ] `hash.ts` password hashing helpers.
- [ ] `order-reference.ts` generates `KM-YYYYMMDD-NNNN`.
- [ ] `money.ts` Decimal-safe subtotal, delivery fee, and total helpers.
- [ ] `file-upload.ts` validates jpg, jpeg, png, webp files with size limits.
- [ ] `date.ts` timezone helpers for Africa/Cairo.
- [ ] `logger.ts` app logger.

### Task 1.5: Middleware

- [ ] Error middleware handles `ApiError`, Prisma errors, Zod errors, JWT errors, and unknown errors.
- [ ] Validation middleware accepts body/query/params schemas.
- [ ] Upload middleware supports single image, multiple product images, and media library uploads.
- [ ] Rate limit presets for public API, checkout, auth, admin auth, and upload routes.
- [ ] Admin auth middleware validates admin tokens and active users.
- [ ] Optional customer auth middleware for Phase 2 account routes.
- [ ] Role middleware supports `SUPER_ADMIN`, `ADMIN`, `PRODUCT_MANAGER`, `CONTENT_MANAGER`, `ORDER_STAFF`, and `STAFF`.

---

## Phase 2: Database Schema & Seed Data

### Task 2.1: Prisma Setup

- [ ] Initialize Prisma.
- [ ] Configure PostgreSQL `DATABASE_URL`.
- [ ] Define schema from `backend-structure.md`.
- [ ] Run initial migration.
- [ ] Generate Prisma client.

### Task 2.2: Core Commerce Models

- [ ] `AdminUser` with role, active flag, password hash.
- [ ] `Brand` with logo, description, active/display flags.
- [ ] `Category` with image, description, navbar visibility, display order, SEO.
- [ ] `GoalCollection` for After Training, Before Training, Weight Gain, Strength.
- [ ] `Product` with:
  - name, slug, SKU, brand, category, goals
  - description, benefits, how to use, ingredients, nutrition facts
  - price, original price, EGP currency
  - stock quantity, active status
  - badges/flags: best seller, featured, new arrival, discount badge
  - SEO title/description
- [ ] `ProductImage` with URL, alt text, display order.
- [ ] `ProductVariant` for size/flavor with optional price and stock override.

### Task 2.3: Order & Checkout Models

- [ ] `Order` with customer contact, address, notes, subtotal, delivery fee, total, status, payment method/status.
- [ ] `OrderItem` stores product snapshot: product name, variant name, unit price, quantity, line total.
- [ ] `OrderNote` for admin internal notes.
- [ ] Enums:
  - `OrderStatus`: `NEW`, `CONFIRMED`, `PREPARING`, `OUT_FOR_DELIVERY`, `DELIVERED`, `CANCELLED`, `RETURNED`
  - `PaymentMethod`: `CASH_ON_DELIVERY`, `VODAFONE_CASH`, `CARD`
  - `PaymentStatus`: `PENDING`, `PAID`, `FAILED`, `REFUNDED`

### Task 2.4: CMS & Settings Models

- [ ] `HomeContent` or `ContentPage` for hero, section titles, rich pages, and SEO.
- [ ] `Banner` for promotional banners.
- [ ] `PolicyPage` for privacy, shipping, refund, terms.
- [ ] `SiteSetting` for logo, favicon, SEO defaults, social links, payment method display.
- [ ] `ContactSetting` for phone, WhatsApp, email, address, map link, social links.
- [ ] `PaymentMethodSetting` for COD, Vodafone Cash instructions, and card readiness.
- [ ] `MediaAsset` for uploads, alt text, folder, size, mime type.
- [ ] `AuditLog` for sensitive admin actions.
- [ ] Optional `Customer` and `CustomerAddress` models for Phase 2.

### Task 2.5: Seed Data

- [ ] Seed categories:
  - Mass Gainer, Protein, Creatine, Pre-Workout, Carbohydrate, Amino, Fat Burner, Recovery, Test Booster, Multi Vitamin.
- [ ] Seed goal collections:
  - After Training, Before Training, Weight Gain, Strength.
- [ ] Seed default admin user.
- [ ] Seed default contact:
  - Email `info@kmmuscles.com`
  - Phone `+201159500155`
  - Address `Fairouz District, Luxor City`
- [ ] Seed default payment methods: Cash on Delivery, Vodafone Cash, Visa/Mastercard placeholder.
- [ ] Seed draft policy pages and homepage fallback content.

---

## Phase 3: Public Catalog & Content APIs

### Task 3.1: Products API

- [ ] `GET /api/products`
  - Query: `search`, `category`, `brand`, `goal`, `priceMin`, `priceMax`, `inStock`, `bestSeller`, `featured`, `sort`, `page`, `limit`.
  - Sort: `newest`, `price_asc`, `price_desc`, `name_asc`, `best_seller`.
  - Always filter inactive products from public responses.
  - Include brand, category, thumbnail, stock, price, original price, badges, and pagination.
- [ ] `GET /api/products/:slug`
  - Include full product details, gallery, variants, benefits, how to use, nutrition facts, SEO, and related products.
- [ ] `GET /api/products/:slug/related?limit=4`
  - Related by category, brand, or goal.

### Task 3.2: Categories, Brands & Goals

- [ ] `GET /api/categories` list active categories.
- [ ] `GET /api/categories/:slug` category detail with metadata.
- [ ] `GET /api/brands` list active brands.
- [ ] `GET /api/brands/:slug` brand detail with products.
- [ ] `GET /api/goals` list active goal collections.
- [ ] `GET /api/goals/:slug` goal detail with products.

### Task 3.3: Homepage & CMS Content

- [ ] `GET /api/content/home` returns:
  - hero title, subtitle, image, CTA
  - goal cards
  - active promo banners
  - best seller section title
  - footer/contact summary
  - SEO defaults
- [ ] `GET /api/banners` returns active banners by placement.
- [ ] `GET /api/content/:pageKey` returns published About, Contact, FAQ intro, or custom CMS page content.
- [ ] `GET /api/policies/:key` returns privacy, shipping, refund, or terms content.
- [ ] `GET /api/settings/site` returns logo, favicon, SEO defaults, social links, payment methods.
- [ ] `GET /api/settings/contact` returns address, phone, WhatsApp, email, social links, map link.

---

## Phase 4: Cart, Checkout & Orders

### Task 4.1: Guest Cart Validation

- [ ] Accept checkout items from frontend localStorage cart.
- [ ] Validate product and variant IDs.
- [ ] Validate product is active.
- [ ] Validate stock is available.
- [ ] Recalculate price, subtotal, delivery fee, and total on the server.
- [ ] Reject client-submitted totals.

### Task 4.2: Order Creation

- [ ] `POST /api/orders`
  - Body includes customer full name, phone, optional email, governorate, city, full address, notes, payment method, and items.
  - Validate Egyptian phone format.
  - Generate unique reference `KM-YYYYMMDD-NNNN`.
  - Create order and order items in a transaction.
  - Deduct stock for confirmed stock-tracked products.
  - Return order reference, status, payment status, total, and currency.
- [ ] `GET /api/order-confirmation/:reference`
  - Return safe order confirmation data by reference.

### Task 4.3: Payment Methods

- [ ] Cash on Delivery creates order with `paymentStatus=PENDING`.
- [ ] Vodafone Cash manual:
  - Return payment instructions from settings.
  - Keep payment status pending until admin marks paid.
- [ ] Card:
  - Keep service abstraction and setting flag ready.
  - Do not require gateway integration for MVP.

### Task 4.4: Notifications

- [ ] Send admin notification email for new orders.
- [ ] Send customer confirmation email when email is provided.
- [ ] Log notification failures without breaking order creation.

---

## Phase 5: Admin Authentication & Dashboard APIs

### Task 5.1: Admin Auth

- [ ] `POST /api/admin/auth/login`.
- [ ] `POST /api/admin/auth/refresh`.
- [ ] `POST /api/admin/auth/logout`.
- [ ] `GET /api/admin/auth/me`.
- [ ] Hash passwords and enforce active admin users only.
- [ ] Add login rate limiting.

### Task 5.2: Dashboard Overview

- [ ] `GET /api/admin/dashboard`
  - total orders
  - pending orders
  - delivered orders
  - cancelled orders
  - total revenue
  - best-selling products
  - low-stock products
  - recent orders
- [ ] Optional date range query for analytics.

---

## Phase 6: Admin Management APIs

### Task 6.1: Product Management

- [ ] `GET /api/admin/products` with filters/search/sort/pagination.
- [ ] `POST /api/admin/products`.
- [ ] `GET /api/admin/products/:id`.
- [ ] `PATCH /api/admin/products/:id`.
- [ ] `DELETE /api/admin/products/:id` archives product.
- [ ] `POST /api/admin/products/:id/images`.
- [ ] `PATCH /api/admin/products/:id/images/reorder`.
- [ ] `DELETE /api/admin/products/:id/images/:imageId`.
- [ ] Support variants, stock, badges, goals, SEO, and active status.

### Task 6.2: Categories, Brands & Goals

- [ ] CRUD `/api/admin/categories`.
- [ ] CRUD `/api/admin/brands`.
- [ ] CRUD `/api/admin/goals`.
- [ ] Support images/logos, slug generation, display order, active flags, SEO, and navbar visibility for categories.

### Task 6.3: Homepage, Banners, Policies & Settings

- [ ] `GET/PUT /api/admin/content/home`.
- [ ] CRUD `/api/admin/banners`.
- [ ] `GET/PUT /api/admin/policies/:key`.
- [ ] `GET/PUT /api/admin/settings/site`.
- [ ] `GET/PUT /api/admin/settings/contact`.
- [ ] `GET/PUT /api/admin/settings/payments`.
- [ ] Validate homepage sections against the required UI structure.

### Task 6.4: Orders & Customers

- [ ] `GET /api/admin/orders` with search by customer name, phone, reference.
- [ ] Filter by status, date, payment method, payment status.
- [ ] `GET /api/admin/orders/:id`.
- [ ] `PATCH /api/admin/orders/:id/status`.
- [ ] `PATCH /api/admin/orders/:id/payment-status`.
- [ ] `POST /api/admin/orders/:id/notes`.
- [ ] Optional invoice/packing slip print data endpoint.
- [ ] `GET /api/admin/customers` from order/customer records.
- [ ] `GET /api/admin/customers/:id` with order history when accounts exist.

### Task 6.5: Media Library & Users

- [ ] `GET /api/admin/media`.
- [ ] `POST /api/admin/media`.
- [ ] `PATCH /api/admin/media/:id`.
- [ ] `DELETE /api/admin/media/:id`.
- [ ] `GET/POST/PATCH/DELETE /api/admin/users` for super/admin roles.
- [ ] Record audit logs for critical changes.

---

## Phase 7: Validation, Security & Reliability

- [ ] Zod validators for every public and admin endpoint.
- [ ] Strict file upload validation and sanitized filenames.
- [ ] Helmet, CORS, rate limiting, and safe error responses.
- [ ] Role checks on every admin route.
- [ ] Prevent negative stock and race conditions during checkout.
- [ ] Store prices as Decimal, not float.
- [ ] Add database indexes for slugs, SKU, filters, order reference, statuses, and created dates.
- [ ] Add audit logs for product, order, settings, policy, and admin-user changes.
- [ ] Add daily backup/deployment notes.

---

## Phase 8: Testing

- [ ] Unit tests:
  - slug generation
  - order reference generation
  - cart/order total calculation
  - stock validation
  - role checks
  - validators
- [ ] Integration tests:
  - product listing filters
  - product detail
  - homepage content
  - checkout/order creation
  - admin login
  - admin product CRUD
  - admin order status update
  - media upload validation
- [ ] Test seed data for KMMuscles categories, goals, and products.

---

## Phase 9: Deployment Readiness

- [ ] Production env variables documented.
- [ ] Build command verifies TypeScript.
- [ ] Prisma migrations ready for deploy.
- [ ] Health endpoint `GET /api/health`.
- [ ] Logging configured for production.
- [ ] CORS configured for website and admin dashboard domains.
- [ ] Upload storage credentials verified.
- [ ] SMTP verified.
- [ ] Admin default password rotation documented.
