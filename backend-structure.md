# Backend — Files & Folders Structure

> **Project:** KMMuscles — Supplements E-Commerce Website, CMS & Admin Dashboard  
> **Stack:** Node.js 20+, Express, TypeScript, Prisma ORM, PostgreSQL 15+  
> **Last Updated:** May 31, 2026

---

```
kmmuscles-backend/
│
├── .env
├── .env.example
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── tsconfig.json
├── jest.config.ts
├── nodemon.json
├── package.json
├── README.md
│
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
│
├── src/
│   ├── index.ts
│   ├── app.ts
│   │
│   ├── config/
│   │   ├── index.ts
│   │   ├── database.ts
│   │   ├── cors.ts
│   │   ├── jwt.ts
│   │   ├── email.ts
│   │   └── storage.ts
│   │
│   ├── middleware/
│   │   ├── admin-auth.middleware.ts
│   │   ├── customer-auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   ├── validation.middleware.ts
│   │   ├── upload.middleware.ts
│   │   ├── rate-limit.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── request-logger.middleware.ts
│   │
│   ├── routes/
│   │   ├── index.ts
│   │   │
│   │   ├── public/
│   │   │   ├── products.routes.ts
│   │   │   ├── categories.routes.ts
│   │   │   ├── brands.routes.ts
│   │   │   ├── goals.routes.ts
│   │   │   ├── content.routes.ts
│   │   │   ├── banners.routes.ts
│   │   │   ├── policies.routes.ts
│   │   │   ├── settings.routes.ts
│   │   │   └── orders.routes.ts
│   │   │
│   │   ├── auth/
│   │   │   └── customer-auth.routes.ts
│   │   │
│   │   ├── customer/
│   │   │   ├── account.routes.ts
│   │   │   ├── addresses.routes.ts
│   │   │   └── orders.routes.ts
│   │   │
│   │   ├── cart/
│   │   │   └── cart.routes.ts
│   │   │
│   │   └── admin/
│   │       ├── auth.routes.ts
│   │       ├── dashboard.routes.ts
│   │       ├── products.routes.ts
│   │       ├── categories.routes.ts
│   │       ├── brands.routes.ts
│   │       ├── goals.routes.ts
│   │       ├── orders.routes.ts
│   │       ├── customers.routes.ts
│   │       ├── homepage.routes.ts
│   │       ├── banners.routes.ts
│   │       ├── policies.routes.ts
│   │       ├── media.routes.ts
│   │       ├── settings.routes.ts
│   │       ├── payment-methods.routes.ts
│   │       └── users.routes.ts
│   │
│   ├── controllers/
│   │   ├── public/
│   │   │   ├── products.controller.ts
│   │   │   ├── categories.controller.ts
│   │   │   ├── brands.controller.ts
│   │   │   ├── goals.controller.ts
│   │   │   ├── content.controller.ts
│   │   │   ├── banners.controller.ts
│   │   │   ├── policies.controller.ts
│   │   │   ├── settings.controller.ts
│   │   │   └── orders.controller.ts
│   │   ├── auth/
│   │   │   └── customer-auth.controller.ts
│   │   ├── customer/
│   │   │   ├── account.controller.ts
│   │   │   ├── addresses.controller.ts
│   │   │   └── orders.controller.ts
│   │   ├── cart/
│   │   │   └── cart.controller.ts
│   │   └── admin/
│   │       ├── auth.controller.ts
│   │       ├── dashboard.controller.ts
│   │       ├── products.controller.ts
│   │       ├── categories.controller.ts
│   │       ├── brands.controller.ts
│   │       ├── goals.controller.ts
│   │       ├── orders.controller.ts
│   │       ├── customers.controller.ts
│   │       ├── homepage.controller.ts
│   │       ├── banners.controller.ts
│   │       ├── policies.controller.ts
│   │       ├── media.controller.ts
│   │       ├── settings.controller.ts
│   │       ├── payment-methods.controller.ts
│   │       └── users.controller.ts
│   │
│   ├── services/
│   │   ├── product.service.ts
│   │   ├── category.service.ts
│   │   ├── brand.service.ts
│   │   ├── goal.service.ts
│   │   ├── cart.service.ts
│   │   ├── order.service.ts
│   │   ├── payment-method.service.ts
│   │   ├── customer.service.ts
│   │   ├── customer-auth.service.ts
│   │   ├── admin-auth.service.ts
│   │   ├── homepage.service.ts
│   │   ├── banner.service.ts
│   │   ├── policy.service.ts
│   │   ├── settings.service.ts
│   │   ├── media.service.ts
│   │   ├── dashboard.service.ts
│   │   ├── email.service.ts
│   │   ├── storage.service.ts
│   │   ├── audit-log.service.ts
│   │   └── export.service.ts
│   │
│   ├── validators/
│   │   ├── product.validator.ts
│   │   ├── category.validator.ts
│   │   ├── brand.validator.ts
│   │   ├── goal.validator.ts
│   │   ├── order.validator.ts
│   │   ├── customer-auth.validator.ts
│   │   ├── customer.validator.ts
│   │   ├── admin-auth.validator.ts
│   │   ├── homepage.validator.ts
│   │   ├── banner.validator.ts
│   │   ├── policy.validator.ts
│   │   ├── settings.validator.ts
│   │   ├── media.validator.ts
│   │   ├── payment-method.validator.ts
│   │   └── common.validator.ts
│   │
│   ├── utils/
│   │   ├── api-error.ts
│   │   ├── api-response.ts
│   │   ├── async-handler.ts
│   │   ├── pagination.ts
│   │   ├── slug.ts
│   │   ├── token.ts
│   │   ├── hash.ts
│   │   ├── order-reference.ts
│   │   ├── money.ts
│   │   ├── phone.ts
│   │   ├── file-upload.ts
│   │   ├── date.ts
│   │   └── logger.ts
│   │
│   ├── types/
│   │   ├── express.d.ts
│   │   ├── enums.ts
│   │   ├── product.types.ts
│   │   ├── order.types.ts
│   │   ├── content.types.ts
│   │   ├── settings.types.ts
│   │   ├── email.types.ts
│   │   └── common.types.ts
│   │
│   ├── templates/
│   │   └── email/
│   │       ├── base.template.ts
│   │       ├── order-confirmation.template.ts
│   │       ├── order-status-update.template.ts
│   │       ├── payment-instructions.template.ts
│   │       ├── welcome.template.ts
│   │       ├── password-reset.template.ts
│   │       └── staff-new-order.template.ts
│   │
│   └── jobs/
│       ├── email-queue.job.ts
│       ├── low-stock-alert.job.ts
│       └── token-cleanup.job.ts
│
├── tests/
│   ├── setup.ts
│   ├── helpers/
│   │   ├── auth.helper.ts
│   │   ├── factory.ts
│   │   └── db.helper.ts
│   ├── unit/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validators/
│   └── integration/
│       ├── products.test.ts
│       ├── homepage.test.ts
│       ├── checkout.test.ts
│       ├── admin-auth.test.ts
│       ├── admin-products.test.ts
│       └── admin-orders.test.ts
│
└── docs/
    ├── api.md
    ├── deployment.md
    └── media-storage.md
```

