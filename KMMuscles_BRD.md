# Business Requirements Document (BRD)

## Project Title

**KMMuscles — Supplements E-Commerce Website, CMS & Admin Dashboard**

## Document Version

Version: 1.0  
Date: May 31, 2026

---

# 1. Executive Summary

This document defines the business and system requirements for rebuilding **KMMuscles** as a modern supplements e-commerce website with a dedicated **CMS and Admin Dashboard**.

The new website must visually follow the current KMMuscles website direction: a bold fitness/supplements storefront with strong product imagery, goal-based shopping sections, category navigation, best-seller product cards, policies, store/contact information, and payment-method presentation.

The project will convert the existing Wix-style storefront experience into a custom full-stack web application that gives the business full control over content, products, categories, brands, orders, payments, and promotional campaigns.

Customers will be able to browse supplement products, filter by category or brand, view product details, add products to cart, checkout, and submit orders. The business team will manage all website content and commerce operations through the CMS/Admin Dashboard.

---

# 2. Business Objectives

- Rebuild KMMuscles outside Wix as a custom, scalable e-commerce website.
- Keep the same general visual direction and user experience of the existing KMMuscles website while improving performance, responsiveness, and maintainability.
- Provide a CMS for managing homepage sections, banners, policies, categories, brands, products, and footer/contact data.
- Provide an Admin Dashboard for managing orders, customers, products, stock, discounts, and website content.
- Enable customers to shop supplements by goal, category, brand, and best sellers.
- Support local Egyptian market checkout flows, including Cash on Delivery, Vodafone Cash, and card payment readiness.
- Improve SEO and page speed compared to a Wix-based implementation.
- Make future expansion possible: customer accounts, coupons, loyalty, WhatsApp ordering, analytics, and payment gateways.

---

# 3. Scope of the Project

## 3.1 In Scope

### Public Customer Website

- Home page inspired by the current KMMuscles layout and style.
- Sticky responsive navbar.
- Category dropdown under **Shop By Category**.
- Product listing pages.
- Product detail pages.
- Brand listing and brand detail pages.
- Goal-based shopping sections:
  - After Training
  - Before Training
  - Weight Gain
  - Strength
- Best Sellers section.
- Promotional banners.
- Shopping cart.
- Checkout flow.
- Store location/contact section.
- Policy pages:
  - Privacy Policy
  - Shipping Policy
  - Refund Policy
- Contact page.
- Responsive mobile menu.
- Footer with company links, contact info, social links, and payment methods.

### CMS / Admin Dashboard

- Secure admin login.
- Dashboard analytics overview.
- Product management.
- Category management.
- Brand management.
- Goal collection management.
- Homepage content management.
- Banner and promotion management.
- Order management.
- Customer management.
- Payment method management.
- Policy page content management.
- Contact/store information management.
- Image upload and media library.
- Basic inventory/stock management.
- Discount badge and offer management.

### E-Commerce Features

- Product search.
- Category filtering.
- Brand filtering.
- Price filtering.
- Product sorting.
- Product badges such as Best Seller, Big Offer, New Arrival, Out of Stock.
- Add to cart.
- Quantity update.
- Checkout.
- Order confirmation with reference number.
- Order status tracking in admin.
- Optional customer accounts in Phase 2.

## 3.2 Out of Scope for Initial Release

- Native mobile application.
- Multi-vendor marketplace.
- Subscription plans for supplements.
- Advanced warehouse management.
- ERP/accounting integration.
- AI product recommendation engine.
- International shipping.
- Multi-currency checkout.

---

# 4. Target Users

## 4.1 Customers

- Gym users and athletes looking for supplements.
- Customers shopping for protein, creatine, mass gainers, pre-workout, amino acids, recovery products, fat burners, test boosters, carbohydrates, and multivitamins.
- Returning customers who want to quickly reorder common products.
- Customers in Egypt looking for local delivery and flexible payment methods.

## 4.2 Administrators

- Business owner.
- Store manager.
- Product/content manager.
- Order fulfillment staff.
- Customer support team.

---

# 5. User Roles & Permissions

| Role | Description | Access Level |
| --- | --- | --- |
| Guest | Can browse products, add to cart, and checkout without login | Public website |
| Customer | Can manage profile, addresses, and order history if account feature is enabled | Customer area |
| Order Staff | Can view and update orders only | Admin dashboard |
| Content Manager | Can manage CMS content, banners, categories, and policies | Admin dashboard |
| Product Manager | Can manage products, brands, pricing, stock, and discounts | Admin dashboard |
| Admin | Full access to all dashboard modules and settings | Admin dashboard |

---

# 6. Functional Requirements

