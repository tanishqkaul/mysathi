import * as React from 'react';
import { X } from 'lucide-react';
import { format, addDays, startOfDay } from 'date-fns';
import { cn, buildEventLabel, buildRewardLabel } from '@/lib/utils';
import { EVENT_OPTIONS, REWARD_OPTIONS, PERIOD_OPTIONS } from '@/types/gamification';
import type { EventType, RewardType } from '@/types/gamification';
import { DropdownField } from './DropdownField';
import { CommissionTierPanel } from './CommissionTierPanel';
import { FloatingSelect } from '@/components/ui/FloatingSelect';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarPicker } from '@/components/ui/calendar';
import { useGamification } from '@/hooks/useGamification';

function CalendarIcon() {
  return (
    <svg viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '1.5625rem', height: '1.5rem', flexShrink: 0 }}>
      <g clipPath="url(#cal-clip)">
        <path d="M4.16667 7C4.16667 6.46957 4.38617 5.96086 4.77687 5.58579C5.16757 5.21071 5.69747 5 6.25001 5H18.75C19.3025 5 19.8324 5.21071 20.2231 5.58579C20.6138 5.96086 20.8333 6.46957 20.8333 7V19C20.8333 19.5304 20.6138 20.0391 20.2231 20.4142C19.8324 20.7893 19.3025 21 18.75 21H6.25001C5.69747 21 5.16757 20.7893 4.77687 20.4142C4.38617 20.0391 4.16667 19.5304 4.16667 19V7Z" stroke="#4A4A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.6667 3V7" stroke="#4A4A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.33333 3V7" stroke="#4A4A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.16667 11H20.8333" stroke="#4A4A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="cal-clip"><rect width="25" height="24" fill="white"/></clipPath>
      </defs>
    </svg>
  );
}

interface GamificationModalProps {
  isOpen: boolean;
}

