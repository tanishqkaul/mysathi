export type EventType = 'sales_cross_x' | 'post_x_times' | 'is_onboarded';
export type RewardType = 'flat_bonus' | 'commission_tier_upgrade';
export type Period = '14_days' | '1_month' | '2_months' | '3_months' | '1_year';

export interface GamificationState {
  isModalOpen: boolean;
  event: {
    selectedType: EventType | null;
    params: Record<string, string>;
    isSaved: boolean;
    isDropdownOpen: boolean;
  };
  reward: {
    selectedType: RewardType | null;
    params: Record<string, string>;
    isSaved: boolean;
    isDropdownOpen: boolean;
    isTierPanelOpen: boolean;
  };
  timeBound: {
    enabled: boolean;
    expiryDate: string | null;
  };
  ui: {
    isSubmitting: boolean;
    validationErrors: Record<string, string>;
    submitError: string | null;
    submitSuccess: boolean;
  };
}

export interface RewardRecord {
  id: string;
  event_type: EventType;
  event_params: Record<string, string | number>;
  event_label: string;
  reward_type: RewardType;
  reward_params: Record<string, string | number>;
  reward_label: string;
  is_time_bound: boolean;
  expires_at: string | null;
  created_at: string;
}

export interface EventOption {
  value: EventType;
  label: string;
  hasInput: false;
}
export interface EventOptionWithInput {
  value: EventType;
  label: string;
  hasInput: true;
  inputType: 'dollar' | 'times_period';
}
export type AnyEventOption = EventOption | EventOptionWithInput;

export const EVENT_OPTIONS: AnyEventOption[] = [
  { value: 'sales_cross_x',  label: 'Cross $X in sales',           hasInput: true,  inputType: 'dollar' },
  { value: 'post_x_times',   label: 'Posts X times every Y period', hasInput: true,  inputType: 'times_period' },
  { value: 'is_onboarded',   label: 'Is Onboarded',                 hasInput: false },
];

export const REWARD_OPTIONS = [
  { value: 'flat_bonus'              as RewardType, label: 'Flat $X bonus' },
  { value: 'commission_tier_upgrade' as RewardType, label: 'Upgrade Commission Tier' },
] as const;

export const PERIOD_OPTIONS: { value: Period; label: string }[] = [
  { value: '14_days',  label: '14 days' },
  { value: '1_month',  label: '1 month' },
  { value: '2_months', label: '2 months' },
  { value: '3_months', label: '3 months' },
  { value: '1_year',   label: '1 year' },
];

export const COMMISSION_TIERS = [
  'Bronze Tier',
  'Silver Tier',
  'Gold Tier',
  'Platinum Tier',
  'Diamond Tier',
] as const;
