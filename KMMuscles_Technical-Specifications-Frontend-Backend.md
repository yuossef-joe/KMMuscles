# Technical Specifications — Frontend, Backend, CMS & E-Commerce

## KMMuscles — Supplements E-Commerce Website & CMS

| Field | Detail |
| --- | --- |
| Document Version | 1.0 |
| Date | May 31, 2026 |
| Project Name | KMMuscles E-Commerce Website & CMS |
| Project Type | Full-Stack Supplements E-Commerce Web Application |
| Status | Development Ready |

### Referenced Documents

- Business Requirements Document — `KMMuscles_BRD.md`
- UI/UX Design Requirements — `KMMuscles_UI-UX-Design-Requirements.md`

---

# 1. Technology Stack

| Layer | Technology |
| --- | --- |
| Frontend Website | Next.js 14+ App Router, React 18+, TypeScript, Tailwind CSS |
| CMS/Admin Frontend | Next.js protected admin routes or React/Vite dashboard |
| Backend API | Node.js 20+, Express, TypeScript |
| ORM | Prisma |
| Database | PostgreSQL 15+ |
| Authentication | JWT access/refresh tokens or secure HTTP-only cookies |
| Password Hashing | bcrypt or argon2 |
| Validation | Zod |
| Forms | React Hook Form |
| File Storage | Cloudinary or AWS S3-compatible storage |
| Email | Nodemailer with SMTP provider |
| Payments | Cash on Delivery, Vodafone Cash manual, card gateway-ready |
| Icons | Lucide React |
| Testing | Jest, Supertest, React Testing Library |
| Deployment | Vercel/Netlify for frontend, VPS/container for backend, managed PostgreSQL |

---

# 2. Public Website

## 2.1 Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/products` | Product listing page |
| `/products/[slug]` | Product detail page |
| `/categories/[slug]` | Category product listing |
| `/brands` | Brand listing page |
| `/brands/[slug]` | Brand detail/product listing |
| `/cart` | Shopping cart |
| `/checkout` | Checkout |
| `/order-confirmation/[reference]` | Order confirmation |
| `/contact` | Contact page |
| `/about-us` | About page |
| `/privacy-policy` | Privacy policy |
| `/shipping-policy` | Shipping policy |
| `/refund-policy` | Refund policy |
| `/terms-and-conditions` | Terms page |
| `/faqs` | FAQs |

## 2.2 Home Page Frontend

Required sections:

- Sticky navbar.
- Hero section.
- Goal cards:
  - After Training.
  - Before Training.
  - Weight Gain.
  - Strength.
- Promotional banner.
- Best Sellers.
- Store location/contact strip.
- Footer.

Home page data should come from CMS endpoints, not hardcoded except fallback values.

### Home Page API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/content/home` | Fetch hero, goal cards, banners, section titles |
| GET | `/api/products?bestSeller=true&limit=8` | Fetch best sellers |
| GET | `/api/categories?showInNavbar=true` | Fetch category dropdown |
| GET | `/api/settings/site` | Fetch logo, SEO defaults, payment methods |
| GET | `/api/settings/contact` | Fetch contact info and social links |

---

# 3. Product Catalog System

## 3.1 Product Data Model Requirements

Products must support:

- Name.
- Slug.
- SKU.
- Brand.
- Category.
- Goal collections.
- Description.
- Benefits.
- How to use.
- Ingredients/nutrition facts.
- Price.
- Original price.
- Currency.
- Stock quantity.
- Product images.
- Variants such as size/flavor.
- Badges: Best Seller, Big Offer, New Arrival, Featured.
- SEO metadata.
- Active/inactive status.

## 3.2 Product List Endpoint

`GET /api/products`

Query parameters:

| Param | Example | Description |
| --- | --- | --- |
| `search` | `whey` | Search product name/description/SKU |
| `category` | `protein` | Filter by category slug |
| `brand` | `optimum-nutrition` | Filter by brand slug |
| `goal` | `after-training` | Filter by goal collection |
| `priceMin` | `500` | Minimum price |
| `priceMax` | `10000` | Maximum price |
| `inStock` | `true` | Stock filter |
| `bestSeller` | `true` | Best seller products |
| `featured` | `true` | Featured products |
| `sort` | `newest` | `newest`, `price_asc`, `price_desc`, `name_asc`, `best_seller` |
| `page` | `1` | Pagination page |
| `limit` | `12` | Results per page |

### Product List Response Shape

