# Data Model

## Supabase / PostgreSQL Schema

### Table: `rewards`

Stores all created gamification rewards.

```sql
CREATE TABLE rewards (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Event configuration
  event_type  TEXT NOT NULL,        -- 'sales_cross_x' | 'post_x_times'
  event_params JSONB NOT NULL,      -- { amount: 100 } | { times: 5, period: 'weekly' }
  event_label TEXT NOT NULL,        -- Human-readable: "Cross $100 in sales"
  
  -- Reward configuration
  reward_type TEXT NOT NULL,        -- 'flat_bonus' | 'commission_tier_upgrade'
  reward_params JSONB NOT NULL,     -- { amount: 50 } | { to_tier: 2 }
  reward_label TEXT NOT NULL,       -- Human-readable: "Flat $50 bonus"
  
  -- Time-bound
  is_time_bound BOOLEAN NOT NULL DEFAULT false,
  expires_at  TIMESTAMPTZ,          -- NULL if not time-bound
  
  -- Metadata
  campaign_id UUID,                 -- FK to campaigns table (nullable for standalone)
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### Indexes

```sql
CREATE INDEX idx_rewards_campaign_id ON rewards(campaign_id);
CREATE INDEX idx_rewards_created_at ON rewards(created_at DESC);
CREATE INDEX idx_rewards_expires_at ON rewards(expires_at) WHERE expires_at IS NOT NULL;
```

### Row-Level Security

```sql
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;

-- All authenticated users can read rewards
CREATE POLICY "rewards_select" ON rewards
  FOR SELECT USING (auth.role() = 'authenticated');

-- Only authenticated users can insert
CREATE POLICY "rewards_insert" ON rewards
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

---

## TypeScript Types

```typescript
// types/gamification.ts

export type EventType = 'sales_cross_x' | 'post_x_times';
export type RewardType = 'flat_bonus' | 'commission_tier_upgrade';
export type Period = 'daily' | 'weekly' | 'monthly';

export interface EventParams {
  sales_cross_x: { amount: number };
  post_x_times: { times: number; period: Period };
}

export interface RewardParams {
  flat_bonus: { amount: number };
  commission_tier_upgrade: { toTier: 1 | 2 | 3 };
}

export interface Reward {
  id: string;
  eventType: EventType;
  eventParams: EventParams[EventType];
  eventLabel: string;
  rewardType: RewardType;
  rewardParams: RewardParams[RewardType];
  rewardLabel: string;
  isTimeBound: boolean;
  expiresAt: string | null;
  campaignId: string | null;
  createdAt: string;
}
```

---

## JSONB Parameter Shapes

### `event_params` examples

```json
// sales_cross_x
{ "amount": 100 }

// post_x_times
{ "times": 5, "period": "weekly" }
```

### `reward_params` examples

```json
// flat_bonus
{ "amount": 50 }

// commission_tier_upgrade
{ "toTier": 2 }
```

---

## Label Generation Logic

Labels are computed client-side before insert and stored as denormalized text for easy display without re-computation:

```typescript
function buildEventLabel(type: EventType, params: any): string {
  switch (type) {
    case 'sales_cross_x':
      return `Cross $${params.amount} in sales`;
    case 'post_x_times':
      return `Post ${params.times} times per ${params.period}`;
  }
}

function buildRewardLabel(type: RewardType, params: any): string {
  switch (type) {
    case 'flat_bonus':
      return `Flat $${params.amount} bonus`;
    case 'commission_tier_upgrade':
      return `Upgrade to commission tier ${params.toTier}`;
  }
}
```
