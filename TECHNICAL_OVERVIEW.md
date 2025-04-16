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

**Phase 2: Production Readiness (Current)**
- **Database Migration:** Move all data (Products, Categories, Orders, Settings, Users) to MongoDB via Beanie ODM.
- **Authentication:** Secure admin dashboard and sensitive endpoints with JWT-based login/logout. User model with hashed passwords and admin flag.
- **Automated Testing:** Implement Pytest (backend), Jest/React Testing Library (frontend), Cypress (E2E).
- **CI/CD:** GitHub Actions pipeline for linting, testing, and deploying to Staging/Production (Vercel/Render/MongoDB Atlas).
- **Logging & Monitoring:** Add structured logging and integrate Sentry for error tracking.
- **Documentation:** Keep README.md and TECHNICAL_OVERVIEW.md fully updated.

**Phase 3: Marketplace Expansion**
- Multi-vendor support: Vendor registration/approval, vendor dashboard, vendor-specific product CRUD
- Customer accounts: Registration, login, profiles, order history
- Role-based access control (admin, vendor, customer)
- Product and order attribution to vendors
- Admin vendor management and oversight
- See [Marketplace Expansion Plan](./PHASE_3_MARKETPLACE_PLAN.md)

**Phase 4: Community & Engagement**
- Product reviews, wishlists, user profiles, forums
- Enhanced customer engagement and social features
- See [Community & Engagement Plan](./PHASE_4_COMMUNITY_PLAN.md)

**Phase 5: Enterprise & Scale**
- Caching (Redis), CDN, analytics, advanced monitoring, load testing, background tasks
- Performance and scalability optimizations
- See [Enterprise & Scale Plan](./PHASE_5_ENTERPRISE_PLAN.md)

---

## 3. Architecture & Stack Details

**Frontend**
- Framework: Next.js 14.x (App Router, SSR/SSG, file-based routing)
- Language: TypeScript (strict mode)
- UI: Custom CSS (MVP), MUI (future)
- State: React Context API (cart), localStorage (cart persistence)
- Auth: JWT (Phase 2+), NextAuth.js (future/optional)
- Payments: Stripe.js (MVP), PayPal JS SDK (future)
- Layaway checkout option (toggle from admin UI)
- Toasts/alerts for user/admin feedback
- Testing: Manual E2E (MVP), Jest/Cypress (Phase 2+)
- Build/Dev: Dockerized, Vercel/Netlify ready

**Backend**
- Framework: FastAPI (latest, async, type-safe)
- Language: Python 3.11+
- Database: In-memory (MVP), MongoDB (Beanie ODM, async, Phase 2+)
- API: RESTful endpoints for products, categories, cart, orders, settings, reviews, wishlists, forums
- Admin endpoints: CRUD for products/categories, layaway toggle, vendor management (now secured)
- Payments: Stripe integration (MVP), PayPal (future), layaway bypass
- Testing: Manual E2E (MVP), Pytest (Phase 2+)
- Deployment: Dockerized, local for MVP, Vercel/Render for Staging/Production

---

## 4. API Endpoints (By Phase)

### Phase 2+ (Production Readiness)
- See above for detailed endpoints (products, categories, orders, settings, auth)

### Phase 3 (Marketplace Expansion)
- Vendor endpoints: registration, profile, product CRUD, order view
- Customer endpoints: registration, login, profile, order history
- Admin endpoints: vendor approval/management
- Role-based access control for all sensitive endpoints

### Phase 4 (Community & Engagement)
- Review endpoints: submit, edit, delete, fetch reviews for products
- Wishlist endpoints: add/remove/list products in wishlist
- Forum endpoints: threads, posts, replies, search
- User profile endpoints: public/private profile data

### Phase 5 (Enterprise & Scale)
- Caching endpoints, analytics, monitoring, background task management

---

## 5. Admin Dashboard (By Phase)

- Phase 2: Secure admin login, product/category/order management, layaway toggle
- Phase 3: Add vendor management, view vendor/product/order attribution
- Phase 4: Moderate reviews, forums, and manage community content
- Phase 5: Access to analytics, monitoring dashboards

