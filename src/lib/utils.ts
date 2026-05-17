import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { EventType, RewardType } from '@/types/gamification';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildEventLabel(type: EventType, params: Record<string, string>): string {
  switch (type) {
    case 'sales_cross_x': {
      const amount = params.amount || 'X';
      return `Cross $${amount} in sales`;
    }
    case 'post_x_times': {
      const times = params.times || 'X';
      const periodLabel = params.periodLabel || params.period || 'period';
      return `Posts ${times} times every ${periodLabel}`;
    }
    case 'is_onboarded':
      return 'Is Onboarded';
  }
}

export function buildRewardLabel(type: RewardType, params: Record<string, string>): string {
  switch (type) {
    case 'flat_bonus': {
      const amount = params.amount || 'X';
      return `Flat $${amount} Bonus`;
    }
    case 'commission_tier_upgrade': {
      const tier = params.tierName || params.toTier || 'Tier';
      return `Upgrade to ${tier}`;
    }
  }
}

const MAX_CURRENCY = 999_999;
const MAX_TIMES = 9_999;

function validatePositiveInteger(value: string | undefined, field: string, max: number): string | null {
  if (!value?.trim()) return `${field} is required`;
  const n = Number(value);
  if (isNaN(n) || n <= 0) return 'Enter a valid positive number';
  if (!Number.isInteger(n)) return 'Must be a whole number';
  if (n > max) return `Maximum allowed is ${max.toLocaleString()}`;
  return null;
}

function validatePositiveAmount(value: string | undefined, field: string): string | null {
  if (!value?.trim()) return `${field} is required`;
  const n = Number(value);
  if (isNaN(n) || n <= 0) return 'Enter a valid positive number';
  if (n > MAX_CURRENCY) return `Maximum allowed is ${MAX_CURRENCY.toLocaleString()}`;
  return null;
}

export function validateEventParams(type: EventType, params: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};
  switch (type) {
    case 'sales_cross_x': {
      const err = validatePositiveAmount(params.amount, 'Amount');
      if (err) errors.amount = err;
      break;
    }
    case 'post_x_times': {
      const err = validatePositiveInteger(params.times, 'Number of times', MAX_TIMES);
      if (err) errors.times = err;
      break;
    }
    case 'is_onboarded':
      break;
  }
  return errors;
}

export function validateRewardParams(type: RewardType, params: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};
  switch (type) {
    case 'flat_bonus': {
      const err = validatePositiveAmount(params.amount, 'Amount');
      if (err) errors.rewardAmount = err;
      break;
    }
    case 'commission_tier_upgrade':
      if (!params.tierName) errors.tierName = 'Please select a tier';
      break;
  }
  return errors;
}
