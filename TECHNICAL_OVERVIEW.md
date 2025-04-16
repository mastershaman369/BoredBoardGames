# Technical Implementation & Overview — Bored Board Games (2025)

## 1. Project Purpose & Vision

A modern, scalable, and community-driven e-commerce platform for board games, card games, and tabletop products. Launches with a robust marketplace MVP, then expands to advanced social, community, and admin features.

---

## 2. Phased Roadmap

**Phase 1: MVP Foundation**
- Product catalog/grid with search/filter
- Product detail pages
- Persistent cart (global, Context API + localStorage)
- Multi-step checkout (Stripe integration, basic)
- Layaway checkout option (admin-togglable, no payment required)
- Admin dashboard: CRUD for products/categories, layaway toggle (UI, live, in-memory)
- Toasts/alerts for all cart and admin actions
- Manual E2E testing; automated tests post-MVP

**Phase 2: Marketplace Expansion**
- Advanced product search/filtering
- Product reviews, ratings, related products
- Wishlist, layaway, multi-payment (Stripe/PayPal)
- Order history, improved admin dashboard (analytics, inventory)
- Stripe Connect for multi-vendor, commission, and payouts
- Admin UI to manage Stripe/Connect settings, commission rates

**Phase 3: Community & Social**
- User profiles: avatars, bios, badges, collections
- Forums: threaded posts/replies, markdown, media uploads
- Likes, emoji reactions, sharing, direct messaging
- Notifications: in-app/email, real-time
- Events calendar, following/friends, discover feeds
- Content moderation/admin tools

**Phase 4: Enterprise & Scale**
- Persistent database (MongoDB, Beanie ODM)
- Caching (Redis), background queues (RabbitMQ/Redis Streams)
- Full test suite (Jest, Cypress, Pytest)
- Dockerized deployment, CI/CD, advanced analytics

---

## 3. Architecture & Stack Details

**Frontend**
- Framework: Next.js 14.x (App Router, SSR/SSG, file-based routing)
- Language: TypeScript (strict mode)
- UI: Custom CSS (MVP), MUI (future)
- State: React Context API (cart), localStorage (cart persistence)
- Auth: NextAuth.js (future)
- Payments: Stripe.js (MVP), PayPal JS SDK (future)
- Layaway checkout option (toggle from admin UI)
- Toasts/alerts for user/admin feedback
- Testing: Manual E2E (MVP), Jest/Cypress (future)
- Build/Dev: Dockerized, Vercel/Netlify ready

**Backend**
- Framework: FastAPI (latest, async, type-safe)
- Language: Python 3.11+
- Database: In-memory (MVP), MongoDB (Beanie ODM, async, future)
- API: RESTful endpoints for products, categories, cart, orders, settings
- Admin endpoints: CRUD for products/categories, layaway toggle (in-memory)
- Payments: Stripe integration (MVP), PayPal (future), layaway bypass
- Testing: Manual E2E (MVP), Pytest (future)
- Deployment: Dockerized, local only for MVP

---

## 4. API Endpoints (MVP)

### Product Endpoints
- `GET /products` — List all products (optionally by category)
- `GET /products/{id}` — Get product details
- `POST /products` — Add product (admin)
- `PUT /products/{id}` — Update product (admin)
- `DELETE /products/{id}` — Delete product (admin)

### Category Endpoints
- `GET /categories` — List all categories
- `POST /categories` — Add category (admin)
- `PUT /categories/{id}` — Update category (admin)
- `DELETE /categories/{id}` — Delete category (admin)

### Cart & Checkout
- Cart is managed on frontend (Context API + localStorage)
- `POST /orders` — Create order (Stripe or layaway)
- `GET /orders` — List all orders (admin)
- `POST /stripe/checkout` — Create Stripe checkout session

### Settings
- `GET /settings` — Get site settings (layaway_enabled)
- `PUT /settings` — Update settings (admin: layaway_enabled)

---

## 5. Admin Dashboard (MVP)

- Access at `/admin` (no auth for MVP; local only)
- Manage products and categories (add, edit, delete)
- Toggle layaway on/off (live, in-memory)
- View all orders and layaway status
- All admin changes are reflected instantly for users
- All actions show toast/alert feedback

---

## 6. UI/UX Foundation

- Responsive, mobile-first layouts
- Accessible navigation and forms
- Toasts for all cart/admin actions
- Modern, clean look (custom CSS, MUI in future)

---

## 7. Security & Best Practices

- All code, config, and tests in `~/Documents/GitHub/BoredBoardGames` only
- Never expose secrets, credentials, or sensitive data in code or deployments
- Use secure coding, error handling, and logging
- All code changes tested end-to-end before commit/push
- Only deploy from `get`-tagged, fully tested commits

---

## 8. Contribution & Documentation

- All contributors must keep documentation up to date
- README.md always links to all technical docs and is the entry point for new contributors or resuming work outside Windsor
- Remove or archive any outdated docs or code before contributing

---

## 9. Branding & Contact

- Project name everywhere: **Bored Board Games**
- Domain: **boredboardgames.com**
- All admin/support emails: `admin@boredboardgames.com`, `support@boredboardgames.com`

---

## 10. Git & Deployment Protocol

- All work in `~/Documents/GitHub/BoredBoardGames`
- GitHub: [BoredBoardGames](https://github.com/mastershaman369/BoredBoardGames.git)
- Only push tested, stable code to `main`
- Tag stable releases as `get` (e.g., `get-v1.0.0`)
- Only deploy to live from `get`-tagged commits
