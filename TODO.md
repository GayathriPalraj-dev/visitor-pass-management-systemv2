# Visitor Pass Management - QA Bug Fix Tracker

## P1 - Employee Approval
- [x] Fix `approval.service.js` so EMPLOYEE without a linked Employee profile shows an empty Pending list instead of a 403 error.
- [x] Verify end-to-end approve/reject updates status to APPROVED/REJECTED.
- [x] Keep Approve/Reject actions restricted to EMPLOYEE (ADMIN read-only).
- [x] After approve/reject, invalidate dashboard + approvals + visitors queries.

## P2 - Status Filters
- [x] Fix date filter timezone bug in `visitor.service.js` (use local-day range, not UTC).
- [x] Verify status + search + date filters combine correctly (end-to-end test).
  - [x] `?status=APPROVED` returns only APPROVED (verified count=3, all APPROVED).
  - [x] `?status=REJECTED` returns only REJECTED (verified all REJECTED).

## P3 - Update/Edit
- [x] Fix `VisitorFormDialog` visitDate initialization (`.toISOString()` off-by-one-day).
- [x] Backend `updateVisitorRequest`: use `!== undefined` guards so empty fields can be cleared.
- [x] Verify invalidateQueries + refetch after edit (end-to-end test: purpose updated, reflects immediately).

## P4 - Loading
- [x] Ensure loading disappears immediately after data arrives; error/empty states correct.

## P5 - Dashboard Refresh
- [x] Invalidate `['dashboard-statistics']` after Register, Approve, Reject, Check-In, Check-Out, Cancel.
  - [x] Verified check-in: checkedIn 0->1; check-out: checkedOut 1->2.

## P6 - Validation
- [x] Show user-friendly first backend validation error in toasts.
- [x] Login page toast now surfaces specific field error (email/password) + wrong-credential message.
- [x] Standardize validation messages (backend returns `errors[0].message`).

## Phase 5 - Production Cleanup Audit
- [x] Scan for `console.log`/`debugger` across 72 source files — only legitimate operational logs remain (MongoDB connect, API startup, seed output). No debug artifacts.
- [x] No commented-out code (single hit is an explanatory comment, not dead code).
- [x] No dead `.gitkeep` placeholders in non-empty dirs.
- [x] Env vars: only `VITE_API_BASE_URL` (client) and `NODE_ENV/PORT/MONGO_URI/JWT_SECRET/JWT_EXPIRES_IN/CLIENT_URL` (server) — all referenced. No unused env vars.
- [x] ESLint (`npx eslint src`) passes — no unused imports/variables.
- [x] Production build (`vite build`) passes — 243 modules, no errors.
- [x] Removal of temp audit scripts (`prod_scan.js`, `prod_audit.js`) — confirmed removed via `git status` (not present).

## Final
- [x] Run `npm run seed`.
- [x] Start backend + frontend.
- [x] End-to-end QA workflow (register -> approve -> check-in -> check-out -> dashboard/reports/activity).
- [x] Client build passes (`vite build`).
- [x] Backend `/health` returns `{"success":true,"message":"API is healthy"}`.
- [x] Produce QA report.

