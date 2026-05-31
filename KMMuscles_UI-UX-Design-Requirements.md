# UI/UX Design Requirements

## KMMuscles — Supplements E-Commerce Website & CMS

| Field | Detail |
| --- | --- |
| Document Version | 1.0 |
| Date | May 31, 2026 |
| Project Name | KMMuscles E-Commerce Website & CMS |
| Project Type | Full-Stack Supplements E-Commerce Website |
| Status | Planning / Development Ready |

---

## Table of Contents

1. Brand Identity
2. Color System
3. Typography
4. Logo Usage Guidelines
5. Iconography & Imagery
6. Layout & Grid System
7. Component Design System
8. Page-Level UX Requirements
9. E-Commerce UX
10. Customer Account UX
11. Responsive Design
12. Accessibility
13. Motion & Animation
14. CMS/Admin Panel Design
15. Content & SEO UX

---

# 1. Brand Identity

## 1.1 Brand Overview

| Attribute | Value |
| --- | --- |
| Brand Name | KMMuscles |
| Industry | Sports Nutrition / Supplements / Fitness E-Commerce |
| Brand Positioning | Supplements store helping customers reach fitness goals |
| Brand Personality | Bold, energetic, strong, motivational, direct, performance-focused |
| Target Audience | Gym users, athletes, bodybuilders, fitness beginners, and supplement buyers in Egypt |
| Core Message | Everyone has goals; KMMuscles helps customers reach theirs |

## 1.2 Brand Voice & Tone

| Context | Tone |
| --- | --- |
| Hero Copy | Motivational, bold, short, high-energy |
| Product Copy | Clear, direct, benefit-focused |
| Category Copy | Goal-oriented and easy to understand |
| Offers | Urgent, attractive, simple |
| Policies | Clear, professional, trustworthy |
| CMS/Admin | Practical, clean, operation-focused |

## 1.3 Visual Direction

The website should be inspired by the current KMMuscles website:

- Dark fitness e-commerce style.
- Strong supplement product imagery.
- Bold hero banner.
- Goal-based sections.
- Best-seller product cards.
- Clear navigation by supplement category.
- Professional footer with store information and payment methods.

The new implementation should not copy Wix code. It should manually recreate a similar visual style with better responsiveness, clean structure, and reusable components.

---

# 2. Color System

## 2.1 Primary Palette

| Color Name | Hex Code | Usage |
| --- | --- | --- |
| Muscle Black | `#050505` | Main background, hero, footer, dark sections |
| Deep Charcoal | `#111111` | Cards, navbar, CMS dark accents |
| Gym Red | `#E21B2D` | Primary CTAs, offer badges, active states |
| Energy Orange | `#FF6A00` | Secondary accents, gradients, hover states |
| Pure White | `#FFFFFF` | Primary text on dark backgrounds |
| Light Gray | `#F5F5F5` | Light section backgrounds, product image backgrounds |
| Medium Gray | `#A3A3A3` | Secondary text, captions, inactive labels |
| Border Gray | `#2A2A2A` | Card borders, dividers |

## 2.2 Status Colors

| Status | Color | Usage |
| --- | --- | --- |
| Success Green | `#16A34A` | Delivered, paid, active, in stock |
| Warning Amber | `#F59E0B` | Pending, low stock, manual payment review |
| Error Red | `#DC2626` | Cancelled, failed, out of stock |
| Info Blue | `#2563EB` | New order, processing, info alerts |

## 2.3 Color Usage Rules

- Use black/charcoal as the dominant visual background.
- Use red/orange only for CTAs, badges, active links, and offers.
- Product cards may use white or very light backgrounds to make supplement images stand out.
- Buttons must have strong contrast.
- Footer should use Muscle Black or Deep Charcoal.
- CMS/Admin should be lighter and more operational, but still use the KMMuscles accent colors.

---

# 3. Typography

## 3.1 Font Families

| Usage | Font Family | Fallback |
| --- | --- | --- |
| English Headings | Oswald or Bebas Neue | Impact, Arial Narrow, sans-serif |
| English Body | Inter | Arial, sans-serif |
| Arabic Support | Cairo or IBM Plex Sans Arabic | Noto Sans Arabic, sans-serif |
| Admin Tables | Inter | Arial, sans-serif |

## 3.2 Type Scale

| Token | Desktop | Mobile | Weight | Usage |
| --- | --- | --- | --- | --- |
| display-xl | 64px | 40px | 800 | Hero headline |
| display-lg | 48px | 32px | 800 | Section titles |
| heading-1 | 40px | 28px | 700 | Page titles |
| heading-2 | 32px | 24px | 700 | Product sections |
| heading-3 | 24px | 20px | 700 | Card titles |
| body-lg | 18px | 16px | 400 | Hero subtitles |
| body | 16px | 15px | 400 | Default text |
| body-sm | 14px | 13px | 400 | Product meta, captions |
| caption | 12px | 12px | 600 | Badges, labels |

## 3.3 Text Rules

- Hero headlines must be uppercase and bold.
- Product names should be readable and not overly condensed.
- Prices should be highly visible.
- Discount badges should be short and uppercase.
- Policy pages should use comfortable reading line-height.

