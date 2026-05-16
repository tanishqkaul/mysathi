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

export function validateEventParams(type: EventType, params: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};
  switch (type) {
    case 'sales_cross_x':
      if (!params.amount?.trim()) errors.amount = 'Amount is required';
      else if (isNaN(Number(params.amount)) || Number(params.amount) <= 0) errors.amount = 'Enter a valid positive number';
      break;
    case 'post_x_times':
      if (!params.times?.trim()) errors.times = 'Number of times is required';
      else if (isNaN(Number(params.times)) || Number(params.times) <= 0) errors.times = 'Enter a valid positive number';
      break;
    case 'is_onboarded':
      break;
  }
  return errors;
}

export function validateRewardParams(type: RewardType, params: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};
  switch (type) {
    case 'flat_bonus':
      if (!params.amount?.trim()) errors.rewardAmount = 'Amount is required';
      else if (isNaN(Number(params.amount)) || Number(params.amount) <= 0) errors.rewardAmount = 'Enter a valid positive number';
      break;
    case 'commission_tier_upgrade':
      if (!params.tierName) errors.tierName = 'Please select a tier';
      break;
  }
  return errors;
}
