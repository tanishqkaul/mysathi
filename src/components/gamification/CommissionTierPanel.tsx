import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COMMISSION_TIERS } from '@/types/gamification';
import { FloatingSelect } from '@/components/ui/FloatingSelect';

interface CommissionTierPanelProps {
  selectedTier: string | null;
  onSelect: (tier: string) => void;
  onGoBack: () => void;
  onSave: () => void;
  onClose: () => void;
}

const TIER_OPTIONS = COMMISSION_TIERS.map(t => ({ value: t, label: t }));

export function CommissionTierPanel({
  selectedTier,
  onSelect,
  onGoBack,
  onSave,
  onClose,
}: CommissionTierPanelProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 flex-shrink-0">
        <h2 className="text-base font-semibold text-gray-900">Select a commission tier</h2>
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Body */}
      <div className="px-6 py-5 flex-1">
        <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-3">
          Upgrade to <span className="text-red-500">*</span>
        </label>
        <FloatingSelect
          options={TIER_OPTIONS}
          value={selectedTier}
          onChange={onSelect}
          placeholder="Select a tier"
        />
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 flex-shrink-0">
        <button
          type="button"
          onClick={onGoBack}
          className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 font-medium hover:bg-gray-50 transition-colors"
        >
          Go Back
        </button>
        <button
          type="button"
          disabled={!selectedTier}
          onClick={onSave}
          className={cn(
            'flex-1 py-2.5 rounded-lg text-sm text-white font-semibold transition-all duration-150',
            selectedTier
              ? 'bg-fuchsia-500 hover:bg-fuchsia-600 active:scale-[0.98]'
              : 'bg-[#F68DF6] cursor-not-allowed'
          )}
        >
          Save
        </button>
      </div>
    </div>
  );
}