```json
{
  "items": [
    {
      "id": "uuid",
      "name": "GOLD STANDARD WHEY PROTEIN",
      "slug": "gold-standard-whey-protein",
      "sku": "GS-WHEY-001",
      "brand": { "id": "uuid", "name": "Optimum Nutrition", "slug": "optimum-nutrition" },
      "category": { "id": "uuid", "name": "Protein", "slug": "protein" },
      "price": 5800,
      "originalPrice": null,
      "currency": "EGP",
      "thumbnailUrl": "https://...",
      "stockQuantity": 20,
      "isBestSeller": true,
      "isFeatured": false,
      "discountBadge": null
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 100,
    "pages": 9
  }
}
```

## 3.3 Product Detail Endpoint

`GET /api/products/:slug`

Response should include:

- Full product data.
- Images gallery.
- Variants.
- Benefits.
- How to use.
- Nutrition facts.
- Related products.
- SEO metadata.

## 3.4 Categories

Initial categories:

- Mass Gainer
- Protein
- Creatine
- Pre-Workout
- Carbohydrate
- Amino
- Fat Burner
- Recovery
- Test Booster
- Multi Vitamin

Endpoints:

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/api/categories` | Public | List active categories |
| GET | `/api/categories/:slug` | Public | Get category details |
| POST | `/api/admin/categories` | Admin | Create category |
| PATCH | `/api/admin/categories/:id` | Admin | Update category |
| DELETE | `/api/admin/categories/:id` | Admin | Archive category |

## 3.5 Brands

Endpoints:

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/api/brands` | Public | List brands |
| GET | `/api/brands/:slug` | Public | Brand details with products |
| POST | `/api/admin/brands` | Admin | Create brand |
| PATCH | `/api/admin/brands/:id` | Admin | Update brand |
| DELETE | `/api/admin/brands/:id` | Admin | Archive brand |

---

# 4. Shopping Cart System

## 4.1 Guest Cart

- Stored in localStorage.
- Cart item structure: productId, variantId optional, quantity.
- Cart validates stock before checkout.

## 4.2 Authenticated Cart — Phase 2

- Server-side cart linked to customer.
- Merge guest cart after login.

## 4.3 Cart Endpoints

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/api/cart` | Optional | Get server cart for logged-in user |
| POST | `/api/cart/items` | Optional | Add item to cart |
| PATCH | `/api/cart/items/:id` | Optional | Update quantity |
| DELETE | `/api/cart/items/:id` | Optional | Remove item |
| DELETE | `/api/cart` | Optional | Clear cart |

For Phase 1, cart may be implemented client-side only, with checkout validating submitted items on the server.

---

# 5. Checkout & Orders

## 5.1 Checkout Requirements

Fields:

- Full name.
- Phone number.
- Email optional.
- Governorate.
- City.
- Full address.
- Notes optional.
- Payment method.

Payment methods:

- Cash on Delivery.
- Vodafone Cash manual confirmation.
- Card payment ready for future gateway.

## 5.2 Create Order Endpoint

`POST /api/orders`

Request:

```json
{
  "customer": {
    "fullName": "Youssef Ashraf",
    "phone": "+201xxxxxxxxx",
    "email": "customer@example.com"
  },
  "shippingAddress": {
    "governorate": "Luxor",
    "city": "Luxor City",
    "addressLine": "Full address"
  },
  "paymentMethod": "cash_on_delivery",
  "notes": "Call before delivery",
  "items": [
    { "productId": "uuid", "variantId": null, "quantity": 1 }
  ]
}
```

Response:

```json
{
  "id": "uuid",
  "reference": "KM-20260531-0001",
  "status": "new",
  "paymentStatus": "pending",
  "total": 5800,
  "currency": "EGP"
}
```

## 5.3 Order Statuses

| Status | Meaning |
| --- | --- |
| `new` | New order submitted |
| `confirmed` | Confirmed by staff |
| `preparing` | Being prepared |
| `out_for_delivery` | Sent for delivery |
| `delivered` | Completed |
| `cancelled` | Cancelled |
| `returned` | Returned after delivery |

## 5.4 Payment Statuses

| Status | Meaning |
| --- | --- |
| `pending` | Not paid or waiting for confirmation |
| `paid` | Payment confirmed |
| `failed` | Payment failed |
| `refunded` | Refunded |

---

# 6. CMS/Admin Dashboard

## 6.1 Admin Routes

| Route | Description |
| --- | --- |
| `/admin/login` | Admin login |
| `/admin` | Dashboard overview |
| `/admin/orders` | Orders list |
| `/admin/orders/[id]` | Order details |
| `/admin/products` | Products list |
| `/admin/products/new` | Create product |
| `/admin/products/[id]` | Edit product |
| `/admin/categories` | Category management |
| `/admin/brands` | Brand management |
| `/admin/homepage` | Homepage CMS |
| `/admin/banners` | Banner management |
| `/admin/policies` | Policy pages |
| `/admin/media` | Media library |
| `/admin/customers` | Customer management |
| `/admin/settings` | Site/contact/payment settings |
| `/admin/users` | Admin users and roles |

## 6.2 Admin API Endpoints

### Auth

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/admin/auth/login` | Login admin |
| POST | `/api/admin/auth/refresh` | Refresh token |
| POST | `/api/admin/auth/logout` | Logout |
| GET | `/api/admin/auth/me` | Current admin profile |

