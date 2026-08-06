# TODO - Fix Employee Approvals Bug

## Root Cause
The approval query compares `VisitRequest.employee` (an `Employee._id`) against the logged-in `User._id` — two different collections. Additionally, no relationship exists between a `User` (role EMPLOYEE) and its `Employee` document.

## Steps
- [x] 1. Add `user` reference field to `server/src/models/Employee.js`
- [x] 2. Update `server/src/seed/seedUsers.js` to link the employee user to Ravi Kumar (EMP-1002)
- [x] 3. Update `server/src/controllers/approvals/approval.controller.js` to pass full `req.user`
- [x] 4. Update `server/src/services/approvals/approval.service.js` to resolve Employee via `Employee.findOne({ user: req.user._id })` and query by `Employee._id`
- [ ] 5. Add temporary debug logs, test the workflow, then remove them
- [ ] 6. Confirm the fix works
