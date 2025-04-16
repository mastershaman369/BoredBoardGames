# Bored Board Games

A modern e-commerce platform for board games. MVP includes product catalog, persistent cart, Stripe and layaway checkout, and a full-featured admin dashboard (CRUD, layaway toggle).

---

## Project Overview

- **MVP:** Product catalog, persistent cart (global, localStorage), Stripe and layaway checkout, admin dashboard (CRUD for products/categories, layaway toggle), toasts for user feedback.
- **Phases:** Marketplace expansion, community/social, and enterprise/scale features.
- **Stack:** Next.js 14.x (App Router, TypeScript), FastAPI backend, Stripe integration, Dockerized.
- **All work is done in:** `~/Documents/GitHub/BoredBoardGames`
- **Source of truth:** [BoredBoardGames GitHub](https://github.com/mastershaman369/BoredBoardGames.git)

---

## Key Documentation

- [Technical Implementation & Overview](./TECHNICAL_OVERVIEW.md) — _Full architecture, phased roadmap, and implementation details._

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
  - Toggle layaway on/off (live, in-memory)
  - View all orders
- All changes are in-memory for MVP (no DB required)
- Fully documented, secure, and ready for phased expansion

---

## Admin Usage

- Go to `/admin` for the dashboard.
- Manage products/categories (add, edit, delete) and toggle layaway live.
- All admin changes are reflected instantly for users.
- Orders and layaway status are visible for admin review.

---

## Contribution & Customization

- All contributors must keep documentation up to date.
- README.md always links to all technical docs and is the entry point for new contributors or resuming work outside of Windsor.
- For questions, see the FAQ in [TECHNICAL_OVERVIEW.md](./TECHNICAL_OVERVIEW.md).

---

## Development

- All code, builds, and tests must remain in `~/Documents/GitHub/BoredBoardGames`.
- See TECHNICAL_OVERVIEW.md for stack, roadmap, and workflow rules.

---

## Security & Workflow

- Never commit secrets or sensitive data.
- All changes must be tested end-to-end before commit/push.
- Tag stable releases as `get` (e.g., `get-v1.0.0`).

---

**This README and the linked technical overview are the only official sources of project truth. Remove or archive any outdated docs or code before contributing.**

For full details, see the technical overview and in-code comments.
