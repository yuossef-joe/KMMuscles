# Frontend Development Tasks — KMMuscles Admin Dashboard

**Project:** KMMuscles — CMS & Admin Dashboard  
**Stack:** React 18+ + Vite or Next.js protected admin routes · TypeScript · Tailwind CSS · React Router or App Router · Radix UI · React Hook Form · Zod · Lucide React · Recharts · Motion  
**Duration:** 4-5 weeks  
**Last Updated:** May 31, 2026

## Referenced Requirements

- `KMMuscles_BRD.md`
- `KMMuscles_Technical-Specifications-Frontend-Backend.md`
- `KMMuscles_UI-UX-Design-Requirements.md`

---

## Scope

### Must Ship

1. Secure admin login.
2. Role-aware dashboard shell with sidebar and top bar.
3. Dashboard analytics overview.
4. Product management with images, variants, stock, badges, SEO, categories, brands, and goals.
5. Category management.
6. Brand management.
7. Goal collection management.
8. Homepage CMS management.
9. Banner and promotion management.
10. Order management with status/payment updates and internal notes.
11. Customer management from orders and future account data.
12. Payment method settings for COD, Vodafone Cash, and card readiness.
13. Policy page editor.
14. Contact/store information settings.
15. Media library with alt text.
16. Admin users and roles.

### Out of Scope for Initial Release

- Public website implementation.
- Native mobile app.
- ERP/accounting integration.
- Advanced warehouse management.
- Loyalty program.
- Multi-currency.
- International shipping.

---

## Phase 1: Project Setup

### Task 1.1: Initialize Admin App

- [ ] Choose implementation:
  - Vite React app `kmmuscles-admin`, or
  - Next.js protected `/admin` routes if sharing the main frontend.
- [ ] Configure TypeScript, Tailwind CSS, ESLint, Prettier.
- [ ] Configure environment variable:
  - `VITE_API_URL=http://localhost:5000/api` for Vite, or
  - `NEXT_PUBLIC_API_URL=http://localhost:5000/api` for Next.js.
- [ ] Verify local dev server.

### Task 1.2: Install Dependencies

- [ ] Routing: `react-router-dom` if Vite.
- [ ] UI: Radix Dialog, Dropdown, Tabs, Toast, Checkbox, Select, Switch, Popover.
- [ ] Forms: `react-hook-form`, `zod`, `@hookform/resolvers`.
- [ ] Icons: `lucide-react`.
- [ ] Tables: `@tanstack/react-table`.
- [ ] Charts: `recharts`.
- [ ] Uploads: `react-dropzone`.
- [ ] Rich text: TipTap.
- [ ] Toasts: `react-toastify` or local Radix toast.
- [ ] Motion: `motion`, `@formkit/auto-animate`, `react-countup`.

### Task 1.3: Tailwind Theme

- [ ] Use KMMuscles accents:
  - `muscle-black` `#050505`
  - `deep-charcoal` `#111111`
  - `gym-red` `#E21B2D`
  - `energy-orange` `#FF6A00`
  - `light-gray` `#F5F5F5`
  - `medium-gray` `#A3A3A3`
  - `border-gray` `#2A2A2A`
- [ ] Admin should be lighter and operational:
  - neutral page backgrounds
  - clear tables
  - red/orange only for actions, active states, and alerts.
- [ ] Fonts:
  - Inter for admin body/tables.
  - Oswald/Bebas only for brand preview areas, not dense tables.

### Task 1.4: Admin App Structure

```
src/
├── main.tsx
├── App.tsx
├── index.css
├── routes/
│   └── index.tsx
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── orders/
│   ├── products/
│   ├── categories/
│   ├── brands/
│   ├── goals/
│   ├── homepage/
│   ├── banners/
│   ├── customers/
│   ├── payments/
│   ├── policies/
│   ├── media/
│   ├── settings/
│   └── users/
├── components/
│   ├── layout/
│   ├── common/
│   ├── dashboard/
│   ├── orders/
│   ├── products/
│   ├── catalog/
│   ├── content/
│   ├── media/
│   └── settings/
├── context/
│   └── AuthContext.tsx
├── hooks/
├── lib/
│   ├── api.ts
│   ├── auth.ts
│   ├── format.ts
│   └── validations.ts
└── types/
```

---

## Phase 2: Routing, Auth & API Client

### Task 2.1: Routes

- [ ] `/login`
- [ ] `/`
- [ ] `/orders`
- [ ] `/orders/:id`
- [ ] `/products`
- [ ] `/products/new`
- [ ] `/products/:id`
- [ ] `/categories`
- [ ] `/brands`
- [ ] `/goals`
- [ ] `/homepage`
- [ ] `/banners`
- [ ] `/customers`
- [ ] `/payments`
- [ ] `/policies`
- [ ] `/media`
- [ ] `/settings`
- [ ] `/users`
- [ ] 404 page.

