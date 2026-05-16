# Gamification UI Flow

## Overview

This document outlines the complete UI/UX flow for the gamification feature, including reward event selection, reward configuration, validation states, and time-bound reward creation.

---

# Gamification Flow

## Step 1: Open Gamification Tab

- User clicks on the **Gamification** tab.
- User is redirected to a modal.

The modal allows the user to:
1. Select a reward event
2. Select a reward type
3. Make the reward time-bound
4. Create the reward

---

# Step 2: Select an Event

When the user clicks on **"Select an event"**, a dropdown/modal opens with multiple event options.

Examples:
- Cross X dollar in sales
- Post X times per Y period
- Other reward-triggering events

Only **single selection** is allowed.

> Note: Multi-selection shown in the prototype was only for demonstration purposes.

---

# Event Flow Example: "Cross X Dollar in Sales"

## User Interaction

1. User selects:
   - **Cross X dollar in sales**

2. System prompts for input:
   - "What is X dollar?"

3. User enters a value:
   - Example: `100`

4. The selected value should:
   - Update the UI in real-time
   - Pre-populate inside the event label dynamically

Example:
- "Cross $100 in sales"

5. User clicks:
   - **Save**

This confirms the event selection.

---

# Step 3: Reward With Dropdown Auto-Opens

After saving the event:
- The **"Reward with"** dropdown should automatically open.

The user can then choose the reward type.

Examples:
- Flat X dollar bonus
- Upgrade commission tier
- Other reward actions

---

# Reward Flow: "Flat X Dollar Bonus"

## User Interaction

1. User selects:
   - **Flat X dollar bonus**

2. System prompts:
   - "Enter X dollar amount"

3. User enters reward amount.

---

## Validation States

If no input is entered:
- Show hover/validation state
- Show empty state UI as designed in the prototype

All interaction states already exist in the design prototype and should be implemented accordingly.

---

# Reward Flow: "Upgrade Commission Tier"

If user selects:
- **Upgrade commission tier**

Then:
- Follow the same interaction flow
- Save selection
- Apply validation states
- Continue reward setup process

---

# Reward Flow: "Post X Times per Y Period"

If user selects:
- **Post X times per Y period**

Then:
1. Prompt user for:
   - X value
   - Y period

2. Update UI dynamically in real time

3. User confirms via:
   - Save button

---

# Time-Bound Rewards

User can optionally make rewards time-bound.

## Flow

1. User opens calendar dropdown
2. User selects a future date

---

## Date Restrictions

### Disable:
- Past dates
- Today's date

### Allow:
- Tomorrow onwards only

---

## Calendar Behavior

- Users should be able to navigate forward indefinitely
- Backward navigation should be disabled if required by design
- Calendar should clearly show disabled dates

---

# Final Step: Create Reward

Once:
- Event is selected
- Reward is configured
- Optional time-bound date is selected

The user can click:
- **Create Reward**

This completes the flow.

---

# Additional Notes

## Real-Time UI Updates
All dynamic text should update immediately as users type values.

Examples:
- "Cross $100 in sales"
- "Earn $50 bonus"
- "Post 5 times per week"

---

## UX Requirements

- Single selection only
- Auto-open reward dropdown after event save
- Validation and hover states required for empty inputs
- Consistent interaction patterns across all reward types
- Calendar must restrict invalid date selections

---

# Design Reference

Implementation should strictly follow:
- Provided prototype
- All interaction states
- Hover states
- Empty states
- Selection states
- Validation states
