# Frontend Development Tasks — KMMuscles Main Website

**Project:** KMMuscles — Supplements E-Commerce Website  
**Stack:** Next.js 14+ App Router · React 18+ · TypeScript · Tailwind CSS · Radix UI · React Hook Form · Zod · Lucide React · Motion  
**Duration:** 5-6 weeks  
**Last Updated:** May 31, 2026

## Referenced Requirements

- `KMMuscles_BRD.md`
- `KMMuscles_Technical-Specifications-Frontend-Backend.md`
- `KMMuscles_UI-UX-Design-Requirements.md`

---

## Scope

### Must Ship

1. Home page matching KMMuscles visual direction: dark fitness storefront, bold imagery, red/orange CTAs.
2. Sticky responsive navbar with Shop By Category dropdown.
3. Goal-based shopping cards: After Training, Before Training, Weight Gain, Strength.
4. Promotional banner section from CMS.
5. Best Sellers product section.
6. Product listing with search, filters, sort, and pagination.
7. Product detail page with gallery, variants, benefits, how to use, nutrition facts, related products.
8. Brand listing and brand detail pages.
9. Cart using localStorage for guest shoppers.
10. Checkout with Cash on Delivery and Vodafone Cash manual instructions.
11. Order confirmation page with reference number.
12. Contact, About, FAQs, Privacy Policy, Shipping Policy, Refund Policy, Terms.
13. Footer with contact, social links, policies, and payment methods.
14. SEO metadata, sitemap, robots, Open Graph, and product structured data.

### Phase 2

- Customer account area.
- Register/login.
- Saved addresses.
- Order history.
- Reorder.
- Wishlist.
- Online card payment flow once gateway is selected.

### Out of Scope for Initial Release

- CMS/Admin dashboard.
- Native mobile app.
- Multi-currency checkout.
- International shipping.
- Loyalty program.
- Product review submission.

---

## Phase 1: Project Setup

### Task 1.1: Initialize Next.js

- [ ] Create app: `npx create-next-app@latest kmmuscles-website`.
- [ ] Use TypeScript, ESLint, Tailwind CSS, App Router, and `@/*` alias.
- [ ] Verify app runs on `localhost:3000`.
- [ ] Configure environment variable `NEXT_PUBLIC_API_URL`.

### Task 1.2: Install Dependencies

- [ ] UI: Radix Dialog, Dropdown Menu, Tabs, Accordion, Toast, Checkbox, Select, Slider.
- [ ] Forms: `react-hook-form`, `zod`, `@hookform/resolvers`.
- [ ] Icons: `lucide-react`.
- [ ] Motion: `motion`, `react-intersection-observer`, `@formkit/auto-animate`.
- [ ] Commerce/UI helpers: `swiper`, `react-toastify`, `js-cookie`.
- [ ] Testing: React Testing Library and Jest/Vitest depending on project setup.

### Task 1.3: Tailwind Theme

- [ ] Configure KMMuscles colors:
  - `muscle-black`: `#050505`
  - `deep-charcoal`: `#111111`
  - `gym-red`: `#E21B2D`
  - `energy-orange`: `#FF6A00`
  - `pure-white`: `#FFFFFF`
  - `light-gray`: `#F5F5F5`
  - `medium-gray`: `#A3A3A3`
  - `border-gray`: `#2A2A2A`
  - status colors from UI/UX requirements.
- [ ] Configure fonts:
  - Headings: Oswald or Bebas Neue.
  - Body: Inter.
  - Arabic fallback: Cairo or IBM Plex Sans Arabic.
- [ ] Use max width `1280px-1440px`.
- [ ] Keep cards/buttons radius in the 8px-16px range per component requirements.

### Task 1.4: App Structure

```
app/
├── page.tsx
├── layout.tsx
├── globals.css
├── products/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── categories/[slug]/page.tsx
├── brands/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── goals/[slug]/page.tsx
├── cart/page.tsx
├── checkout/page.tsx
├── order-confirmation/[reference]/page.tsx
├── contact/page.tsx
├── about-us/page.tsx
├── privacy-policy/page.tsx
├── shipping-policy/page.tsx
├── refund-policy/page.tsx
├── terms-and-conditions/page.tsx
└── faqs/page.tsx

components/
├── layout/
├── common/
├── home/
├── products/
├── product-detail/
├── brands/
├── cart/
├── checkout/
├── content/
└── seo/

lib/
├── api.ts
├── cart.ts
├── format.ts
├── validations.ts
└── animations.ts

context/
└── CartContext.tsx

types/
├── product.ts
├── cart.ts
├── order.ts
├── content.ts
├── settings.ts
└── common.ts
```

---

## Phase 2: API Client & Types

