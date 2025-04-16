# Bored Board Games - Community & Engagement Plan (Phase 4)

**Document Version:** 3.0 (Follows Phase 3 Completion)
**Target Audience:** Windsor Development Team
**Date:** 2025-04-16

---

## 1. Introduction & Objective

With the marketplace established, Phase 4 focuses on building **community and user engagement** around the platform and its products. This involves implementing features like product reviews, user profiles (enhancing Phase 3 customer accounts), wishlists, and basic discussion forums.

## 2. Target State (End of Phase 4)

- **Product Reviews:** Authenticated customers can submit reviews (ratings + text) for products. Reviews are displayed on product pages.
- **User Profiles:** Enhanced public/semi-public user profiles displaying basic info, perhaps activity like reviews submitted.
- **Wishlists:** Authenticated customers can add/remove products to a personal wishlist.
- **Basic Forums:** A simple forum section where authenticated users can create threads and post replies on board game topics or categories.
- **(Optional) Notifications:** Basic in-app notification system for events like replies to forum posts (stretch goal).

## 3. Core Requirements for Phase 4

1.  **Review System:** Implement models, APIs, and UI for submitting and displaying product reviews.
2.  **Wishlist Functionality:** Implement models, APIs, and UI for managing user wishlists.
3.  **Forum System:** Implement models, APIs, and UI for basic discussion forums (threads, posts).
4.  **Database Schema Updates:** Add new collections/models for Reviews, Wishlists, Forum Threads/Posts. Enhance User profile fields.
5.  **API Expansion:** Create new endpoints for managing reviews, wishlists, and forum interactions.
6.  **Frontend Development:** Build UI for review submission/display, wishlist management, forum browsing/posting, and enhanced user profiles.
7.  **Testing Expansion:** Add comprehensive tests for all community features.

## 4. Recommended Technology Stack (Additions/Modifications)

- **Existing Stack:** Continue using Next.js, FastAPI, MongoDB, Beanie, JWT/NextAuth.js, Pytest, Jest/RTL, Cypress.
- **Text Search (Optional):** MongoDB Atlas Search for forums.
- **Rate Limiting:** Consider `slowapi` for review/post creation endpoints.

## 5. Detailed Implementation Plan

*(See user prompt for full details: includes DB schema, API, frontend, testing, deployment, and security.)*

## 6. Phase 4 Security Considerations

- **XSS:** Sanitize all user-generated content before displaying.
- **Authorization:** Users can only modify/delete their own content. Define moderator/admin capabilities as needed.
- **Rate Limiting:** Protect content creation endpoints.
- **Data Privacy:** Be mindful of public user info. Offer privacy controls if needed.

## 7. Phase 4 Definition of Done

- Reviews, Wishlists, and Forums are implemented and functional.
- Enhanced user profiles available.
- All new endpoints/models are tested.
- Frontend UI for community features is implemented and tested.
- Test suite passes in CI.
- Deployed and verified on Staging.
- Documentation updated for Phase 4.
