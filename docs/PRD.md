# Product Requirements Document — Gamification UI

## Overview

The Gamification feature enables campaign managers to create reward programs for sales representatives. Managers define trigger events and associated rewards, optionally time-bound, through a guided modal flow.

---

## Problem Statement

Sales teams need incentive structures tied to measurable behaviors (sales volume, posting frequency). Currently this requires manual tracking. This feature automates reward creation and ties it directly to campaign configuration.

---

## Goals

- Allow managers to create event-triggered rewards in under 2 minutes
- Provide real-time feedback as reward parameters are configured
- Ensure all created rewards are persisted to Supabase and retrievable
- Support time-bound rewards with calendar-enforced future-date selection

---

## User Stories

| ID | As a... | I want to... | So that... |
|----|---------|--------------|------------|
| US-01 | Campaign Manager | Select a trigger event from a dropdown | I can define what action earns a reward |
| US-02 | Campaign Manager | Input numeric parameters for the event | The event label updates in real-time (e.g. "Cross $100 in sales") |
| US-03 | Campaign Manager | Select a reward type | I can choose how reps are rewarded |
| US-04 | Campaign Manager | Set a reward amount | Reps know exactly what they earn |
| US-05 | Campaign Manager | Set an optional expiry date | Rewards can be time-limited |
| US-06 | Campaign Manager | See validation errors on empty inputs | I can't accidentally save incomplete rewards |
| US-07 | Campaign Manager | See the reward created confirmation | I know the reward was saved |

---

## Functional Requirements

### FR-01: Event Selection
- Single-select dropdown opens when user clicks "Select an event"
- Available events: "Cross X dollar in sales", "Post X times per Y period"
- After selecting, user is prompted for parameter values (X, Y)
- Event label updates dynamically as user types
- Save button confirms event selection

### FR-02: Reward Selection (auto-open)
- After saving event, "Reward with" dropdown opens automatically
- Available rewards: "Flat X dollar bonus", "Upgrade commission tier"
- "Flat X dollar bonus" requires dollar amount input
- "Upgrade commission tier" requires tier selection

### FR-03: Time-Bound Option
- Optional calendar date picker
- Disabled: today and all past dates
- Enabled: tomorrow onwards only
- Forward navigation unlimited; backward navigation blocked at current month

### FR-04: Validation
- Empty required fields show validation state on save attempt
- Inline error messages per field
- Create Reward button disabled until all required fields filled

### FR-05: Create Reward
- Clicking "Create Reward" persists to Supabase
- Shows loading state during save
- Shows success/error toast on completion

---

## Non-Functional Requirements

- UI must match Figma design pixel-perfectly
- Real-time updates must have < 16ms latency (single render cycle)
- All form state managed via Redux
- Supabase writes must be idempotent per session

---

## Out of Scope

- Editing existing rewards
- Deleting rewards
- Rep-facing reward dashboard
- Push notifications

---

## Assumptions

- One reward per event per campaign (not enforced in v1)
- Currency is USD only
- "Upgrade commission tier" tiers are predefined (Tier 1 → 2 → 3)
