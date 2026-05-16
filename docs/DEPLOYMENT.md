# Deployment

## Environments

| Environment | URL | Trigger |
|------------|-----|---------|
| Local dev | http://localhost:5173 | `npm run dev` |
| Preview | Vercel PR preview | Push to feature branch |
| Production | TBD | Merge to main |

---

## Local Development Setup

```bash
# 1. Clone and install
git clone <repo>
cd mysathi
npm install

# 2. Configure environment
cp .env.example .env.local
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# 3. Run Supabase migration
# (see INTEGRATIONS.md for schema SQL)
# Run in Supabase SQL editor or via Supabase CLI:
supabase db push

# 4. Start dev server
npm run dev
```

---

## Supabase Setup

1. Create project at supabase.com
2. Run the SQL from `DATAMODEL.md` in the SQL editor
3. Enable RLS (done in migration SQL)
4. Copy Project URL and anon key to `.env.local`

---

## Production Build

```bash
npm run build    # Outputs to dist/
npm run preview  # Preview production build locally
```

## Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# VITE_SUPABASE_URL
# VITE_SUPABASE_ANON_KEY
```

## Environment Variables Required

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon public key | Yes |

---

## CI/CD (GitHub Actions — future)

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run test:run
      - run: npm run build
```
