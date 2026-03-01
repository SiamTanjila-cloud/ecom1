You are a senior full-stack architect and SaaS engineer.

Build a PRODUCTION-READY, MODERN, ENTERPRISE-LEVEL, FULLY CUSTOMIZABLE eCommerce platform as a SaaS , like i should able to sell this to multiple customer. use modarn style 

This is NOT a basic demo project.
It must be scalable, modular, multi-tenant ready, and extremely customizable.

==================================================
TECH STACK (MANDATORY)
==================================================

Frontend:
vite+react+tailwind

Backend:
- Node.js
- Express or Next.js Route Handlers
- PostgreSQL
- Prisma ORM
- Redis (caching + sessions)
- JWT + Refresh Token Auth


==================================================
CORE REQUIREMENTS
==================================================

This platform must support:

1. Multi-Vendor Architecture
   - Admin panel
   - Vendor panel
   - Customer panel
   - Role-based access control

2. Ultra Customizable Theme Engine
   - Admin can change:
     - Primary/secondary colors
     - Fonts
     - Button styles
     - Border radius
     - Layout type (grid/list)
     - Header style
     - Footer layout
   - Store theme stored in DB
   - Dynamic CSS variables system

3. Dynamic Page Builder
   - Drag & drop page sections
   - Reorder homepage blocks
   - Add banners, product grids, testimonials
   - JSON-driven layout system

4. Product System
   - Simple products
   - Variable products (size, color, etc.)
   - Digital products
   - Inventory tracking
   - SKU system
   - Bulk pricing
   - Flash sales
   - Product SEO fields

5. Advanced Search
   - Full-text search
   - Filter by:
     - Category
     - Price range
     - Rating
     - Availability
   - Sorting options

6. Cart & Checkout
   - Persistent cart
   - Guest checkout
   - Coupon system
   - Tax calculation
   - Shipping calculation
   - Stripe integration

7. Order Management
   - Order status tracking
   - Refund system
   - Invoice generation

8. Admin Dashboard
   - Sales analytics (charts)
   - Revenue reports
   - Top products
   - User growth
   - Conversion rate tracking

9. Vendor Dashboard
   - Vendor earnings
   - Commission system
   - Vendor analytics

10. Customer Features
   - Wishlist
   - Order history
   - Profile management
   - Reviews & ratings

==================================================
EXTREME CUSTOMIZATION FEATURES
==================================================

Add:

- Custom product fields (admin can create new fields)
- Custom checkout fields
- Plugin architecture
- Webhook system
- API-first design (REST endpoints documented)
- Multi-currency support
- Multi-language support
- Feature flags system
- CMS blog system

==================================================
DATABASE DESIGN
==================================================

Design full Prisma schema including:

- Users
- Roles
- Stores
- Vendors
- Products
- Categories
- Orders
- Payments
- Reviews
- Coupons
- Themes
- Pages
- Settings
- Webhooks

==================================================
PERFORMANCE
==================================================

- Server-side rendering where needed
- API caching with Redis
- Optimized queries
- Image optimization
- Lazy loading
- Code splitting

==================================================
SECURITY
==================================================

- Rate limiting
- Input validation (Zod)
- XSS protection
- CSRF protection
- Secure auth flow
- Password hashing (bcrypt)

==================================================
DELIVERABLE FORMAT
==================================================

Generate:

1. Full folder structure
2. Database schema
3. API route examples
4. Frontend page examples
5. Authentication flow
6. Theme system implementation
7. Page builder logic
8. Example plugin system
9. README with setup instructions
10. Dockerfile

Write production-level code with clean architecture.
No placeholders.
No pseudo code.
Real working code.

==================================================
GOAL
==================================================

This should be able to compete with Shopify (basic version),
fully customizable,
scalable to millions of users,
and cleanly structured.

Start building the project step by step.