---

# 4. Logo Usage Guidelines

## 4.1 Logo Placement

| Location | Usage |
| --- | --- |
| Navbar | Left side, max height 48px |
| Mobile Navbar | Compact logo, max height 40px |
| Footer | Full logo with short brand description |
| Loading State | Optional logo mark or simple spinner |
| Admin Panel | Sidebar top |

## 4.2 Logo Rules

- Do not stretch or distort the logo.
- Do not place the logo on a low-contrast background.
- Keep clear spacing around the logo.
- Use white logo version on dark backgrounds if available.
- Use original brand colors where possible.

---

# 5. Iconography & Imagery

## 5.1 Icon Style

| Attribute | Requirement |
| --- | --- |
| Library | Lucide React or Heroicons |
| Style | Clean outline icons |
| Stroke | 1.75px to 2px |
| Sizes | 16px inline, 20px buttons, 24px navbar, 32px categories |
| Color | White/Gray on dark, Red/Orange for active states |

## 5.2 E-Commerce Icons

| Context | Icon |
| --- | --- |
| Cart | ShoppingCart |
| Account | UserCircle |
| Search | Search |
| Filter | SlidersHorizontal |
| Category | Grid / Dumbbell / Package |
| Brand | Badge / Shield |
| Delivery | Truck |
| Payment | CreditCard / Wallet |
| Offers | Tag |
| Stock | PackageCheck |

## 5.3 Imagery Guidelines

- Product images should be high-resolution PNG/WebP.
- Product cards should use clean transparent or light backgrounds.
- Hero/banner images should show supplements, gym atmosphere, or fitness lifestyle.
- Goal cards should visually match each goal:
  - After Training: recovery/protein product visuals.
  - Before Training: pre-workout energy visuals.
  - Weight Gain: mass gainer visuals.
  - Strength: creatine/performance visuals.
- Use image ratios consistently:
  - Hero: 16:9 or full-width responsive.
  - Product card: 1:1.
  - Goal card: 4:5 or 1:1.
  - Banners: 21:9 or 16:9.

---

# 6. Layout & Grid System

## 6.1 Container

| Breakpoint | Max Width | Padding |
| --- | --- | --- |
| Desktop | 1280px - 1440px | 32px |
| Tablet | 100% | 24px |
| Mobile | 100% | 16px |

## 6.2 Grid

- Product grid desktop: 4 columns.
- Product grid laptop: 3 columns.
- Product grid tablet: 2 columns.
- Product grid mobile: 1 or 2 columns depending on card density.
- Category/goal cards desktop: 4 columns.
- Admin tables: full-width with pagination and filters.

## 6.3 Spacing Scale

| Token | Value | Usage |
| --- | --- | --- |
| xs | 4px | Small icon gaps |
| sm | 8px | Badge padding |
| md | 16px | Card inner spacing |
| lg | 24px | Grid gaps |
| xl | 32px | Section spacing |
| 2xl | 48px | Large blocks |
| 3xl | 64px | Section vertical padding |
| 4xl | 96px | Hero vertical padding |

---

# 7. Component Design System

## 7.1 Buttons

| Variant | Background | Text | Usage |
| --- | --- | --- | --- |
| Primary | Gym Red `#E21B2D` | White | Shop Now, Add to Cart, Checkout |
| Secondary | Transparent | White/Black based on background | Discover, View Details |
| Accent | Energy Orange `#FF6A00` | White | Promo CTA |
| Ghost | Transparent | Red/White | Footer links, secondary actions |
| Danger | Error Red | White | Delete/cancel actions |

Button requirements:

- Medium: 44px height.
- Large: 52px height.
- Border radius: 8px to 12px.
- Hover: slight lift and darker background.
- Disabled: reduced opacity and no hover animation.

## 7.2 Navbar

Desktop navbar:

- Sticky top.
- Dark background or transparent over hero with dark blur on scroll.
- Logo left.
- Links center.
- Cart/login right.
- Shop By Category dropdown.

Navigation items:

| Label | Link |
| --- | --- |
| Home | `/` |
| Shop By Category | Dropdown |
| Brands | `/brands` |
| Privacy Policy | `/privacy-policy` |
| Shipping Policy | `/shipping-policy` |
| Refund Policy | `/refund-policy` |
| Contact | `/contact` |

Category dropdown:

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

Mobile navbar:

- Logo.
- Cart icon.
- Hamburger menu.
- Full-screen slide menu.
- Accordion for categories.

## 7.3 Product Card

Product card structure:

1. Product image.
2. Optional badge: BIG OFFER, BEST SELLER, NEW, OUT OF STOCK.
3. Product name.
4. Category/brand.
5. Price in EGP.
6. Original price if discounted.
7. Add to Cart button.
8. Quick View icon on hover.

Visual requirements:

- Card background: White or `#FAFAFA`.
- Border radius: 16px.
- Product image ratio: 1:1.
- Hover: shadow + image slight scale.
- Badge position: top-left.
- Add to Cart visible on desktop and mobile.