---

## Public API Summary

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/content/home` | Homepage hero, goals, banners, sections |
| GET | `/api/products` | Product listing with filters/search/sort/pagination |
| GET | `/api/products/:slug` | Product detail |
| GET | `/api/products/:slug/related` | Related products |
| GET | `/api/categories` | Active categories |
| GET | `/api/categories/:slug` | Category detail |
| GET | `/api/brands` | Active brands |
| GET | `/api/brands/:slug` | Brand detail |
| GET | `/api/goals` | Goal collections |
| GET | `/api/goals/:slug` | Goal detail |
| GET | `/api/banners` | Active promotional banners |
| GET | `/api/policies/:key` | Policy page content |
| GET | `/api/settings/site` | Logo, SEO defaults, payment methods, social links |
| GET | `/api/settings/contact` | Store contact and location data |
| POST | `/api/orders` | Create checkout order |
| GET | `/api/order-confirmation/:reference` | Order confirmation data |

## Admin API Summary

| Area | Routes |
| --- | --- |
| Auth | `/api/admin/auth/login`, `/refresh`, `/logout`, `/me` |
| Dashboard | `/api/admin/dashboard` |
| Products | `/api/admin/products`, `/api/admin/products/:id/images` |
| Categories | `/api/admin/categories` |
| Brands | `/api/admin/brands` |
| Goals | `/api/admin/goals` |
| Orders | `/api/admin/orders`, status, payment status, notes |
| Customers | `/api/admin/customers` |
| Homepage CMS | `/api/admin/content/home` |
| Banners | `/api/admin/banners` |
| Policies | `/api/admin/policies/:key` |
| Media | `/api/admin/media` |
| Settings | `/api/admin/settings/site`, `/contact`, `/payments` |
| Users | `/api/admin/users` |

---

## Core Environment Variables

```env
NODE_ENV=development
PORT=5000
API_BASE_URL=http://localhost:5000
DATABASE_URL=postgresql://user:password@localhost:5432/kmmuscles_db