### Task 2.1: API Client

- [ ] Create `lib/api.ts` with a typed fetch wrapper.
- [ ] Public endpoints:
  - `fetchHomeContent()` -> `/content/home`
  - `fetchProducts(params)` -> `/products`
  - `fetchProductBySlug(slug)` -> `/products/:slug`
  - `fetchRelatedProducts(slug)` -> `/products/:slug/related`
  - `fetchCategories()` -> `/categories?showInNavbar=true`
  - `fetchCategory(slug)` -> `/categories/:slug`
  - `fetchBrands()` -> `/brands`
  - `fetchBrand(slug)` -> `/brands/:slug`
  - `fetchGoals()` -> `/goals`
  - `fetchGoal(slug)` -> `/goals/:slug`
  - `fetchPolicy(key)` -> `/policies/:key`
  - `fetchSiteSettings()` -> `/settings/site`
  - `fetchContactSettings()` -> `/settings/contact`
  - `createOrder(data)` -> `POST /orders`
  - `fetchOrderConfirmation(reference)` -> `/order-confirmation/:reference`
- [ ] Handle API errors with user-friendly messages.
- [ ] Use server components where possible for SEO-critical pages.

### Task 2.2: TypeScript Types

- [ ] Product, ProductImage, ProductVariant.
- [ ] Brand, Category, GoalCollection.
- [ ] Product filters and pagination response.
- [ ] CartItem and CartState.
- [ ] Checkout request and order response.
- [ ] HomeContent, Banner, PolicyPage.
- [ ] SiteSettings and ContactSettings.

---

## Phase 3: Layout, Navigation & Design System

### Task 3.1: Global Layout

- [ ] Load fonts in `app/layout.tsx`.
- [ ] Add default metadata from site settings where available.
- [ ] Add providers for cart and toasts.
- [ ] Add global responsive container utilities.

### Task 3.2: Navbar

- [ ] Sticky top navbar.
- [ ] Logo left with max height 48px desktop and 40px mobile.
- [ ] Navigation:
  - Home
  - Shop By Category dropdown
  - Brands
  - Privacy Policy
  - Shipping Policy
  - Refund Policy
  - Contact
- [ ] Right actions: account/login icon and cart icon with live count.
- [ ] Desktop category dropdown from API categories.
- [ ] Mobile hamburger menu with category accordion.
- [ ] Keyboard accessible dropdowns and menus.

### Task 3.3: Reusable Components

- [ ] Button variants: primary, secondary, accent, ghost, danger.
- [ ] ProductCard with image, badge, name, category/brand, price, original price, add-to-cart.
- [ ] GoalCard with image, title, Discover button, hover zoom.
- [ ] PromoBanner with title, subtitle, image, CTA, link.
- [ ] PriceDisplay.
- [ ] Badge.
- [ ] QuantitySelector.
- [ ] Breadcrumb.
- [ ] EmptyState.
- [ ] Loading skeletons.
- [ ] Pagination.
- [ ] Filter drawer/sidebar.
- [ ] Search input.
- [ ] Footer with shop links, company links, policies, contact, social, payment logos.

---

## Phase 4: Home Page

### Task 4.1: Hero Section

- [ ] Use CMS content from `/api/content/home`.
- [ ] Required headline fallback: `REACH YOUR POTENTIAL`.
- [ ] Required subtitle fallback: `Everyone has goals, let us help you with yours`.
- [ ] CTA: `Shop Now`.
- [ ] Use high-impact supplement/fitness imagery.
- [ ] Ensure first viewport hints at the next section.

### Task 4.2: Goal-Based Shopping

- [ ] Render four cards:
  - After Training
  - Before Training
  - Weight Gain
  - Strength
- [ ] Each card links to `/goals/[slug]` or `/products?goal=slug`.
- [ ] Cards use image-heavy layouts and Discover CTAs.

### Task 4.3: Promotional Banner

- [ ] Render CMS-controlled active banner.
- [ ] Support link target to category, brand, product, or offer page.
- [ ] Use responsive image ratios.

### Task 4.4: Best Sellers

- [ ] Fetch `/api/products?bestSeller=true&limit=8`.
- [ ] Render product grid with add-to-cart.
- [ ] Show discount badge and original price when present.

### Task 4.5: Store Contact Strip

- [ ] Show address, phone, email, social links.
- [ ] Include map link or embedded map if configured.

---

## Phase 5: Product Catalog

### Task 5.1: Products Page

- [ ] Route `/products`.
- [ ] Search by product name/description/SKU.
- [ ] Filters:
  - category
  - brand
  - goal
  - price range
  - in stock
  - best seller/featured
