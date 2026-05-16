# Integrations

## Supabase

### Setup

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Environment Variables

```env
# .env.local
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-public-key>
```

### API Operations

#### Create Reward

```typescript
const { data, error } = await supabase
  .from('rewards')
  .insert({
    event_type: eventType,
    event_params: eventParams,
    event_label: eventLabel,
    reward_type: rewardType,
    reward_params: rewardParams,
    reward_label: rewardLabel,
    is_time_bound: isTimeBound,
    expires_at: expiresAt,
  })
  .select()
  .single();
```

#### Fetch Rewards (for future listing view)

```typescript
const { data, error } = await supabase
  .from('rewards')
  .select('*')
  .order('created_at', { ascending: false });
```

---

## Figma Design Reference

**File:** `vYwEBJ1yvROBR1Bl6sRwyb`  
**Page:** Gamification UI (0:1)  
**Key Frames:**

| Frame ID | Name | Description |
|----------|------|-------------|
| 25:3975 | Desktop - 310 | Initial campaign screen with Gamification tab |
| 1:21775 | Desktop - 271 | Modal open — event selection |
| 1:24193 | Desktop - 272 | Event configured, reward dropdown closed |
| 1:21942 | Desktop - 306 | Reward dropdown open |
| 1:22109 | Desktop - 308 | Reward configured |
| 1:22278 | Desktop - 307 | Time-bound calendar open |
| 1:22449 | Desktop - 300 | Validation error state |
| 1:22617 | Desktop - 301 | Hover state on event option |
| 1:22804 | Desktop - 302 | Hover state on reward option |
| 1:22991 | Desktop - 303 | Date picker with disabled dates |
| 1:23159 | Desktop - 304 | Complete state before create |
| 1:23344 | Desktop - 305 | Post-creation confirmation |
| 1:146827 | Desktop - 309 | Empty/initial modal state |

---

## Redux Toolkit

No external API — Redux Toolkit's `createAsyncThunk` wraps all Supabase calls.

### Thunk: `createReward`

```typescript
export const createReward = createAsyncThunk(
  'gamification/createReward',
  async (_, { getState, rejectWithValue }) => {
    const state = (getState() as RootState).gamification;
    try {
      const { data, error } = await supabase
        .from('rewards')
        .insert({ /* ... */ })
        .select()
        .single();
      if (error) return rejectWithValue(error.message);
      return data;
    } catch (err) {
      return rejectWithValue('Network error');
    }
  }
);
```
