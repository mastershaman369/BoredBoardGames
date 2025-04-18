# BoredBoardGames Frontend

This is the Next.js (App Router) frontend for the BoredBoardGames MVP. It integrates with the FastAPI backend for:
- Dynamic homepage content from the CMS
- User authentication (login/register)
- Seller dashboard and product management
- Public user profiles and community features
- Product reviews and wishlist
- User messaging

## Key Features

### 1. Dynamic Homepage
- Fetches `/pages/homepage` from backend and injects `title` and `content`.
- Fallback UI if homepage content is missing.

### 2. Auth Flows
- Login/Register forms submit to `/auth/login` and `/auth/register`.
- Session/token stored in localStorage.
- Success/error messages shown.

### 3. Seller Dashboard
- `/dashboard/seller` lists products from `/seller/products`.
- Add product form posts to backend.

### 4. Community Pages
- `/profiles/[user_id]` shows public profile, bio, badges.
- Product detail page fetches `/products/{id}/reviews`.
- Wishlist page at `/wishlist`.

### 5. Messaging
- `/messages` inbox for logged-in user.
- Compose new message form.

### 6. Styling
- Uses MUI (Material UI) and is Tailwind-ready (see `tailwind.config.js`).
- Navbar, cards, badges, and CMS blocks styled.

### 7. Deployment
- `vercel.json` included for local API proxying.
- To deploy: connect to Vercel or Netlify, ensure `.env` is set.

## Getting Started

```bash
npm install
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000)
- Backend API must be running at `localhost:8000`

## Deployment
- See `vercel.json` for proxy config.
- Set `NEXT_PUBLIC_API_BASE` in your environment for production.

## Staging & Preview Deployment

- **Staging Domain:** [https://boredboardgames-staging.vercel.app](https://boredboardgames-staging.vercel.app) *(example, update as needed)*
- **robots.txt:** Disallows all search engine indexing in non-production.
- **.env:** Ensure `NEXT_PUBLIC_API_BASE` points to the staging backend; all secrets and keys must be set for preview builds.
- **Test Mode Banner:** The UI displays a "Test Mode" banner when `NODE_ENV` is not `production`.
- **Deployment:** Staging is auto-deployed via Vercel/Netlify preview branches.

### Deployment Notes
- Confirm backend and frontend are both live on preview/staging URLs.
- All environment variables are set for API, OAuth, and analytics.
- Analytics events are logged in-memory (see `useAnalytics`), can be swapped for GA/PostHog.
- Pagination is enabled on product lists and reviews.
- robots.txt blocks search indexing for all non-production deploys.

### QA & Known Issues
- Email and OAuth flows are stubbed for local/test; production will require real email/OAuth credentials.
- Some UI polish and error handling may be improved for production.
- If analytics, OAuth, or email are not working, check `.env` and deployment logs.

## Technical Docs
- [../README.md](../README.md) (root)
- [../TECHNICAL_OVERVIEW.md](../TECHNICAL_OVERVIEW.md)

---

 2025 BoredBoardGames. All rights reserved.
