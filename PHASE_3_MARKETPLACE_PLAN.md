# Bored Board Games - Marketplace Expansion Plan (Phase 3)

**Document Version:** 2.0 (Follows Phase 2 Completion)
**Target Audience:** Windsor Development Team
**Date:** 2025-04-16

---

## 1. Introduction & Objective

Following the successful completion of Phase 2 (Production Readiness), Phase 3 focuses on transforming the Bored Board Games platform from a single-store e-commerce site into a **multi-vendor marketplace**. This involves enabling approved third-party vendors to list and manage their own products, while the platform facilitates discovery and potentially handles checkout, with orders associated with the correct vendor. Customer accounts will also be introduced.

## 2. Target State (End of Phase 3)

- **Multi-Vendor Capability:** Approved vendors can register (admin approval process), manage their profile, and perform CRUD operations on their *own* products via a dedicated Vendor Dashboard.
- **Product Attribution:** Products in the catalog are clearly associated with their respective vendors.
- **Order Attribution:** Orders correctly record which vendor's products were purchased.
- **Customer Accounts:** Customers can register, log in, manage basic profile information, and view their order history.
- **Admin Oversight:** Administrators can manage vendor approvals, view all products/orders, and oversee marketplace activity.
- **Simple Commission Logic (Foundation):** Orders record vendor association, enabling offline/manual commission calculation (automated payouts are *out of scope* for Phase 3).

## 3. Core Requirements for Phase 3

1.  **Vendor Model & Management:** Implement Vendor profiles, registration/approval workflow, and vendor-specific product management.
2.  **Customer Accounts & Authentication:** Implement customer registration, login, profile management, and order history view.
3.  **Database Schema Updates:** Extend the database schema to support Vendors and link Products/Orders appropriately. Modify User model for roles.
4.  **API & Authorization Expansion:** Create new API endpoints for vendor actions and customer actions. Implement role-based access control (Admin, Vendor, Customer).
5.  **Frontend Development:** Build Vendor Dashboard UI, Customer Account UI, update Product listings/details to show vendor info, modify Checkout flow if needed.
6.  **Testing Expansion:** Extend automated tests (Unit, Integration, E2E) to cover all new vendor and customer functionality.

## 4. Recommended Technology Stack (Additions/Modifications)

- **Database:** MongoDB (as established in Phase 2).
- **ODM:** Beanie ODM (as established).
- **Authentication:** JWT (as established). Consider refining role handling. **NextAuth.js** (if not fully adopted in Phase 2) becomes highly recommended for managing customer + potentially vendor sessions on the frontend.
- **Backend Testing:** Pytest (as established).
- **Frontend Testing:** Jest/RTL, Cypress (as established).
- **Role-Based Access Control (RBAC):** Implement RBAC logic within FastAPI dependencies. Simple custom logic based on User roles is sufficient initially.
    - **Recommendation:** Add a `roles: List[str]` field to the `User` model (e.g., `["customer"]`, `["vendor"]`, `["admin"]`).

## 5. Detailed Implementation Plan

*(See user prompt for full details: includes DB schema, API, frontend, testing, deployment, and security.)*

## 6. Phase 3 Security Considerations

- **Authorization:** Rigorously enforce RBAC on all endpoints. Vendors can only modify their own resources.
- **Input Validation:** Strict validation on all API inputs.
- **Data Segregation:** Ensure API queries filter data by user/vendor.
- **Admin Approval:** Manual vendor approval is a key security control.

## 7. Phase 3 Definition of Done

- All features in Section 2 are implemented and functional.
- Vendor and Customer dashboards are operational.
- Products/Orders attribute to vendors.
- RBAC enforced across the app.
- Test suite covers Phase 3 and passes in CI.
- Deployed and verified on Staging.
- Documentation updated for all new features.