## 6.1 Customer Website

### Home Page

The home page must reflect the current KMMuscles website experience while using a cleaner and more scalable implementation.

Required sections:

1. Header / Navbar
   - Logo.
   - Login link or account icon.
   - Home.
   - Shop By Category dropdown.
   - Brands.
   - Privacy Policy.
   - Shipping Policy.
   - Refund Policy.
   - Contact.
   - Cart icon with item count.
   - Mobile hamburger menu.

2. Hero Section
   - Fitness/supplements visual.
   - Main headline: **REACH YOUR POTENTIAL**.
   - Subtitle: **Everyone has goals, let us help you with yours**.
   - CTA button: **Shop Now**.

3. Goal-Based Shopping Section
   - After Training.
   - Before Training.
   - Weight Gain.
   - Strength.
   - Each card should have an image, title, Discover button, and link to filtered products.

4. Promotional Banner Section
   - Full-width image/banner controlled from CMS.
   - Can be linked to a category, brand, product, or offer page.

5. Best Sellers Section
   - Product cards controlled from CMS/product flags.
   - Product image.
   - Product name.
   - Price in EGP.
   - Discount badge if applicable.
   - Add to Cart button.

6. Store Location / Contact Strip
   - Store location.
   - Phone.
   - Email.
   - Social links.
   - Optional embedded map or map link.

7. Footer
   - Shop links.
   - Company links.
   - Policies.
   - Contact information.
   - Payment methods.
   - Social media.

### Product Categories

Required initial categories:

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

### Products Page

- Product grid.
- Search by product name.
- Filter by category.
- Filter by brand.
- Filter by price range.
- Filter by stock status.
- Sort by newest, price low-to-high, price high-to-low, best sellers.
- Pagination or infinite scroll.
- Empty state if no product matches filters.

### Product Detail Page

- Product image gallery.
- Product name.
- Brand.
- Category.
- Price and original price.
- Discount badge.
- Availability/stock status.
- Description.
- Benefits.
- How to use.
- Nutrition facts/specifications if available.
- Flavor/size variants if available.
- Quantity selector.
- Add to Cart.
- Buy Now.
- Related products.

### Cart

- View cart items.
- Update quantities.
- Remove items.
- Show subtotal.
- Show delivery fee if configured.
- Show total.
- Continue shopping.
- Proceed to checkout.

### Checkout

Required fields:

- Full name.
- Phone number.
- Email optional.
- Governorate/city.
- Delivery address.
- Notes optional.
- Payment method.

Supported payment methods for launch:

- Cash on Delivery.
- Vodafone Cash manual confirmation.
- Card payment readiness for Visa/Mastercard integration.

Checkout output:

- Order reference number.
- Order confirmation page.
- Admin notification.
- Optional customer email/SMS/WhatsApp confirmation.

### Static / CMS Pages

- About Us.
- Contact Us.
- Privacy Policy.
- Shipping Policy.
- Refund Policy.
- Terms & Conditions.
- FAQs.

---

## 6.2 CMS / Admin Dashboard

### Authentication

- Secure admin login.
- Password hashing.
- Role-based access.
- Logout.
- Session/token expiry.

### Dashboard Home

- Total orders.
- Pending orders.
- Delivered orders.
- Cancelled orders.
- Total revenue.
- Best-selling products.
- Low-stock products.
- Recent orders.

### Product Management

Admin can:

- Add product.
- Edit product.
- Delete/archive product.
- Upload product images.
- Set price and original price.
- Manage category.
- Manage brand.
- Manage stock quantity.
- Mark as Best Seller.
- Mark as Featured.
- Add discount badge such as **BIG OFFER 10%**.
- Manage product variants such as size/flavor.
- Control SEO title and description.

### Category Management

Admin can:

- Create category.
- Edit category.
- Set category slug.
- Upload category image.
- Reorder categories.
- Show/hide from navbar.

### Brand Management

Admin can:

- Add brand.
- Upload brand logo.
- Add brand description.
- Link products to brand.
- Show/hide brand on website.

### Homepage CMS

Admin can manage:

- Hero title.
- Hero subtitle.
- Hero image.
- Hero CTA text and link.
- Goal cards.
- Promo banners.
- Best sellers section title.
- Footer content.
- Contact info.
- Social links.
- Payment method logos.

### Order Management

Admin can:

- View all orders.
- Search by customer name, phone, or order reference.
- Filter by status/date/payment method.
- View order details.
- Update order status.
- Add internal notes.
- Print order invoice/packing slip.

Order statuses:

- New
- Confirmed
- Preparing
- Out for Delivery
- Delivered
- Cancelled
- Returned

