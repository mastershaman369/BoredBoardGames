# Technical Implementation & Overview — Bored Board Games (2025)

## 1. Project Purpose & Vision

A modern, scalable, and community-driven e-commerce platform for board games, card games, and tabletop products. Launches with a robust marketplace MVP, then expands to advanced social, community, and admin features.

---

## 2. Phased Roadmap

**Phase 1: MVP Foundation**
- Product catalog/grid with search/filter
- Product detail pages
- Persistent cart (Redux)
- Multi-step checkout (Stripe integration, basic)
- Layaway checkout option (admin-togglable, no payment required)
- Admin can toggle layaway mode (via env, future via UI)
- Admin product CRUD (basic, in-memory)
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
- UI: Material-UI (MUI) 6+
- State: Redux Toolkit (with RTK Query)
- Auth: NextAuth.js (JWT, OAuth, social login)
- Payments: Stripe.js (MVP), PayPal JS SDK (future)
- Layaway checkout option (toggle from backend)
- Testing: Jest, @testing-library/react, Cypress (E2E)
- Build/Dev: Vercel/Netlify ready, Docker support

**Backend**
- Framework: FastAPI (latest, async, type-safe)
- Language: Python 3.11+
- Database: In-memory (MVP), MongoDB (Beanie ODM, async, future)
- Cache: Redis (sessions, notifications, future)
- Queue: RabbitMQ or Redis Streams (background jobs, emails, future)
- API: RESTful endpoints for products, cart, orders, users
- Auth: JWT, OAuth (future)
- Payments: Stripe integration (MVP), PayPal (future), layaway bypass
- Stripe Connect for marketplace/commissions (future)

---

## 4. UI/UX Foundation

- Typography: Inter/Roboto/Open Sans; H1 2.5rem, body 1rem, buttons 1rem bold
- Color Scheme:  
  - Light: #2C3E50, #E67E22, #16A085, #F8F9FA, #FFFFFF  
  - Dark: #1A1A2E, #F7CA18, #00ADB5, #18191A, #23272F
- Navigation: Sticky header, dropdowns, sidebar (for community)
- Accessibility: WCAG 2.1 AA, keyboard nav, aria-labels
- Responsiveness: Mobile-first, 12-column grid, adaptive layouts
- Theme: Light/dark mode toggle, MUI ThemeProvider

---

## 5. Security & Best Practices

- All code, config, and tests in `~/Documents/GitHub/BoredBoardGames` only.
- Never expose secrets, credentials, or sensitive data in code or deployments.
- Use secure coding, error handling, and logging.
- All code changes tested end-to-end before commit/push.
- Only deploy from `get`-tagged, fully tested commits.

---

## 6. Branding & Contact

- Project name everywhere: **Bored Board Games**
- Domain: **boredboardgames.com**
- All admin/support emails: `admin@boredboardgames.com`, `support@boredboardgames.com`

---

## 7. Git & Deployment Protocol

- All work in `~/Documents/GitHub/BoredBoardGames`
- GitHub: [BoredBoardGames](https://github.com/mastershaman369/BoredBoardGames.git)
- Only push tested, stable code to `main`
- Tag stable releases as `get` (e.g., `get-v1.0.0`)
- Only deploy to live from `get`-tagged commits

---

## 8. Contribution & Documentation

- All contributors must keep documentation up to date.
- README.md always links to all technical docs and is the entry point for new contributors or resuming work outside Windsor.
- Remove or archive any outdated docs or code before contributing.