### Task 2.2: Authentication

- [ ] Build login form for `/api/admin/auth/login`.
- [ ] Store access/refresh tokens securely according to backend choice.
- [ ] `GET /api/admin/auth/me` loads current admin.
- [ ] Auto logout on 401.
- [ ] Add protected route wrapper.
- [ ] Hide or disable modules based on admin role.

### Task 2.3: API Client

- [ ] Create fetch wrapper with base API URL.
- [ ] Prefix admin calls with `/admin`.
- [ ] Add Authorization header.
- [ ] Handle JSON and FormData requests.
- [ ] Standardize error and validation messages.
- [ ] API functions for:
  - auth
  - dashboard
  - products
  - categories
  - brands
  - goals
  - homepage
  - banners
  - orders
  - customers
  - payments
  - policies
  - media
  - settings
  - users

---

## Phase 3: Layout & Shared Admin Components

### Task 3.1: Layout

- [ ] Sidebar modules:
  - Dashboard
  - Orders
  - Products
  - Categories
  - Brands
  - Goal Collections
  - Homepage CMS
  - Banners
  - Customers
  - Payments
  - Policies
  - Media Library
  - Settings
  - Users & Roles
- [ ] Top bar with search shortcut, current user, logout.
- [ ] Responsive sidebar collapse.
- [ ] Breadcrumbs.

### Task 3.2: Common Components

- [ ] Button with icon support.
- [ ] Icon-only buttons with accessible labels/tooltips.
- [ ] DataTable with sorting, filters, pagination, row actions.
- [ ] StatusBadge for orders, payment status, stock, active/inactive.
- [ ] ConfirmDialog.
- [ ] Modal/Drawer.
- [ ] FormField.
- [ ] ImageUpload.
- [ ] RichTextEditor.
- [ ] DateRangePicker.
- [ ] SearchInput.
- [ ] EmptyState.
- [ ] LoadingSkeleton.
- [ ] StatsCard.
- [ ] Pagination.

---

## Phase 4: Dashboard Overview

### Task 4.1: Analytics Cards

- [ ] Total orders.
- [ ] Pending orders.
- [ ] Delivered orders.
- [ ] Cancelled orders.
- [ ] Total revenue.
- [ ] Low-stock products.

### Task 4.2: Dashboard Tables & Charts

- [ ] Recent orders table.
- [ ] Best-selling products list.
- [ ] Low-stock products list.
- [ ] Revenue/orders chart with date range.
- [ ] Quick actions:
  - Add product
  - Create banner
  - View new orders
  - Update homepage

---

## Phase 5: Product Management

### Task 5.1: Products List

- [ ] Search by name, SKU, brand, category.
- [ ] Filters: category, brand, goal, stock status, badge, active status.
- [ ] Sort by newest, price, name, stock.
- [ ] Columns:
  - image
  - name
  - SKU
  - brand
  - category
  - price/original price
  - stock
  - badges
  - active
  - actions.
- [ ] Quick actions:
  - edit
  - archive
  - toggle active
  - mark best seller
  - mark featured
  - update stock.

### Task 5.2: Product Form

- [ ] Tabs:
  - General
  - Pricing & Stock
  - Images
  - Variants
  - Goals & Badges
  - Content
  - SEO
- [ ] Fields:
  - name, slug, SKU
  - brand, category
  - price, original price, currency EGP
  - stock quantity
  - description
  - benefits
  - how to use
  - ingredients
  - nutrition facts
  - best seller, featured, new arrival
  - discount badge text
  - active status
  - meta title, meta description.
- [ ] Product image manager:
  - upload multiple
  - preview
  - reorder
  - set alt text
  - delete.
- [ ] Variant manager:
  - size/flavor name
  - SKU
  - price override
  - stock quantity.

---

## Phase 6: Catalog Management

### Task 6.1: Categories

- [ ] List/create/edit/archive categories.
- [ ] Fields: name, slug, image, description, show in navbar, display order, active, SEO.
- [ ] Drag/drop or numeric reorder.
- [ ] Initial categories:
  - Mass Gainer
  - Protein
  - Creatine
  - Pre-Workout
  - Carbohydrate
  - Amino
  - Fat Burner
  - Recovery
  - Test Booster
  - Multi Vitamin.

### Task 6.2: Brands

- [ ] List/create/edit/archive brands.
- [ ] Fields: name, slug, logo, description, active/show on website, SEO.
- [ ] Show product count per brand.

