# Testing Strategy

## Philosophy

Test behavior, not implementation. Focus on the user-facing flows described in the PRD. Avoid testing Redux internals directly — test them through component interactions.

---

## Test Stack

| Type | Tool | What it covers |
|------|------|----------------|
| Unit | Vitest | Pure functions (label builders, validators) |
| Component | React Testing Library | Component behavior, accessibility |
| Integration | RTL + MSW | Full Redux + Supabase flows with mocked network |
| E2E | Playwright (future) | Full browser flows |

---

## Critical Test Cases

### Event Selection Flow

```typescript
test('selecting sales event shows amount input', async () => {
  render(<GamificationModal />, { wrapper: ReduxProvider });
  await userEvent.click(screen.getByText('Select an event'));
  await userEvent.click(screen.getByText('Cross X dollar in sales'));
  expect(screen.getByPlaceholderText('Enter amount')).toBeInTheDocument();
});

test('event label updates in real time as user types amount', async () => {
  // ...
  await userEvent.type(screen.getByPlaceholderText('Enter amount'), '100');
  expect(screen.getByText('Cross $100 in sales')).toBeInTheDocument();
});
```

### Auto-open Reward Dropdown

```typescript
test('reward dropdown opens automatically after saving event', async () => {
  // ... fill in event, click Save
  await userEvent.click(screen.getByText('Save'));
  expect(screen.getByRole('listbox', { name: /reward/i })).toBeVisible();
});
```

### Validation States

```typescript
test('shows validation error when amount is empty on save', async () => {
  // ... select event but leave amount empty
  await userEvent.click(screen.getByText('Save'));
  expect(screen.getByText('Amount is required')).toBeInTheDocument();
});
```

### Calendar Date Restrictions

```typescript
test('past dates are disabled in calendar', () => {
  render(<TimeBoundPicker />);
  const yesterday = subDays(new Date(), 1);
  const cell = screen.getByRole('gridcell', {
    name: format(yesterday, 'd'),
  });
  expect(cell).toHaveAttribute('aria-disabled', 'true');
});

test('today is disabled in calendar', () => {
  // same pattern for today
});
```

### Supabase Integration

```typescript
test('creates reward in Supabase on Create Reward click', async () => {
  // Mock Supabase insert
  const insertMock = vi.fn().mockResolvedValue({ data: { id: 'abc' }, error: null });
  vi.spyOn(supabase, 'from').mockReturnValue({ insert: insertMock } as any);
  
  // Complete full flow...
  await userEvent.click(screen.getByText('Create Reward'));
  
  expect(insertMock).toHaveBeenCalledWith(expect.objectContaining({
    event_type: 'sales_cross_x',
    event_params: { amount: 100 },
  }));
});
```

---

## Test Coverage Targets

| Area | Target |
|------|--------|
| Label builder functions | 100% |
| Validators | 100% |
| Redux slice reducers | 90%+ |
| Critical UI flows | 80%+ |
| Edge cases (empty, error) | All documented cases |

---

## Running Tests

```bash
npm run test          # Vitest watch mode
npm run test:run      # Single run (CI)
npm run test:coverage # Coverage report
```