export function GamificationModal({ isOpen }: GamificationModalProps) {
  const {
    state,
    closeModal,
    setEventType, setEventParam, saveEvent, clearEventSave,
    setRewardType, setRewardParam, saveReward, clearRewardSave, closeTierPanel,
    toggleTimeBound, setExpiryDate,
    createReward,
  } = useGamification();

  const { event, reward, timeBound, ui } = state;

  // Local open/close state for the two dropdowns
  const [eventOpen, setEventOpen] = React.useState(false);
  const [rewardOpen, setRewardOpen] = React.useState(false);
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const modalBodyRef = React.useRef<HTMLDivElement>(null);

  const tomorrow = addDays(startOfDay(new Date()), 1);
  const selectedDate = timeBound.expiryDate ? new Date(timeBound.expiryDate) : undefined;
  const canCreate = event.isSaved && reward.isSaved;

  // ESC to close
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  /* ---------- helpers ---------- */

  const handleEventSelect = (val: string) => {
    const t = val as EventType;
    setEventType(t);
    // is_onboarded has no input — allow immediate save
  };

  const handleEventSave = () => {
    saveEvent();
    // check if save succeeded (no validation errors means isSaved will be true after dispatch)
    // We close the dropdown optimistically; Redux validation will reopen via effect if needed
    setEventOpen(false);
  };

  const handleRewardSelect = (val: string) => {
    setRewardType(val as RewardType);
    // Commission tier opens its own panel — dropdown stays open so user sees panel
  };

  const handleRewardSave = () => {
    saveReward();
    setRewardOpen(false);
  };

  // Build the current event saved label
  const eventSavedLabel = event.isSaved && event.selectedType
    ? buildEventLabel(event.selectedType, event.params)
    : null;

  // Build the current reward saved label
  const rewardSavedLabel = reward.isSaved && reward.selectedType
    ? buildRewardLabel(reward.selectedType, reward.params)
    : null;

  // Whether the event "Save" button should be enabled
  const canSaveEvent = (() => {
    if (!event.selectedType) return false;
    if (event.selectedType === 'is_onboarded') return true;
    if (event.selectedType === 'sales_cross_x') return !!event.params.amount?.trim() && Number(event.params.amount) > 0;
    if (event.selectedType === 'post_x_times') return !!event.params.times?.trim() && Number(event.params.times) > 0 && !!event.params.period;
    return false;
  })();

  const canSaveReward = (() => {
    if (!reward.selectedType) return false;
    if (reward.selectedType === 'flat_bonus') return !!reward.params.amount?.trim() && Number(reward.params.amount) > 0;
    if (reward.selectedType === 'commission_tier_upgrade') return !!reward.params.tierName;
    return false;
  })();

  /* ---------- inline inputs ---------- */

  const eventInlineContent = (() => {
    if (!event.selectedType || event.selectedType === 'is_onboarded') return null;

    if (event.selectedType === 'sales_cross_x') {
      return (
        <div className="relative mt-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">$</span>
          <input
            type="number"
            min="1"
            placeholder="e.g. 100"
            value={event.params.amount ?? ''}
            onChange={e => setEventParam('amount', e.target.value)}
            onClick={e => e.stopPropagation()}
            onKeyDown={e => { if (e.key === 'Enter' && canSaveEvent) { e.preventDefault(); handleEventSave(); } }}
            className={cn(
              'w-full pl-7 pr-3 py-2 text-sm rounded-lg border transition-colors',
              'focus:outline-none focus:border-2 focus:border-[#C530C5]',
              ui.validationErrors.amount ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
            )}
            autoFocus
          />
          {ui.validationErrors.amount && (
            <p className="text-xs text-red-500 mt-1">{ui.validationErrors.amount}</p>
          )}
        </div>
      );
    }

    if (event.selectedType === 'post_x_times') {
      return (
        <div className="flex gap-2 mt-1">
          <input
            type="number"
            min="1"
            placeholder="e.g. 5"
            value={event.params.times ?? ''}
            onChange={e => setEventParam('times', e.target.value)}
            onClick={e => e.stopPropagation()}
            onKeyDown={e => { if (e.key === 'Enter' && canSaveEvent) { e.preventDefault(); handleEventSave(); } }}
            className="w-[4.5rem] shrink-0 px-3 py-2 text-sm rounded-lg border border-gray-200 hover:border-gray-300 focus:outline-none focus:border-2 focus:border-[#C530C5]"
            autoFocus
          />
          <div className="flex-1 min-w-0" onClick={e => e.stopPropagation()}>
            <FloatingSelect
              options={PERIOD_OPTIONS}
              value={event.params.period ?? null}
              onChange={val => {
                const opt = PERIOD_OPTIONS.find(p => p.value === val);
                setEventParam('period', val);
                if (opt) setEventParam('periodLabel', opt.label);
              }}
              placeholder="Select duration"
              className="py-2"
            />
          </div>
        </div>
      );
    }
    return null;
  })();

  const rewardInlineContent = (() => {
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
            onKeyDown={e => { if (e.key === 'Enter' && canSaveReward) { e.preventDefault(); handleRewardSave(); } }}
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

  /* ---------- render: tier panel ---------- */

  if (reward.isTierPanelOpen) {
    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-start sm:pt-[3.5rem] justify-center" style={{ backdropFilter: 'blur(2px)', backgroundColor: 'rgba(0,0,0,0.25)' }}>
        <div className="bg-white w-full rounded-t-lg rounded-b-none sm:rounded-lg sm:max-w-[22rem] sm:mx-4 max-h-[90vh] shadow-2xl animate-modal-in flex flex-col">
          <CommissionTierPanel
            selectedTier={reward.params.tierName ?? null}
            onSelect={tier => setRewardParam('tierName', tier)}
            onGoBack={() => { closeTierPanel(); setRewardOpen(false); }}
            onSave={() => { saveReward(); setRewardOpen(false); }}
            onClose={closeModal}
          />
        </div>
      </div>
    );
  }

  /* ---------- render: success state ---------- */

  if (ui.submitSuccess) {
    return null; // success is shown as toast in App.tsx; modal auto-closes
  }

  /* ---------- render: main modal ---------- */

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-start sm:pt-[3.5rem] justify-center animate-fade-in"
      style={{ backdropFilter: 'blur(2px)', backgroundColor: 'rgba(0,0,0,0.25)' }}
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
    >
      <div className="bg-white w-full rounded-t-lg rounded-b-none sm:rounded-lg sm:max-w-[22rem] sm:mx-4 max-h-[90vh] shadow-2xl animate-modal-in flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-base font-semibold text-gray-900">Create your reward system</h2>
          <button
            onClick={closeModal}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div ref={modalBodyRef} className="px-6 pb-2 space-y-5 flex-1 overflow-y-auto">
          {/* Reward event dropdown */}
          <DropdownField
            label="Reward event"
            required
            placeholder="Select an event"
            options={EVENT_OPTIONS.map(o => ({ value: o.value, label: o.label }))}
            pendingValue={event.selectedType}
            savedLabel={eventSavedLabel}
            isOpen={eventOpen && !event.isSaved}
            onToggle={() => {
              if (event.isSaved) { clearEventSave(); setEventOpen(true); }
              else setEventOpen(p => !p);
            }}
            onClose={() => setEventOpen(false)}
            onSelect={handleEventSelect}
            onSave={handleEventSave}
            canSave={canSaveEvent}
            inlineContent={eventInlineContent}
            error={ui.validationErrors.amount || ui.validationErrors.times}
          />

          {/* Reward with dropdown */}
          <DropdownField
            label="Reward with"
            required
            placeholder="Select a reward"
            options={REWARD_OPTIONS.map(o => ({ value: o.value, label: o.label }))}
            pendingValue={reward.selectedType}
            savedLabel={rewardSavedLabel}
            isOpen={rewardOpen && !reward.isSaved}
            onToggle={() => {
              if (reward.isSaved) { clearRewardSave(); setRewardOpen(true); }
              else setRewardOpen(p => !p);
            }}
            onClose={() => setRewardOpen(false)}
            onSelect={handleRewardSelect}
            onSave={handleRewardSave}
            canSave={canSaveReward}
            inlineContent={rewardInlineContent}
            error={ui.validationErrors.rewardAmount}
          />

          {/* Time-bound toggle */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-800">Make the reward time bound</p>
                <p className="text-xs text-gray-400 mt-0.5">Choose an end date to stop this reward automatically.</p>
              </div>
              <Switch
                checked={timeBound.enabled}
                onCheckedChange={(checked) => { toggleTimeBound(checked); setCalendarOpen(false); }}
                className="mt-0.5 data-[state=checked]:bg-fuchsia-500 data-[state=unchecked]:bg-gray-200 h-5 w-9 [&>span]:h-3.5 [&>span]:w-3.5 [&>span]:data-[state=checked]:translate-x-4 [&>span]:data-[state=unchecked]:translate-x-0.5"
              />
            </div>

            {/* Date field */}
            {timeBound.enabled && (
              <div className="animate-fade-in">
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all bg-white',
                        calendarOpen
                          ? 'border-2 border-[#C530C5]'
                          : 'border border-gray-200 hover:border-gray-300'
                      )}
                    >
                      <CalendarIcon />
                      <span className={selectedDate ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                        {selectedDate ? format(selectedDate, 'd MMM, yyyy') : 'Select End Date'}
                      </span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-2 rounded-lg border-gray-200 shadow-2xl"
                    align="start"
                    side="bottom"
                    sideOffset={4}
                    avoidCollisions={false}
                  >
                    <CalendarPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => { if (date) { setExpiryDate(date.toISOString()); setCalendarOpen(false); } }}
                      disabled={{ before: tomorrow }}
                      buttonVariant="outline"
                      className="p-0"
                      classNames={{
                        today: 'text-fuchsia-600 font-semibold bg-transparent',
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 flex-shrink-0">
          <button
            type="button"
            onClick={closeModal}
            className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>

          {/* Create Reward with tooltip */}
          <div
            className="flex-1 relative"
            onMouseEnter={() => !canCreate && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <button
              type="button"
              disabled={!canCreate || ui.isSubmitting}
              onClick={() => createReward()}
              className={cn(
                'w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-150',
                canCreate && !ui.isSubmitting
                  ? 'bg-fuchsia-500 hover:bg-fuchsia-600 active:scale-[0.98]'
                  : 'bg-[#F68DF6] cursor-not-allowed'
              )}
            >
              {ui.isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating…
                </span>
              ) : 'Create Reward'}

            </button>

            {/* Tooltip */}
            {showTooltip && !canCreate && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap animate-fade-in shadow-lg">
                Choose a reward trigger and a reward to continue
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900" />
              </div>
            )}
          </div>
        </div>

        {/* Submit error */}
        {ui.submitError && (
          <div className="mx-6 mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 animate-fade-in">
            {ui.submitError}
          </div>
        )}
      </div>
    </div>
  );
}
