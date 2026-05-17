import { supabase } from '@/lib/supabase';
import { buildEventLabel, buildRewardLabel } from '@/lib/utils';
import type { GamificationState } from '@/types/gamification';

export interface RewardPayload {
  event_type: string;
  event_params: Record<string, string>;
  event_label: string;
  reward_type: string;
  reward_params: Record<string, string>;
  reward_label: string;
  is_time_bound: boolean;
  expires_at: string | null;
}

export function buildRewardPayload(state: Pick<GamificationState, 'event' | 'reward' | 'timeBound'>): RewardPayload {
  const { event, reward, timeBound } = state;
  return {
    event_type: event.selectedType!,
    event_params: event.params,
    event_label: buildEventLabel(event.selectedType!, event.params),
    reward_type: reward.selectedType!,
    reward_params: reward.params,
    reward_label: buildRewardLabel(reward.selectedType!, reward.params),
    is_time_bound: timeBound.enabled,
    expires_at: timeBound.enabled ? timeBound.expiryDate : null,
  };
}

export async function createRewardRecord(payload: RewardPayload) {
  const { data, error } = await supabase.from('rewards').insert(payload).select().single();
  if (error) throw new Error(error.message);
  return data;
}
