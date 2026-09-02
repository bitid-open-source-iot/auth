# Security Overhaul - Detailed Report

This document describes the hardening on `security/majoroverhaul`. Claims below match the code as of the change-email password-verify revision.

## Findings and what changed

### 1. Weak password hashing (critical)
**Where:** `lib/tools.js`, `lib/security.js`, `dal/dal.js` (authenticate, allowaccess, changepassword, users.delete), `bll/bll.js` (register)

**Change:** New passwords are bcrypt (12 rounds). Existing HMAC-SHA512 hashes still verify; a successful login/allow-access upgrades that user to bcrypt (`salt: null`). SHA-512 compare uses `crypto.timingSafeEqual`. bcrypt compare is bcrypt's own constant-time compare.

**Honest limit:** Constant-time compare applies to both paths now. Work-factor protection applies only after migration to bcrypt. Users who never log in keep SHA-512 until they do.

### 2. Reset-password validation (high, review blocker)
**Where:** `api/auth.js`, `lib/validation.js`

**Change:** `/auth/reset-password` uses `validateEmailRequest` (email only). Login/register/delete still require a password.

### 3. User delete after bcrypt migration (high, review blocker)
**Where:** `dal/dal.js` `dalUsers.delete`

**Change:** Delete uses the same `verifyPassword` helper as login. `salt: null` bcrypt users no longer throw inside `sha512`.

### 4. Email normalization mismatch (high, review blocker)
**Where:** `lib/security.js` `normalizeEmail`, `lib/format.js`, `lib/validation.js`

**Change:** Register, login, reset, and `format.email` all use lowercase + trim only. Gmail `+tag` and dots are kept. `validator.normalizeEmail` is not used (it would strip `+tag` / dots and miss stored accounts).

### 5. CORS footguns (high, review blocker)
**Where:** `index.js`, `lib/security.js`

**Required `ALLOWED_ORIGINS` behavior:**
- Comma-separated exact origins.
- Each entry is trimmed; empty values and `xxx` placeholders are dropped.
- If the env var is unset, fallback is `__settings.client.auth` and `__settings.client.drive` after the same trim/filter.
- If the resulting allowlist is empty, every origin is denied, including requests with no `Origin`.
- If the allowlist is non-empty, requests with no `Origin` (curl, server-to-server) are allowed. Browser cross-origin requests always send `Origin` and must match exactly.

### 6. Rate limits (high, review blocker)
**Where:** `index.js`, `lib/security.js`

**Chosen policy:**
- Failed-auth limiter: 10 failed requests / 15 minutes / IP on authenticate, reset-password, allow-access, change-password, change-email, delete. `skipSuccessfulRequests: true` so a successful login does not consume the budget.
- Register limiter: 5 requests / 15 minutes / IP, including successes (account-creation spam).
- `/auth/auth` (token check used by other services) is not on the failed-auth limiter.
- API limiter: 600 requests / 15 minutes / IP on API prefixes only.
- Static UI (`/`) and `/health-check` are not on the API limiter, so a SPA or shared NAT is not bricked by asset loads.

### 7. Password / secret logging (high, review blocker)
**Where:** `lib/tools.js` `log`, `lib/security.js` `redactSensitive`, `index.js` startup settings dump

**Change:** `tools.log` redacts `password`, `old`, `new`, `hash`, `salt`, `secret`, `token`, `authorization`, `bearer`, `smtp`, `mongodb`, `credentials` (any nesting) before `console.log`. Startup no longer prints raw `__settings`. BLL still passes `reqBody` into `tools.log`; the body is redacted at the logger.

### 8. Input validation (medium)
**Where:** `lib/validation.js`, `api/auth.js`

**Change:** Email format check + canonical normalize. Register also enforces password length/complexity. Reset-password does not require a password.

### 11. Change-email did not verify the current password (high)
**Where:** `dal/dal.js` `changeemail`, `lib/security.js` `authorizeEmailChange`

**Change:** Middleware already required `password`, but DAL ignored it. Email change now verifies the current password via the same bcrypt / legacy SHA-512 `verifyPassword` path before updating. New email is lowercase+trim only. Failures return `Invalid credentials`. Logs go through `tools.log` (password redacted); the DAL error path no longer passes `reqBody`.

### 9. Security headers (medium)
**Where:** `index.js` helmet (HSTS, CSP, frame/content-type options)

### 10. Dependencies
**Where:** `package.json`

**Actually upgraded in this branch:**
- nodemailer `^6.4.6` → `^9.1.1`
- nodemailer-express-handlebars `^4.0.0` → `^7.0.0`
- mocha `^9.0.3` → `^12.0.0` (dev)
- added bcrypt, helmet, express-rate-limit, validator

**Not claimed:** `js-yaml` is not a direct dependency and was not independently pinned/bumped. Remaining `npm audit` findings are mostly bcrypt/tar native-build advisories, not runtime auth-logic CVEs we fixed here.

## What was intentionally not changed

- Mongo query construction (ObjectId / parameterized usage already in place).
- Token generation (`crypto.randomBytes`).
- Email template HTML (nodemailer upgrade covers the library CVEs; templates were not rewritten).
- The `__settings.authentication` kill switch (documented residual risk).
- CSRF tokens (residual).
- Per-account lockout (residual; limiter is IP-based).
- MFA and reset-token flow (reset still emails a generated password).

## How this revision was tested

```bash
npm test
# mocha test/security.test.js --timeout 10000
```

Covers: email +tag consistency, bcrypt and SHA-512 verify, `salt: null` does not throw, reset-password without password, auth still requires password, change-email wrong password rejected, correct SHA-512 and migrated bcrypt passwords allow change with lowercase+trim email, CORS trim/empty/no-origin, log redaction, rate-limit policy constants.

Live `test/test.js` integration suite was not used as proof: it needs a running service plus real `test/config.json` credentials and is unrelated to these unit paths.

## Residual risks Shane should still decide

1. `__settings.authentication` can disable auth for the whole API.
2. No CSRF tokens on cookie-less JSON POST/PUT.
3. Rate limits are per IP, not per account. Distributed guessing can still spread.
4. Password reset still emails a generated password instead of a short-lived token.
5. No MFA.
6. No dedicated security event sink (failed logins only go to stdout after redaction).
7. No-Origin requests are allowed when a CORS allowlist exists (needed for server clients; browsers are still origin-checked).
8. Register is limited to 5/15m including successes; login successes are not limited by the auth limiter.
9. bcrypt/tar install-time audit noise remains.
