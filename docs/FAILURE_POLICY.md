# Failure Policy

## Failure Scenarios and Responses

### 1. Supabase Write Failure

**Scenario:** Network error or Supabase returns error on `insert`.

**Response:**
- Redux `ui.submitError` set to error message
- Toast notification shown: "Failed to create reward. Please try again."
- Modal stays open — user does **not** lose their input
- "Create Reward" button re-enables after 2 seconds
- User can retry without re-entering data

**Code path:** `createReward.rejected` case in `gamificationSlice.ts`

---

### 2. Supabase Connection Unavailable

**Scenario:** User is offline or Supabase is unreachable.

**Response:**
- Same as write failure above
- Error message: "Unable to reach the server. Check your connection."
- No silent failure — always surface to user

---

### 3. Invalid Input Submitted

**Scenario:** User somehow submits with missing/invalid data (e.g. zero amount).

**Response:**
- Client-side validation catches this before any Supabase call
- Inline error message shown per field
- Submit is blocked

---

### 4. Modal Closed Mid-Flow

**Scenario:** User clicks outside modal or presses Escape key.

**Response:**
- Redux `resetGamification()` action dispatched
- All form state cleared
- Next open starts fresh from step 1
- No partial data sent to Supabase

---

### 5. Component Render Error (React Error Boundary)

**Scenario:** Unexpected JS error inside modal.

**Response:**
- Error boundary catches error
- Fallback UI shown: "Something went wrong. Please refresh and try again."
- Error logged to console (production: send to error monitoring service)

---

### 6. Environment Variables Missing

**Scenario:** `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY` not set.

**Response:**
- Supabase client initialization fails with clear error
- Dev environment: console.error with instructions
- Production: reward creation fails gracefully (same as write failure)

---

## Retry Strategy

| Operation | Retry? | Max retries | Backoff |
|-----------|--------|-------------|---------|
| Supabase insert | Manual (user re-clicks) | None (user-initiated) | N/A |
| No auto-retry to avoid duplicate inserts |

---

## Data Consistency

- No reward is created unless Supabase returns a successful response
- UI does not advance to "success" state until confirmed
- Idempotency: each "Create Reward" click is a new insert (no upsert) — duplicate clicks are prevented by disabling the button during submission
