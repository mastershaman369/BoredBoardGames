# Bored Board Games

A modern e-commerce platform for board games. MVP includes product catalog, persistent cart, Stripe and layaway checkout, and a full-featured admin dashboard (CRUD, layaway toggle).

---

## Project Overview

- **MVP:** Product catalog, persistent cart (global, localStorage), Stripe and layaway checkout, admin dashboard (CRUD for products/categories, layaway toggle), toasts for user feedback.
- **Phase 2 (Production Readiness):**
  - Migrate all data to MongoDB (Beanie ODM)
  - Add secure JWT-based admin authentication
  - Implement automated testing (Pytest, Jest/RTL, Cypress)
  - CI/CD with GitHub Actions, Vercel (frontend), Render (backend), MongoDB Atlas
  - Structured logging & Sentry error tracking
  - Documentation and security best practices
- **Phase 3 (Marketplace Expansion):**
  - Multi-vendor support, vendor dashboard, customer accounts, role-based access control
  - See [Marketplace Expansion Plan](./PHASE_3_MARKETPLACE_PLAN.md)
- **Phase 4 (Community & Engagement):**
  - Product reviews, wishlists, user profiles, forums
  - See [Community & Engagement Plan](./PHASE_4_COMMUNITY_PLAN.md)
- **Phase 5 (Enterprise & Scale):**
  - Caching, CDN, analytics, advanced monitoring, load testing, background tasks
  - See [Enterprise & Scale Plan](./PHASE_5_ENTERPRISE_PLAN.md)
- **Stack:** Next.js 14.x (App Router, TypeScript), FastAPI backend, Stripe integration, Dockerized.
- **All work is done in:** `~/Documents/GitHub/BoredBoardGames`
- **Source of truth:** [BoredBoardGames GitHub](https://github.com/mastershaman369/BoredBoardGames.git)

---

## Key Documentation

- [Technical Implementation & Overview](./TECHNICAL_OVERVIEW.md) — _Full architecture, phased roadmap, and implementation details._
- [Marketplace Expansion Plan (Phase 3)](./PHASE_3_MARKETPLACE_PLAN.md)
- [Community & Engagement Plan (Phase 4)](./PHASE_4_COMMUNITY_PLAN.md)
- [Enterprise & Scale Plan (Phase 5)](./PHASE_5_ENTERPRISE_PLAN.md)

---

## Quick Start (Docker)

1. Copy `.env.example` to `.env` in `/backend` and set your Stripe keys.
2. Run:

```sh
docker compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000/api](http://localhost:8000/api)
- Admin Dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Features

- Modern, responsive UI (Next.js + custom CSS)
- Product grid, detail pages, persistent cart (global, localStorage)
- Checkout: Stripe & layaway (admin-togglable)
- Toasts/alerts for all cart and admin actions
- Full-featured admin dashboard:
  - View/add/edit/delete products and categories
  - Toggle layaway on/off (live, persistent)
  - View all orders
- All changes are persistent in MongoDB (Phase 2+)
- Secure JWT-based admin login (Phase 2+)
- Automated testing and CI/CD (Phase 2+)
- Marketplace, vendor/customer accounts (Phase 3+)
- Community features: reviews, wishlists, forums (Phase 4+)
- Enterprise/scale optimizations (Phase 5+)
- Fully documented, secure, and ready for phased expansion

---

## Admin Usage

- Go to `/admin` for the dashboard.
- Login required (Phase 2+). Use your admin credentials.
- Manage products/categories (add, edit, delete) and toggle layaway live.
- All admin changes are reflected instantly for users.
- Orders and layaway status are visible for admin review.

---

## Contribution & Customization

- All contributors must keep documentation up to date.
- README.md always links to all technical docs and is the entry point for new contributors or resuming work outside of Windsor.
- For questions, see the FAQ in [TECHNICAL_OVERVIEW.md](./TECHNICAL_OVERVIEW.md).
- See phase plans for detailed requirements ([Phase 3](./PHASE_3_MARKETPLACE_PLAN.md), [Phase 4](./PHASE_4_COMMUNITY_PLAN.md), [Phase 5](./PHASE_5_ENTERPRISE_PLAN.md)).

---

## Development

- All code, builds, and tests must remain in `~/Documents/GitHub/BoredBoardGames`.
- See TECHNICAL_OVERVIEW.md and phase plans for stack, roadmap, and workflow rules.

---

## Security & Workflow

- Never commit secrets or sensitive data.
- All changes must be tested end-to-end before commit/push.
- Tag stable releases as `get` (e.g., `get-v1.0.0`).
- Only push tested, stable code to `main`.
- Use secure secrets management and environment variables in hosting/CI.
- Monitor dependencies for vulnerabilities.
- Enforce HTTPS in production.

---

## CI/CD & Production Readiness (Phase 2+)

- Automated testing (Pytest, Jest, Cypress) is required before deployment.
- CI/CD pipeline (GitHub Actions) builds, tests, and deploys to Staging/Production.
- All secrets managed securely (never committed to Git).
- Logging and Sentry error tracking are active in all environments.
- Staging and Production environments are separated (secrets, DBs, deploy targets).

---

**This README and the linked technical overview and phase plans are the only official sources of project truth. Remove or archive any outdated docs or code before contributing.**

For full details, see the technical overview, phase plans, and in-code comments.