## 7.4 Goal Category Card

Used for:

- After Training.
- Before Training.
- Weight Gain.
- Strength.

Requirements:

- Image-heavy card.
- Title overlay or below image.
- Discover button.
- Hover zoom.
- Links to filtered category/collection page.

## 7.5 Promotional Banner

- Full-width or container-width.
- CMS controlled.
- Supports title, subtitle, CTA, image, target link.
- Can be used for seasonal campaigns or discounts.

## 7.6 Footer

Footer columns:

1. Brand summary.
2. Shop.
3. The Company.
4. Contact Us.
5. Payment Methods.

Footer content:

- Email: `info@kmmuscles.com`.
- Address: Fairouz District, Luxor City.
- Phone: `+201159500155`.
- Facebook.
- Instagram.
- Privacy Policy.
- Shipping Policy.
- Refund Policy.
- Payment methods: MasterCard, Cash on Delivery, Vodafone Cash, Visa.

---

# 8. Page-Level UX Requirements

## 8.1 Home Page

- Hero with headline and CTA.
- Goal cards.
- Promotional banner.
- Best sellers.
- Store location/contact.
- Footer.

## 8.2 Products Page

- Page title.
- Search.
- Filters.
- Sort.
- Product grid.
- Pagination.
- Empty state.

## 8.3 Product Detail Page

- Product gallery.
- Product info.
- Price and availability.
- Description.
- Benefits/how to use.
- Variants.
- Add to cart.
- Related products.

## 8.4 Cart Page

- Cart items.
- Quantity controls.
- Remove item.
- Order summary.
- Checkout CTA.

## 8.5 Checkout Page

- Customer details.
- Address.
- Payment method.
- Order summary.
- Submit order.
- Confirmation page.

## 8.6 Policy Pages

- Clear page header.
- Rich text content from CMS.
- Last updated date.
- Contact link.

## 8.7 Contact Page

- Contact form.
- Store info.
- Phone/WhatsApp links.
- Social links.
- Map/location section.

---

# 9. E-Commerce UX

## 9.1 Cart UX

- Cart icon visible in navbar.
- Badge count updates immediately.
- Mini cart dropdown on desktop.
- Cart drawer optional on mobile.
- Cart persists using localStorage for guests.

## 9.2 Checkout UX

- Checkout should be short and simple.
- No forced registration for initial launch.
- Payment method selection should be clear.
- Manual Vodafone Cash instructions should appear when selected.
- Confirmation page should show reference number and order summary.

## 9.3 Offers UX

- Discount badges must be visible.
- Original price should be crossed out if a sale price exists.
- Best sellers and big offers should be manageable from CMS.

---

# 10. Customer Account UX

Phase 1:

- Guest checkout.
- Login link can exist but account feature may be optional.

Phase 2:

- Register/login.
- Saved addresses.
- Order history.
- Reorder button.
- Wishlist.

---

# 11. Responsive Design

## Desktop

- Full navbar.
- Category dropdown.
- 4-column product grid.
- Hero text and image side-by-side or overlay.

## Tablet

- Condensed navbar.
- 2-column product grid.
- Filter drawer or collapsible filter bar.

## Mobile

- Hamburger menu.
- Sticky cart icon.
- 1/2-column product grid depending on screen width.
- Stacked checkout form.
- Large touch targets.

---

# 12. Accessibility

- Use semantic HTML.
- All images must have alt text.
- Buttons must have accessible labels.
- Color contrast must meet WCAG AA.
- Menus and dropdowns must support keyboard navigation.
- Forms must have visible labels and validation messages.
- Avoid text baked into images where possible.

---

# 13. Motion & Animation

- Use subtle transitions only.
- Product image hover scale: max 1.05.
- Cards lift slightly on hover.
- Dropdown menus animate with opacity/translate.
- Cart badge can bounce on add.
- Avoid heavy animations that reduce performance.

---

# 14. CMS/Admin Panel Design

## 14.1 Design Style

- Clean admin layout.
- Sidebar navigation.
- Top bar with user/account actions.
- Data tables with filters.
- Clear create/edit forms.
- Dashboard cards for metrics.

## 14.2 Admin Sidebar

Required modules:

- Dashboard.
- Orders.
- Products.
- Categories.
- Brands.
- Homepage CMS.
- Banners.
- Customers.
- Payments.
- Policies.
- Media Library.
- Settings.
- Users & Roles.

## 14.3 Table UX

- Search.
- Filters.
- Sort.
- Pagination.
- Bulk actions if needed.
- Status badges.
- Row actions: View, Edit, Delete/Archive.

## 14.4 Form UX

- Required field indicators.
- Image preview before upload.
- Slug auto-generation.
- Save draft/publish controls for CMS content.
- Validation messages.
- Confirmation dialogs for destructive actions.

---

# 15. Content & SEO UX

- Each product must support meta title and meta description.
- Category pages must have SEO title/description.
- Product URLs must use clean slugs.
- Generate sitemap.xml and robots.txt.
- Use Open Graph images.
- Use Product structured data where possible.
- Policy pages must be CMS-editable.
