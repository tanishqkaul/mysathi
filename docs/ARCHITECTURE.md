# Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (Client)                      │
│                                                         │
│  ┌──────────────┐    ┌──────────────┐                  │
│  │  React UI    │◄──►│ Redux Store  │                  │
│  │  Components  │    │  (state)     │                  │
│  └──────┬───────┘    └──────────────┘                  │
│         │                                               │
│  ┌──────▼───────┐                                       │
│  │ Supabase JS  │                                       │
│  │   Client     │                                       │
│  └──────┬───────┘                                       │
└─────────┼───────────────────────────────────────────────┘
          │ HTTPS / WebSocket
┌─────────▼───────────────────────────────────────────────┐
│                   Supabase (BaaS)                        │
│                                                         │
│  ┌──────────────┐    ┌──────────────┐                  │
│  │  PostgREST   │    │  Auth        │                  │
│  │  (REST API)  │    │  (JWT)       │                  │
│  └──────┬───────┘    └──────────────┘                  │
│         │                                               │
│  ┌──────▼───────┐                                       │
│  │  PostgreSQL  │                                       │
│  │  Database    │                                       │
│  └──────────────┘                                       │
└─────────────────────────────────────────────────────────┘
```

## Frontend Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Framework | React 18 + TypeScript | Type safety, component model, concurrent features |
| Build | Vite | Fast HMR, optimized production builds |
| Styling | Tailwind CSS | Utility-first, no CSS-in-JS overhead |
| Components | Shadcn UI | Accessible, unstyled primitives, copy-paste ownership |
| State | Redux Toolkit | Predictable state, devtools, RTK Query for async |
| Backend | Supabase | BaaS with Postgres, real-time, auth, REST API |

## Directory Structure

```
src/
├── components/
│   ├── gamification/
│   │   ├── GamificationModal.tsx      # Root modal, step orchestration
│   │   ├── EventSelector.tsx          # Step 1 – event dropdown
│   │   ├── EventConfig.tsx            # Step 1b – event parameter inputs
│   │   ├── RewardSelector.tsx         # Step 2 – reward type dropdown
│   │   ├── RewardConfig.tsx           # Step 2b – reward parameter inputs
│   │   ├── TimeBoundPicker.tsx        # Step 3 – optional calendar
│   │   ├── CreateRewardButton.tsx     # Final CTA
│   │   └── index.ts
│   └── ui/                            # Shadcn UI primitives
├── store/
│   ├── index.ts                       # Store configuration
│   └── slices/
│       └── gamificationSlice.ts       # All gamification state
├── lib/
│   ├── supabase.ts                    # Supabase client singleton
│   └── utils.ts                      # cn() helper, misc utils
├── types/
│   └── gamification.ts               # Domain types
├── hooks/
│   └── useGamification.ts            # Selector + dispatch hooks
├── App.tsx
└── main.tsx
```

## State Architecture

Redux is the single source of truth for all gamification UI state. Supabase is the persistence layer. No local component state is used for business logic — only for transient UI state (hover, focus).

```
GamificationState {
  isModalOpen: boolean
  currentStep: 'event' | 'reward' | 'date' | 'complete'
  event: {
    selectedType: EventType | null
    parameters: Record<string, string | number>
    isSaved: boolean
  }
  reward: {
    selectedType: RewardType | null
    parameters: Record<string, string | number>
    isDropdownOpen: boolean
  }
  timeBound: {
    enabled: boolean
    expiryDate: string | null       # ISO date string
  }
  ui: {
    isSubmitting: boolean
    validationErrors: Record<string, string>
    submitError: string | null
    submitSuccess: boolean
  }
}
```

## Data Flow

1. User interaction → dispatches Redux action
2. Reducer updates slice state
3. Component re-renders via `useSelector`
4. On "Create Reward" → thunk calls Supabase
5. Response updates `ui.isSubmitting` / `ui.submitSuccess`