### Customer Management

- View customer list.
- View customer order history.
- Search by name or phone.
- Optional customer account management in Phase 2.

### Media Library

- Upload images.
- Reuse images across products and CMS sections.
- Delete unused images.
- Store alt text for accessibility and SEO.

---

# 7. Non-Functional Requirements

## Performance

- Home page should load in under 3 seconds on normal mobile connection.
- Product listing API should respond in under 2 seconds for common filters.
- Images must be optimized and lazy-loaded.
- Use CDN/object storage for media.

## Security

- HTTPS across the platform.
- Hashed admin passwords.
- JWT or secure session authentication.
- Role-based permissions.
- Protection against XSS, CSRF, SQL injection, brute-force login attempts, and file-upload abuse.
- Validate all checkout and CMS inputs.

## Usability

- Mobile-first responsive design.
- Clear cart and checkout journey.
- Large product images.
- Easy category navigation.
- Visible pricing and stock status.
- Accessible contrast and keyboard navigation.

## Reliability

- Daily database backups.
- Error logging.
- Admin audit logs for sensitive updates.
- Graceful empty/error states.

## Scalability

- Architecture should support future payment gateway integration.
- Support more categories, brands, product variants, and order volume.
- CMS sections should be dynamic instead of hardcoded.

---

# 8. UI / UX Requirements

- The website should be visually close to the existing KMMuscles storefront while being cleaner, faster, and more professional.
- Design direction: bold fitness e-commerce, dark/black base, white typography, red/orange accent, large supplement product imagery.
- Typography should be bold and high-impact, especially in hero and section titles.
- Product cards should have hover states, badges, price clarity, and direct add-to-cart actions.
- Goal cards should use strong imagery and clear Discover buttons.
- The website must be fully responsive.
- CMS dashboard should be clean, table-based, easy to use, and optimized for daily operations.

---

# 9. Technical Requirements

Recommended stack:

| Layer | Technology |
| --- | --- |
| Frontend Website | Next.js App Router, React, TypeScript, Tailwind CSS |
| CMS/Admin Frontend | Next.js protected admin routes or separate React/Vite dashboard |
| Backend API | Node.js, Express, TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT access/refresh tokens or secure cookies |
| Validation | Zod |
| Forms | React Hook Form |
| File Storage | Cloudinary or S3-compatible storage |
| Payments | Cash on Delivery at launch, Vodafone Cash manual, card gateway-ready |
| Email | Nodemailer / SMTP provider |
| Deployment | Vercel for frontend, VPS/container for backend, managed PostgreSQL |

---

# 10. Assumptions

- KMMuscles owns the website content, logo, product information, and images used in the current website.
- The new website will not export Wix code; it will recreate the same design direction manually.
- Products, categories, brands, prices, and images will be entered through the CMS.
- Payment gateway integration may be added after the first release.
- Initial launch can support guest checkout without mandatory customer accounts.

---

# 11. Risks and Constraints

| Risk | Mitigation |
| --- | --- |
| Original Wix assets are not available | Use downloaded/owned assets or replace with new optimized product images |
| Product data is incomplete | Prepare a product import template before development completion |
| Payment integration delays | Launch with Cash on Delivery and manual Vodafone Cash, keep payment service abstraction ready |
| Admin complexity grows | Use role-based modules and phased feature delivery |
| SEO loss during migration | Implement redirects, metadata, sitemap, and structured data |
| Fake orders | Add validation, rate limiting, CAPTCHA if needed, and phone confirmation workflow |

---

# 12. Success Criteria

- Website visually matches the KMMuscles design direction.
- CMS can manage homepage content, products, categories, brands, banners, policies, and contact data.
- Customer can browse products, add items to cart, and complete checkout.
- Admin can view and update orders.
- Product catalog supports at least 100 products at launch.
- Website is fully responsive across desktop, tablet, and mobile.
- Website build and deployment are stable.
- Page speed is significantly better than the current Wix implementation.

---

# 13. Acceptance Criteria

- Customer can access Home, Shop By Category, Brands, Policies, Contact, Product Listing, Product Detail, Cart, and Checkout pages.
- Category dropdown includes all supplement categories listed in this BRD.
- Homepage includes hero, goal cards, promotional banner, best sellers, store location/contact section, and footer.
- Product cards display image, name, price, badge, and add-to-cart action.
- Checkout creates an order with a unique reference number.
- Admin can create/edit/delete products, categories, brands, banners, and policy pages.
- Admin can manage orders and update statuses.
- CMS changes appear on the public website without code deployment.
- Website is responsive and works on Chrome, Firefox, Safari, and Edge.