---

## 6. UI/UX Foundation
- Responsive, mobile-first layouts
- Accessible navigation and forms
- Toasts for all cart/admin actions
- Modern, clean look (custom CSS, MUI in future)
- Community and marketplace features as platform evolves

---

## 7. Security & Best Practices
- All code, config, and tests in `~/Documents/GitHub/BoredBoardGames` only
- Never expose secrets, credentials, or sensitive data in code or deployments
- Use Pydantic/Beanie for strict input validation
- Hash all passwords with bcrypt
- Use JWT for authentication and protect all sensitive endpoints
- Role-based access control (RBAC) for admin/vendor/customer
- All code changes tested end-to-end before commit/push
- Only deploy from `get`-tagged, fully tested commits
- Use secure secrets management in hosting/CI
- Monitor dependencies for vulnerabilities
- Enforce HTTPS in production
- Sanitize all user-generated content (reviews, forums, bios)
- Rate limiting for content creation endpoints (reviews, posts)

---

## 8. Contribution & Documentation
- All contributors must keep documentation up to date
- README.md always links to all technical docs and is the entry point for new contributors or resuming work outside Windsor
- Remove or archive any outdated docs or code before contributing
- Document all architectural and security changes in README.md and TECHNICAL_OVERVIEW.md
- See phase plans for detailed requirements ([Phase 3](./PHASE_3_MARKETPLACE_PLAN.md), [Phase 4](./PHASE_4_COMMUNITY_PLAN.md), [Phase 5](./PHASE_5_ENTERPRISE_PLAN.md))

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
- Use GitHub Actions for CI/CD (lint, test, build, deploy)
- Separate Staging and Production environments (secrets, DBs, deploy targets)

---

## 11. Execution Plan by Phase

### Phase 2: Production Readiness
1. Database migration (MongoDB/Beanie)
2. Admin authentication (JWT, hashed passwords)
3. Automated testing (Pytest, Jest, Cypress)
4. CI/CD pipeline (GitHub Actions, Vercel/Render)
5. Logging & Sentry integration
6. Documentation updates
7. Security mandates
8. Definition of Done: All data persistent, all APIs secured, tests passing, CI/CD working, staging live, docs up to date

### Phase 3: Marketplace Expansion
1. Vendor model, registration/approval, dashboard
2. Customer accounts, registration, login, profiles, order history
3. Database schema updates for vendor/customer
4. API & RBAC expansion
5. Vendor/customer dashboards, admin vendor management
6. Testing expansion (unit, integration, E2E)
7. Deployment & documentation
8. Security: RBAC, data segregation, validation, admin approval
9. Definition of Done: Multi-vendor, customer accounts, RBAC, tested, deployed, docs

### Phase 4: Community & Engagement
1. Review, wishlist, forum models and endpoints
2. Enhanced user profiles
3. Community UI (reviews, wishlists, forums)
4. Testing for all community features
5. Security: XSS sanitization, authorization, rate limiting, privacy
6. Deployment & documentation
7. Definition of Done: Community features live, tested, docs updated

### Phase 5: Enterprise & Scale
1. Caching (Redis), CDN, analytics, monitoring
2. Database/index optimization
3. Load testing (optional)
4. Background tasks (Celery, if needed)
5. Security: cache safety, monitoring, rate limiting
6. Deployment & documentation
7. Definition of Done: Performance/scale optimizations live, tested, docs updated

---

## 12. Phase Plans (Detailed)
- [Marketplace Expansion Plan (Phase 3)](./PHASE_3_MARKETPLACE_PLAN.md)
- [Community & Engagement Plan (Phase 4)](./PHASE_4_COMMUNITY_PLAN.md)
- [Enterprise & Scale Plan (Phase 5)](./PHASE_5_ENTERPRISE_PLAN.md)

---

## 13. Future Phases
- Additional marketplace, community, and enterprise features as needed