### Products

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/admin/products` | List products |
| POST | `/api/admin/products` | Create product |
| GET | `/api/admin/products/:id` | Product details |
| PATCH | `/api/admin/products/:id` | Update product |
| DELETE | `/api/admin/products/:id` | Archive product |
| POST | `/api/admin/products/:id/images` | Upload product images |
| PATCH | `/api/admin/products/:id/images/reorder` | Reorder images |
| DELETE | `/api/admin/products/:id/images/:imageId` | Delete image |

### Orders

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/admin/orders` | List orders with filters |
| GET | `/api/admin/orders/:id` | Order details |
| PATCH | `/api/admin/orders/:id/status` | Update order status |
| PATCH | `/api/admin/orders/:id/payment-status` | Update payment status |
| POST | `/api/admin/orders/:id/notes` | Add internal note |

### CMS Content

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/admin/content/:pageKey` | Fetch CMS page content |
| PUT | `/api/admin/content/:pageKey` | Update CMS page content |
| GET | `/api/admin/banners` | List banners |
| POST | `/api/admin/banners` | Create banner |
| PATCH | `/api/admin/banners/:id` | Update banner |
| DELETE | `/api/admin/banners/:id` | Delete banner |
| GET | `/api/admin/policies` | List policies |
| PUT | `/api/admin/policies/:key` | Update policy content |

### Settings

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/admin/settings/site` | Site settings |
| PUT | `/api/admin/settings/site` | Update site settings |
| GET | `/api/admin/settings/contact` | Contact settings |
| PUT | `/api/admin/settings/contact` | Update contact settings |
| GET | `/api/admin/settings/payments` | Payment methods |
| PUT | `/api/admin/settings/payments` | Update payment methods |

---

# 7. Database Schema

## 7.1 Core Tables

```prisma
model AdminUser {
  id           String   @id @default(uuid())
  name         String
  email        String   @unique
  passwordHash String
  role         AdminRole @default(STAFF)
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

enum AdminRole {
  SUPER_ADMIN
  ADMIN
  PRODUCT_MANAGER
  CONTENT_MANAGER
  ORDER_STAFF
  STAFF
}

model Brand {
  id          String    @id @default(uuid())
  name        String
  slug        String    @unique
  logoUrl     String?
  description String?
  isActive    Boolean   @default(true)
  products    Product[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Category {
  id           String    @id @default(uuid())
  name         String
  slug         String    @unique
  imageUrl     String?
  description  String?
  showInNavbar Boolean   @default(true)
  displayOrder Int       @default(0)
  isActive     Boolean   @default(true)
  products     Product[]
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

model GoalCollection {
  id           String    @id @default(uuid())
  title        String
  slug         String    @unique
  imageUrl     String?
  description  String?
  ctaText      String    @default("Discover")
  displayOrder Int       @default(0)
  isActive     Boolean   @default(true)
  products     ProductGoal[]
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

model Product {
  id              String   @id @default(uuid())
  name            String
  slug            String   @unique
  sku             String?  @unique
  brandId         String?
  categoryId      String
  description     String?
  benefitsJson    Json?
  howToUse        String?
  ingredients     String?
  nutritionFacts  Json?
  price           Decimal  @db.Decimal(10, 2)
  originalPrice   Decimal? @db.Decimal(10, 2)
  currency        String   @default("EGP")
  stockQuantity   Int      @default(0)
  isBestSeller    Boolean  @default(false)
  isFeatured      Boolean  @default(false)
  isNewArrival    Boolean  @default(false)
  discountBadge   String?
  isActive        Boolean  @default(true)
  metaTitle       String?
  metaDescription String?
  brand           Brand?   @relation(fields: [brandId], references: [id])
  category        Category @relation(fields: [categoryId], references: [id])
  images          ProductImage[]
  variants        ProductVariant[]
  goals           ProductGoal[]
  orderItems      OrderItem[]
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model ProductImage {
  id           String  @id @default(uuid())
  productId    String
  url          String
  altText      String?
  displayOrder Int     @default(0)
  product      Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  createdAt    DateTime @default(now())
}

model ProductVariant {
  id            String  @id @default(uuid())
  productId     String
  name          String
  sku           String? @unique
  price         Decimal? @db.Decimal(10, 2)
  stockQuantity Int     @default(0)
  product       Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model ProductGoal {
  productId        String
  goalCollectionId String
  product          Product        @relation(fields: [productId], references: [id], onDelete: Cascade)
  goalCollection   GoalCollection @relation(fields: [goalCollectionId], references: [id], onDelete: Cascade)

  @@id([productId, goalCollectionId])
}
```

