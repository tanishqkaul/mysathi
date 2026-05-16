# Design System

## Source

All design tokens derived from Figma file `vYwEBJ1yvROBR1Bl6sRwyb` (Gamification UI page).

---

## Color Palette

```css
/* Primary */
--color-primary:        #7C3AED;   /* Purple 600 — primary actions, selections */
--color-primary-hover:  #6D28D9;   /* Purple 700 — button hover */
--color-primary-light:  #EDE9FE;   /* Purple 100 — selected item background */

/* Neutral */
--color-bg:             #FFFFFF;   /* Modal background */
--color-surface:        #F9FAFB;   /* Dropdown background */
--color-border:         #E5E7EB;   /* Borders, dividers */
--color-text-primary:   #111827;   /* Primary text */
--color-text-secondary: #6B7280;   /* Labels, placeholder text */
--color-text-disabled:  #D1D5DB;   /* Disabled dates, inactive items */

/* Semantic */
--color-error:          #EF4444;   /* Validation errors */
--color-error-light:    #FEE2E2;   /* Error field background */
--color-success:        #10B981;   /* Success states */
--color-overlay:        rgba(0,0,0,0.5); /* Modal backdrop */
```

---

## Typography

```css
/* Font Family */
font-family: 'Inter', sans-serif;

/* Scale */
--text-xs:    12px / 16px;    /* Helper text, error messages */
--text-sm:    14px / 20px;    /* Body, labels */
--text-base:  16px / 24px;    /* Modal title, input text */
--text-lg:    18px / 28px;    /* Section headers */
--text-xl:    20px / 28px;    /* Modal heading */

/* Weights */
--font-normal:   400;
--font-medium:   500;
--font-semibold: 600;
--font-bold:     700;
```

---

## Spacing

Uses Tailwind's default spacing scale (base 4px):

```
4px  → p-1    (tight padding, badges)
8px  → p-2    (compact elements)
12px → p-3    (default input padding)
16px → p-4    (modal sections)
24px → p-6    (modal padding)
32px → p-8    (modal header)
```

---

## Border Radius

```css
--radius-sm:  4px;    /* Inputs, small buttons */
--radius-md:  8px;    /* Cards, dropdowns */
--radius-lg:  12px;   /* Modal container */
--radius-full: 9999px; /* Pill badges */
```

---

## Shadows

```css
--shadow-modal:    0 20px 60px rgba(0, 0, 0, 0.15);
--shadow-dropdown: 0 4px 24px rgba(0, 0, 0, 0.12);
--shadow-sm:       0 1px 3px rgba(0, 0, 0, 0.08);
```

---

## Component Tokens

### Dropdown / Select

| State | Background | Border | Text |
|-------|-----------|--------|------|
| Default | white | #E5E7EB | #111827 |
| Hover | #F9FAFB | #D1D5DB | #111827 |
| Open | white | #7C3AED | #111827 |
| Selected item | #EDE9FE | — | #7C3AED |
| Disabled | #F9FAFB | #E5E7EB | #D1D5DB |

### Input

| State | Background | Border | Text |
|-------|-----------|--------|------|
| Default | white | #E5E7EB | #111827 |
| Focus | white | #7C3AED | #111827 |
| Error | #FEE2E2 | #EF4444 | #111827 |
| Disabled | #F9FAFB | #E5E7EB | #9CA3AF |

### Button — Primary

| State | Background | Text |
|-------|-----------|------|
| Default | #7C3AED | white |
| Hover | #6D28D9 | white |
| Loading | #7C3AED 70% opacity | white |
| Disabled | #D1D5DB | #9CA3AF |

### Calendar Day

| State | Background | Text |
|-------|-----------|------|
| Default | transparent | #111827 |
| Hover (future) | #F3F4F6 | #111827 |
| Selected | #7C3AED | white |
| Today | transparent | #7C3AED (bold) |
| Disabled (past/today) | transparent | #D1D5DB |

---

## Animation

```css
/* Modal enter */
@keyframes modal-in {
  from { opacity: 0; transform: scale(0.95) translateY(8px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

/* Dropdown open */
@keyframes dropdown-in {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}

duration: 150ms;
easing: cubic-bezier(0.16, 1, 0.3, 1);
```
