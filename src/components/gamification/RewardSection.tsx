import * as React from 'react';
import { cn, buildRewardLabel } from '@/lib/utils';
import { REWARD_OPTIONS } from '@/types/gamification';
import type { RewardType } from '@/types/gamification';
import { DropdownField } from './DropdownField';
import { useGamification } from '@/hooks/useGamification';

export function RewardSection() {
  const { state, setRewardType, setRewardParam, saveReward, clearRewardSave } = useGamification();
  const { reward, ui } = state;
  const [rewardOpen, setRewardOpen] = React.useState(false);

  const canSaveReward = (() => {
    if (!reward.selectedType) return false;
    if (reward.selectedType === 'flat_bonus') return !!reward.params.amount?.trim() && Number(reward.params.amount) > 0;
    if (reward.selectedType === 'commission_tier_upgrade') return !!reward.params.tierName;
    return false;
  })();

  const handleSelect = (val: string) => setRewardType(val as RewardType);

  const handleSave = () => {
    saveReward();
    setRewardOpen(false);
  };

  const savedLabel = reward.isSaved && reward.selectedType
    ? buildRewardLabel(reward.selectedType, reward.params)
    : null;

  const inlineContent = (() => {
    if (reward.selectedType === 'flat_bonus') {
      return (
        <div className="relative mt-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">$</span>
          <input
            type="number"
            min="1"
            placeholder="e.g. 100"
            value={reward.params.amount ?? ''}
            onChange={e => setRewardParam('amount', e.target.value)}
            onClick={e => e.stopPropagation()}
            onKeyDown={e => { if (e.key === 'Enter' && canSaveReward) { e.preventDefault(); handleSave(); } }}
            className={cn(
              'w-full pl-7 pr-3 py-2 text-sm rounded-lg border transition-colors',
              'focus:outline-none focus:border-2 focus:border-[#C530C5]',
              ui.validationErrors.rewardAmount ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
            )}
            autoFocus
          />
        </div>
      );
    }
    return null;
  })();

  return (
    <DropdownField
      label="Reward with"
      required
      placeholder="Select a reward"
      options={REWARD_OPTIONS.map(o => ({ value: o.value, label: o.label }))}
      pendingValue={reward.selectedType}
      savedLabel={savedLabel}
      isOpen={rewardOpen && !reward.isSaved}
      onToggle={() => {
        if (reward.isSaved) { clearRewardSave(); setRewardOpen(true); }
        else setRewardOpen(p => !p);
      }}
      onClose={() => setRewardOpen(false)}
      onSelect={handleSelect}
      onSave={handleSave}
      canSave={canSaveReward}
      inlineContent={inlineContent}
      error={ui.validationErrors.rewardAmount}
    />
  );
}
