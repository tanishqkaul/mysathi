# Implementation Notes

## Technical Decisions & Tradeoffs

### 1. Redux Toolkit over Context API

**Decision:** Use Redux Toolkit (RTK) for all gamification state.

**Rationale:** The gamification modal has 3+ interconnected steps where upstream selections affect downstream components (saving event auto-opens reward dropdown). Redux's unidirectional data flow makes these cross-component dependencies explicit and debuggable. RTK's `createSlice` eliminates boilerplate while keeping state centralized.

**Tradeoff:** Heavier initial setup vs Context. Justified here because the state graph has side-effects (auto-open), validation that spans fields, and async Supabase writes that all need to be coordinated.

---

### 2. Shadcn UI over a full component library

**Decision:** Use Shadcn UI primitives (Dialog, Select, Calendar, Button) rather than MUI or Ant Design.

**Rationale:** Shadcn components are copied into the repo, giving full ownership. They use Radix UI primitives underneath for accessibility (focus traps, keyboard navigation, ARIA). Tailwind classes apply directly without fighting CSS specificity.

**Tradeoff:** More initial setup (copying components) vs drop-in library. Worth it for the design fidelity requirement — no override battles.

---

### 3. Real-time label updates via controlled inputs

**Decision:** Event/reward labels update on every keystroke using controlled React inputs bound to Redux state.

**Rationale:** The flow doc explicitly requires real-time updates ("Cross $100 in sales" updates as user types "100"). Controlled inputs make this trivial — every keystroke dispatches an action, the label re-renders immediately.

**Tradeoff:** More Redux dispatches. Debouncing is not needed here since we're not making API calls on keystroke.

---

### 4. Supabase PostgREST for persistence

**Decision:** Use `@supabase/supabase-js` with typed client for all database operations.

**Rationale:** Supabase provides instant REST + realtime with zero backend code. RTK's `createAsyncThunk` wraps the async calls cleanly, giving loading/error/success states.

**Tradeoff:** Vendor lock-in vs a custom API. Acceptable given the assignment scope.

---

## Component Design Patterns

### Compound Component Pattern — GamificationModal

`GamificationModal` is the root orchestrator. It reads `currentStep` from Redux and renders the appropriate sub-component. It does **not** manage step logic itself — step transitions happen in the Redux slice reducer via `saveEvent()` and `saveReward()` actions.

### Controlled Inputs with Redux

All `<input>` elements in event/reward config screens are controlled:
```tsx
<input
  value={event.parameters.amount ?? ''}
  onChange={(e) => dispatch(setEventParameter({ key: 'amount', value: e.target.value }))}
/>
```

### Auto-open Reward Dropdown

The `saveEvent` reducer action sets `reward.isDropdownOpen = true`. The `RewardSelector` component reads this flag and calls the Radix `Select`'s `open` prop:
```tsx
<Select open={reward.isDropdownOpen} onOpenChange={...}>
```

---

## Edge Cases Handled

| Scenario | Handling |
|----------|----------|
| User submits empty event amount | Validation error shown inline, `currentStep` stays at `event` |
| User submits empty reward amount | Same pattern as above |
| User selects past date in calendar | Date cells disabled; clicking does nothing |
| Supabase write fails | Error toast shown, modal stays open, user can retry |
| User closes modal mid-flow | Redux state is reset via `resetGamification()` action |
| Non-numeric value in amount field | Input type="number" + parseFloat validation |

---

## Assumptions

1. **Currency is USD only.** No currency selector shown.
2. **Commission tiers are hardcoded** as Tier 1, 2, 3 (no API needed).
3. **"Post X times per Y period"** — Y period options are: daily, weekly, monthly.
4. **Single reward per "Create" click** — no batch creation.
5. **No authentication required** for this feature (auth is at the campaign level, out of scope).
6. **Modal is triggered by a "Gamification" tab** on a campaign settings page (placeholder implemented).
