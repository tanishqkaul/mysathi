# Security

## Threat Model

This is a client-side React SPA backed by Supabase. The main risk surface is unauthorized database writes and XSS.

---

## Controls

### 1. Row-Level Security (RLS) on Supabase

All tables have RLS enabled. The `rewards` table enforces:
- **SELECT:** authenticated users only
- **INSERT:** authenticated users only
- **UPDATE/DELETE:** not permitted via anon client (admin-only via service role key)

The anon key (used in the frontend) cannot bypass RLS. Even if the key is exposed, it cannot read/write data beyond what RLS allows.

### 2. Environment Variable Handling

- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are stored in `.env.local` (gitignored)
- `.env.example` documents required variables without values
- The anon key is intentionally public (Supabase design) — it is not a secret key

### 3. Input Validation

- Dollar amounts and counts are validated as positive numbers before dispatch
- All user inputs are rendered as React text (not `dangerouslySetInnerHTML`), preventing XSS
- JSONB parameter shapes are validated with TypeScript types at compile time

### 4. No Sensitive Data in State

Redux state contains only:
- Form values (amounts, dates)
- UI flags (loading, open/closed)

No auth tokens, PII, or secrets are stored in Redux state.

### 5. Content Security Policy (production)

Recommended CSP header for production deployment:

```
Content-Security-Policy:
  default-src 'self';
  connect-src 'self' https://*.supabase.co wss://*.supabase.co;
  style-src 'self' 'unsafe-inline';
  script-src 'self';
  img-src 'self' data:;
```

---

## What Is NOT in Scope

- Authentication implementation (assumed handled at campaign level)
- Authorization (who can create rewards for which campaigns) — future work
- Rate limiting on reward creation — handled by Supabase quotas
- Audit logging — not required for v1

---

## Secrets Management

| Secret | Storage | Exposure |
|--------|---------|----------|
| `VITE_SUPABASE_URL` | `.env.local` | Safe to expose (not a secret) |
| `VITE_SUPABASE_ANON_KEY` | `.env.local` | Safe to expose (RLS protected) |
| Supabase Service Role Key | **Never in frontend** | Server-only, not used here |