JWT_ADMIN_SECRET=change-me
JWT_ADMIN_EXPIRY=1h
JWT_ADMIN_REFRESH_SECRET=change-me
JWT_ADMIN_REFRESH_EXPIRY=7d
JWT_CUSTOMER_SECRET=change-me
JWT_CUSTOMER_EXPIRY=1h
JWT_CUSTOMER_REFRESH_SECRET=change-me
JWT_CUSTOMER_REFRESH_EXPIRY=30d

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
SMTP_FROM_NAME=KMMuscles
SMTP_FROM_EMAIL=noreply@kmmuscles.com
STAFF_NOTIFICATION_EMAIL=info@kmmuscles.com

STORAGE_DRIVER=cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
AWS_S3_REGION=

CORS_ORIGINS=http://localhost:3000,http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## Prisma Model Checklist

- [ ] `AdminUser`
- [ ] `Customer` and `CustomerAddress` for Phase 2
- [ ] `Brand`
- [ ] `Category`
- [ ] `GoalCollection`
- [ ] `Product`
- [ ] `ProductImage`
- [ ] `ProductVariant`
- [ ] `ProductGoal`
- [ ] `Order`
- [ ] `OrderItem`
- [ ] `OrderNote`
- [ ] `HomeContent` or `ContentPage`
- [ ] `Banner`
- [ ] `PolicyPage`
- [ ] `SiteSetting`
- [ ] `ContactSetting`
- [ ] `PaymentMethodSetting`
- [ ] `MediaAsset`
- [ ] `AuditLog`
- [ ] `EmailQueue`

## Required Enums

- [ ] `AdminRole`: `SUPER_ADMIN`, `ADMIN`, `PRODUCT_MANAGER`, `CONTENT_MANAGER`, `ORDER_STAFF`, `STAFF`
- [ ] `OrderStatus`: `NEW`, `CONFIRMED`, `PREPARING`, `OUT_FOR_DELIVERY`, `DELIVERED`, `CANCELLED`, `RETURNED`
- [ ] `PaymentMethod`: `CASH_ON_DELIVERY`, `VODAFONE_CASH`, `CARD`
- [ ] `PaymentStatus`: `PENDING`, `PAID`, `FAILED`, `REFUNDED`
- [ ] `BannerPlacement`: `HOME_HERO`, `HOME_PROMO`, `PRODUCTS`, `CATEGORY`
- [ ] `MediaFolder`: `PRODUCTS`, `BRANDS`, `CATEGORIES`, `BANNERS`, `HOMEPAGE`, `GENERAL`