## 7.2 Orders Tables

```prisma
model Order {
  id              String        @id @default(uuid())
  reference       String        @unique
  customerName    String
  customerPhone   String
  customerEmail   String?
  governorate     String
  city            String?
  addressLine     String
  notes           String?
  subtotal        Decimal       @db.Decimal(10, 2)
  deliveryFee     Decimal       @default(0) @db.Decimal(10, 2)
  total           Decimal       @db.Decimal(10, 2)
  currency        String        @default("EGP")
  paymentMethod   PaymentMethod
  paymentStatus   PaymentStatus @default(PENDING)
  status          OrderStatus   @default(NEW)
  items           OrderItem[]
  adminNotes      OrderNote[]
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

enum PaymentMethod {
  CASH_ON_DELIVERY
  VODAFONE_CASH
  CARD
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

enum OrderStatus {
  NEW
  CONFIRMED
  PREPARING
  OUT_FOR_DELIVERY
  DELIVERED
  CANCELLED
  RETURNED
}

model OrderItem {
  id           String  @id @default(uuid())
  orderId      String
  productId    String
  variantId    String?
  productName  String
  variantName  String?
  unitPrice    Decimal @db.Decimal(10, 2)
  quantity     Int
  lineTotal    Decimal @db.Decimal(10, 2)
  order        Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product      Product @relation(fields: [productId], references: [id])
}

model OrderNote {
  id          String    @id @default(uuid())
  orderId     String
  adminUserId String?
  note        String
  order       Order     @relation(fields: [orderId], references: [id], onDelete: Cascade)
  createdAt   DateTime  @default(now())
}
```

## 7.3 CMS Tables

```prisma
model ContentPage {
  id              String   @id @default(uuid())
  pageKey         String   @unique
  title           String
  contentJson     Json
  metaTitle       String?
  metaDescription String?
  isPublished     Boolean  @default(true)
  updatedAt       DateTime @updatedAt
  createdAt       DateTime @default(now())
}

model Banner {
  id           String   @id @default(uuid())
  title        String
  subtitle     String?
  imageUrl     String
  ctaText      String?
  ctaLink      String?
  placement    String   // home_hero, home_promo, category_top, etc.
  displayOrder Int      @default(0)
  isActive     Boolean  @default(true)
  startsAt     DateTime?
  endsAt       DateTime?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model SiteSetting {
  id        String   @id @default(uuid())
  key       String   @unique
  valueJson Json
  updatedAt DateTime @updatedAt
}

model MediaAsset {
  id        String   @id @default(uuid())
  url       String
  publicId  String?
  filename  String
  mimeType  String
  size      Int?
  altText   String?
  createdAt DateTime @default(now())
}
```

---

# 8. Frontend Architecture

## 8.1 Suggested Folder Structure

```txt
src/
  app/
    (public)/
      page.tsx
      products/
      categories/
      brands/
      cart/
      checkout/
      contact/
      privacy-policy/
      shipping-policy/
      refund-policy/
    admin/
      login/
      page.tsx
      orders/
      products/
      categories/
      brands/
      homepage/
      banners/
      policies/
      settings/
  components/
    layout/
      Header.tsx
      Footer.tsx
      MobileMenu.tsx
    home/
      Hero.tsx
      GoalCard.tsx
      PromoBanner.tsx
      BestSellers.tsx
    products/
      ProductCard.tsx
      ProductGrid.tsx
      ProductFilters.tsx
      ProductGallery.tsx
    cart/
      CartDrawer.tsx
      CartItem.tsx
      QuantitySelector.tsx
    admin/
      AdminSidebar.tsx
      DataTable.tsx
      StatusBadge.tsx
  lib/
    api.ts
    auth.ts
    cart.ts
    validators.ts
  hooks/
    useCart.ts
    useDebounce.ts
  types/
    product.ts
    order.ts
    cms.ts
```