- [ ] Sort:
  - newest
  - price low-to-high
  - price high-to-low
  - name
  - best sellers
- [ ] Product grid:
  - desktop 4 columns
  - laptop 3 columns
  - tablet 2 columns
  - mobile 1 or 2 columns based on density.
- [ ] Use query params so filters are shareable.
- [ ] Add empty state for no results.

### Task 5.2: Category, Brand & Goal Listing Pages

- [ ] `/categories/[slug]` uses category metadata and filtered products.
- [ ] `/brands` lists active brands with logos.
- [ ] `/brands/[slug]` shows brand detail and filtered products.
- [ ] `/goals/[slug]` shows goal collection and filtered products.
- [ ] Include SEO metadata per page.

### Task 5.3: Product Detail Page

- [ ] Gallery with image thumbnails.
- [ ] Product name, brand, category.
- [ ] Price and original price.
- [ ] Discount/status badges.
- [ ] Availability and stock state.
- [ ] Description, benefits, how to use, ingredients/nutrition facts.
- [ ] Flavor/size variants.
- [ ] Quantity selector.
- [ ] Add to Cart and Buy Now.
- [ ] Related products.
- [ ] Product structured data.

---

## Phase 6: Cart & Checkout

### Task 6.1: Cart Context

- [ ] Store guest cart in localStorage under `kmmuscles_cart`.
- [ ] Cart item shape: productId, slug, variantId, name, image, unit price snapshot, quantity.
- [ ] Re-fetch product data when opening cart/checkout to catch stock and price changes.
- [ ] Provide add, update, remove, clear, itemCount, subtotal.
- [ ] Update cart badge immediately.

### Task 6.2: Cart Page

- [ ] Show cart items with image, name, variant, price, quantity controls, remove action.
- [ ] Show subtotal, delivery fee placeholder if configured, total.
- [ ] Continue shopping and checkout CTAs.
- [ ] Empty cart state.

### Task 6.3: Checkout Page

- [ ] Guest checkout, no forced account.
- [ ] Fields:
  - full name
  - phone
  - optional email
  - governorate
  - city
  - full address
  - optional notes
  - payment method
- [ ] Payment methods:
  - Cash on Delivery
  - Vodafone Cash manual confirmation with instructions
  - Card disabled/ready state if not active
- [ ] Submit `POST /api/orders`.
- [ ] Show validation errors clearly.
- [ ] Redirect to `/order-confirmation/[reference]`.

### Task 6.4: Order Confirmation

- [ ] Show reference number.
- [ ] Show order summary.
- [ ] Show payment instructions if Vodafone Cash.
- [ ] Show contact/support info.

---

## Phase 7: CMS Content Pages

- [ ] `/about-us` from CMS content.
- [ ] `/contact` with contact form shell, store info, phone/WhatsApp, social links, map.
- [ ] `/privacy-policy`, `/shipping-policy`, `/refund-policy`, `/terms-and-conditions` from policy API.
- [ ] `/faqs` from CMS content or FAQ API when available.
- [ ] Policy pages include clear header, rich text, last updated date, and contact link.

---

## Phase 8: SEO, Accessibility & Performance

- [ ] Dynamic metadata for products, categories, brands, policies, and homepage.
- [ ] Generate `sitemap.xml` and `robots.txt`.
- [ ] Use Open Graph images.
- [ ] Add Product structured data for product detail pages.
- [ ] Optimize images with Next Image.
- [ ] Lazy-load below-fold media.
- [ ] WCAG AA contrast.
- [ ] Keyboard navigation for menus, filters, cart controls, and checkout.
- [ ] Visible form labels and validation messages.
- [ ] Avoid text baked into images where possible.
- [ ] Home page target load under 3 seconds on normal mobile connection.

---

## Phase 9: Testing & Acceptance

- [ ] Product card renders price, badge, and add-to-cart states.
- [ ] Filters update URL and results.
- [ ] Cart persists after refresh.
- [ ] Quantity changes update totals.
- [ ] Checkout validates required fields.
- [ ] Order submission handles success and API error states.
- [ ] Mobile navbar and category accordion work.
- [ ] Footer renders contact and payment methods from settings.
- [ ] Responsive checks for desktop, tablet, and mobile.
- [ ] Accessibility smoke test with keyboard navigation.

## Acceptance Criteria

- [ ] Website visually follows KMMuscles dark, bold, fitness/supplements direction.
- [ ] All initial public routes from the technical specification exist.
- [ ] Home content and footer/contact/payment data come from CMS APIs with fallback values.
- [ ] Products can be browsed by category, brand, goal, search, price, and stock.
- [ ] Guest checkout creates orders and displays a reference number.
- [ ] The document uses only KMMuscles supplement-commerce terminology.