### Task 6.3: Goal Collections

- [ ] Manage:
  - After Training
  - Before Training
  - Weight Gain
  - Strength.
- [ ] Fields: title, slug, image, description, CTA text, display order, active.
- [ ] Assign products to goals from product form or goal page.

---

## Phase 7: Homepage, Banners & Policies

### Task 7.1: Homepage CMS

- [ ] Edit hero title, subtitle, image, CTA text/link.
- [ ] Edit goal card content and images.
- [ ] Select or preview promo banner placement.
- [ ] Edit Best Sellers section title.
- [ ] Edit footer summary if stored in content.
- [ ] Preview home sections in KMMuscles dark/red/orange style.

### Task 7.2: Banners

- [ ] List/create/edit/delete banners.
- [ ] Fields: title, subtitle, image, CTA text, target type/link, placement, start/end date, active.
- [ ] Support links to category, brand, product, or custom URL.

### Task 7.3: Policies

- [ ] Rich text editors for:
  - Privacy Policy
  - Shipping Policy
  - Refund Policy
  - Terms & Conditions.
- [ ] Fields: title, slug/key, content, last updated, SEO title/description, published status.

---

## Phase 8: Orders, Customers & Payments

### Task 8.1: Orders List

- [ ] Search by order reference, customer name, phone.
- [ ] Filters: status, payment method, payment status, date range.
- [ ] Columns:
  - reference
  - customer
  - phone
  - total
  - payment method
  - payment status
  - order status
  - date
  - actions.

### Task 8.2: Order Detail

- [ ] Customer contact and shipping address.
- [ ] Ordered items with product/variant snapshot.
- [ ] Subtotal, delivery fee, total.
- [ ] Payment method and payment status.
- [ ] Order status timeline.
- [ ] Update status:
  - New
  - Confirmed
  - Preparing
  - Out for Delivery
  - Delivered
  - Cancelled
  - Returned.
- [ ] Update payment status:
  - Pending
  - Paid
  - Failed
  - Refunded.
- [ ] Add internal notes.
- [ ] Print invoice/packing slip view if backend endpoint exists.

### Task 8.3: Customers

- [ ] Customer list from orders and account records.
- [ ] Search by name or phone.
- [ ] Customer detail with contact info and order history.
- [ ] Account enable/disable controls only when Phase 2 accounts exist.

### Task 8.4: Payments Settings

- [ ] Toggle Cash on Delivery.
- [ ] Configure Vodafone Cash number and instructions.
- [ ] Configure card method as gateway-ready/disabled until integration.
- [ ] Manage payment method logos displayed in footer.

---

## Phase 9: Media, Settings & Users

### Task 9.1: Media Library

- [ ] Upload images.
- [ ] Search/filter by folder.
- [ ] Preview, copy URL, edit alt text.
- [ ] Delete unused images with confirmation.
- [ ] Folders: products, brands, categories, homepage, banners, general.

### Task 9.2: Site & Contact Settings

- [ ] Site settings:
  - logo
  - favicon
  - site name
  - default meta title/description
  - Open Graph image
  - social links
  - payment method display.
- [ ] Contact settings:
  - email `info@kmmuscles.com`
  - phone `+201159500155`
  - WhatsApp
  - address `Fairouz District, Luxor City`
  - map link/embed
  - working hours.

### Task 9.3: Users & Roles

- [ ] List admin users.
- [ ] Create/edit/deactivate users.
- [ ] Assign roles:
  - Super Admin
  - Admin
  - Product Manager
  - Content Manager
  - Order Staff
  - Staff.
- [ ] Prevent users from deleting/deactivating themselves.

---

## Phase 10: UX, Accessibility & Tests

- [ ] Keep admin dense, clear, and table-first.
- [ ] Use icons for row actions with tooltips.
- [ ] Show validation errors beside fields.
- [ ] Confirm destructive actions.
- [ ] Persist table filters in URL where practical.
- [ ] WCAG AA contrast.
- [ ] Keyboard accessible dialogs, menus, and form controls.
- [ ] Responsive admin layout for tablet/mobile emergency use.
- [ ] Test login, protected routes, product form validation, order status update, policy editor save, and media upload states.

## Acceptance Criteria

- [ ] Admin can manage all CMS/content/product/order areas required by the BRD.
- [ ] Dashboard modules match the UI/UX required sidebar.
- [ ] Product management supports supplement-specific catalog fields.
- [ ] Payments match launch requirements: COD, Vodafone Cash manual, card-ready.
- [ ] The document uses only KMMuscles supplement-commerce terminology.