## 8.2 State Management

- Cart: React Context + localStorage for Phase 1.
- Server data: fetch API or TanStack Query if needed.
- Forms: React Hook Form + Zod.
- Admin auth: HTTP-only cookies preferred, or JWT with refresh flow.

## 8.3 SEO

- Dynamic metadata per product/category/page.
- Product schema JSON-LD.
- Sitemap generation.
- robots.txt.
- Open Graph image support.
- Clean slugs.

---

# 9. Backend Architecture

## 9.1 Suggested Folder Structure

```txt
src/
  config/
    env.ts
    database.ts
  modules/
    auth/
    products/
    categories/
    brands/
    goals/
    cart/
    orders/
    cms/
    banners/
    settings/
    media/
    customers/
  middlewares/
    auth.middleware.ts
    role.middleware.ts
    error.middleware.ts
    rate-limit.middleware.ts
  utils/
    slugify.ts
    order-reference.ts
    upload.ts
  server.ts
```

## 9.2 Security Middleware

- Helmet.
- CORS whitelist.
- Rate limiting.
- Input validation.
- File upload validation.
- Error handler.
- Admin auth guard.
- Role guard.

## 9.3 Audit Logs

Admin actions that should be logged:

- Product price changes.
- Stock updates.
- Order status changes.
- Payment status changes.
- Admin user creation/update.
- Policy page updates.
- Site settings updates.

Audit log fields:

- Admin user ID.
- Action type.
- Entity type.
- Entity ID.
- Before JSON.
- After JSON.
- Timestamp.

---

# 10. Media Uploads

## Requirements

- Accept images only for product/banner/category/brand assets.
- Validate MIME type.
- Limit file size.
- Convert/serve optimized WebP if possible.
- Store alt text.
- Use Cloudinary or S3.

Endpoints:

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/admin/media` | Upload media |
| GET | `/api/admin/media` | List media assets |
| DELETE | `/api/admin/media/:id` | Delete media asset |

---

# 11. Notifications

Initial notifications:

- Admin email when new order is created.
- Optional customer email confirmation.
- Optional WhatsApp link/manual workflow.

Future:

- SMS order confirmation.
- WhatsApp Business API integration.
- Abandoned cart reminder.

---

# 12. Environment Variables

```env
DATABASE_URL="postgresql://..."
JWT_ACCESS_SECRET="..."
JWT_REFRESH_SECRET="..."
CORS_ORIGIN="https://kmmuscles.com"
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
SMTP_HOST="..."
SMTP_PORT="587"
SMTP_USER="..."
SMTP_PASS="..."
ADMIN_EMAIL="info@kmmuscles.com"
```

---

# 13. Acceptance Criteria

## Frontend

- Home page matches the KMMuscles visual direction.
- Navbar includes Home, Shop By Category, Brands, policies, Contact, Login, and Cart.
- Category dropdown works on desktop and mobile.
- Product listing supports search, filters, sort, and pagination.
- Product detail page includes image gallery and add-to-cart.
- Cart persists for guest users.
- Checkout submits order successfully.
- Confirmation page shows reference number.

## Backend

- Products, categories, brands, banners, CMS pages, and orders have complete CRUD where required.
- Checkout validates product availability and calculates totals server-side.
- Admin authentication and role protection work.
- Image upload works with validation.
- Order status updates are stored and visible.
- Sensitive admin actions are audit logged.

## CMS

- Admin can update hero content, goal cards, banners, best sellers, footer, payment methods, and policies without code changes.
- Admin can manage products and inventory.
- Admin can manage orders and payment statuses.

---

# 14. Out of Scope for Phase 1

- Native mobile app.
- Multi-vendor marketplace.
- Loyalty points.
- Subscription supplements.
- Advanced warehouse/ERP integration.
- Multi-currency support.
- International shipping.

---

# 15. Future Enhancements

- Customer accounts.
- Wishlist.
- Product reviews.
- Coupons and promo codes.
- Payment gateway integration.
- WhatsApp Business API order updates.
- Advanced analytics dashboard.
- Product bundles.
- Related product recommendations.
