import { describe, it, expect } from 'vitest';
import {
  buildEventLabel,
  buildRewardLabel,
  validateEventParams,
  validateRewardParams,
} from './utils';

// ── buildEventLabel ──────────────────────────────────────────────────────────

describe('buildEventLabel', () => {
  it('formats sales_cross_x with amount', () => {
    expect(buildEventLabel('sales_cross_x', { amount: '500' })).toBe('Cross $500 in sales');
  });

  it('uses placeholder when amount missing', () => {
    expect(buildEventLabel('sales_cross_x', {})).toBe('Cross $X in sales');
  });

  it('formats post_x_times with times and periodLabel', () => {
    expect(buildEventLabel('post_x_times', { times: '3', periodLabel: 'week' })).toBe('Posts 3 times every week');
  });

  it('falls back to period when periodLabel missing', () => {
    expect(buildEventLabel('post_x_times', { times: '2', period: 'monthly' })).toBe('Posts 2 times every monthly');
  });

  it('returns static label for is_onboarded', () => {
    expect(buildEventLabel('is_onboarded', {})).toBe('Is Onboarded');
  });
});

// ── buildRewardLabel ─────────────────────────────────────────────────────────

describe('buildRewardLabel', () => {
  it('formats flat_bonus with amount', () => {
    expect(buildRewardLabel('flat_bonus', { amount: '200' })).toBe('Flat $200 Bonus');
  });

  it('uses placeholder when amount missing', () => {
    expect(buildRewardLabel('flat_bonus', {})).toBe('Flat $X Bonus');
  });

  it('formats commission_tier_upgrade with tierName', () => {
    expect(buildRewardLabel('commission_tier_upgrade', { tierName: 'Gold' })).toBe('Upgrade to Gold');
  });

  it('falls back to toTier when tierName missing', () => {
    expect(buildRewardLabel('commission_tier_upgrade', { toTier: 'Silver' })).toBe('Upgrade to Silver');
  });
});

// ── validateEventParams ──────────────────────────────────────────────────────

describe('validateEventParams', () => {
  describe('sales_cross_x', () => {
    it('returns no errors for valid amount', () => {
      expect(validateEventParams('sales_cross_x', { amount: '100' })).toEqual({});
    });

    it('errors when amount is empty', () => {
      expect(validateEventParams('sales_cross_x', {})).toHaveProperty('amount');
    });

    it('errors when amount is zero', () => {
      expect(validateEventParams('sales_cross_x', { amount: '0' })).toHaveProperty('amount');
    });

    it('errors when amount is negative', () => {
      expect(validateEventParams('sales_cross_x', { amount: '-5' })).toHaveProperty('amount');
    });

    it('errors when amount exceeds maximum', () => {
      expect(validateEventParams('sales_cross_x', { amount: '1000000' })).toHaveProperty('amount');
    });
  });

  describe('post_x_times', () => {
    it('returns no errors for valid integer times', () => {
      expect(validateEventParams('post_x_times', { times: '5' })).toEqual({});
    });

    it('errors when times is empty', () => {
      expect(validateEventParams('post_x_times', {})).toHaveProperty('times');
    });

    it('errors when times is a decimal', () => {
      expect(validateEventParams('post_x_times', { times: '2.5' })).toHaveProperty('times');
    });

    it('errors when times exceeds maximum', () => {
      expect(validateEventParams('post_x_times', { times: '10000' })).toHaveProperty('times');
    });
  });

  describe('is_onboarded', () => {
    it('returns no errors', () => {
      expect(validateEventParams('is_onboarded', {})).toEqual({});
    });
  });
});

// ── validateRewardParams ─────────────────────────────────────────────────────

describe('validateRewardParams', () => {
  describe('flat_bonus', () => {
    it('returns no errors for valid amount', () => {
      expect(validateRewardParams('flat_bonus', { amount: '50' })).toEqual({});
    });

    it('errors when amount is empty', () => {
      expect(validateRewardParams('flat_bonus', {})).toHaveProperty('rewardAmount');
    });

    it('errors when amount is zero', () => {
      expect(validateRewardParams('flat_bonus', { amount: '0' })).toHaveProperty('rewardAmount');
    });

    it('errors when amount exceeds maximum', () => {
      expect(validateRewardParams('flat_bonus', { amount: '9999999' })).toHaveProperty('rewardAmount');
    });
  });

  describe('commission_tier_upgrade', () => {
    it('returns no errors when tierName set', () => {
      expect(validateRewardParams('commission_tier_upgrade', { tierName: 'Gold' })).toEqual({});
    });

    it('errors when tierName missing', () => {
      expect(validateRewardParams('commission_tier_upgrade', {})).toHaveProperty('tierName');
    });
  });
});
