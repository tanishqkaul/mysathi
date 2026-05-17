import * as React from 'react';
import { format, addDays, startOfDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/Spinner';
import CalendarIconSvg from '@/assets/icons/calendar.svg?react';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarPicker } from '@/components/ui/calendar';
import { useGamification } from '@/hooks/useGamification';
import { ModalHeader } from './ModalHeader';
import { EventSection } from './EventSection';
import { RewardSection } from './RewardSection';
import { CommissionTierPanel } from './CommissionTierPanel';


interface GamificationModalProps {
  isOpen: boolean;
}

export function GamificationModal({ isOpen }: GamificationModalProps) {
  const { state, closeModal, toggleTimeBound, setExpiryDate, createReward, setRewardParam, saveReward, closeTierPanel } = useGamification();
  const { event, reward, timeBound, ui } = state;

  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);

  const tomorrow = addDays(startOfDay(new Date()), 1);
  const selectedDate = timeBound.expiryDate ? new Date(timeBound.expiryDate) : undefined;
  const canCreate = event.isSaved && reward.isSaved;

  // ESC to close
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, closeModal]);

  if (!isOpen || ui.submitSuccess) return null;

  // Tier panel replaces the main modal (same overlay, different content)
  if (reward.isTierPanelOpen) {
    return (
      <div className="fixed inset-0 z-50 flex items-start pt-[3.5rem] justify-center" style={{ backdropFilter: 'blur(2px)', backgroundColor: 'rgba(0,0,0,0.25)' }}>
        <div className="bg-white w-full mx-4 rounded-xl sm:rounded-lg sm:max-w-[22rem] max-h-[90vh] shadow-2xl animate-modal-in flex flex-col">
          <CommissionTierPanel
            selectedTier={reward.params.tierName ?? null}
            onSelect={tier => setRewardParam('tierName', tier)}
            onGoBack={() => closeTierPanel()}
            onSave={() => saveReward()}
            onClose={closeModal}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start pt-[3.5rem] justify-center animate-fade-in"
      style={{ backdropFilter: 'blur(2px)', backgroundColor: 'rgba(0,0,0,0.25)' }}
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
    >
      <div className="bg-white w-full mx-4 rounded-xl sm:rounded-lg sm:max-w-[22rem] max-h-[90vh] shadow-2xl animate-modal-in flex flex-col">
        <ModalHeader onClose={closeModal} />

        {/* Body */}
        <div className="px-6 pb-2 space-y-5 flex-1 overflow-y-auto">
          <EventSection />
          <RewardSection />

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

            {timeBound.enabled && (
              <div className="animate-fade-in">
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all bg-white',
                        calendarOpen ? 'border-2 border-[#C530C5]' : 'border-2 border-gray-200 hover:border-gray-300'
                      )}
                    >
                      <CalendarIconSvg style={{ width: '1.5625rem', height: '1.5rem', flexShrink: 0, color: '#4A4A4A' }} />
                      <span className={selectedDate ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                        {selectedDate ? format(selectedDate, 'd MMM, yyyy') : 'Select End Date'}
                      </span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2 rounded-lg border-gray-200 shadow-2xl" align="start" side="bottom" sideOffset={4} avoidCollisions={false}>
                    <CalendarPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => { if (date) { setExpiryDate(date.toISOString()); setCalendarOpen(false); } }}
                      disabled={{ before: tomorrow }}
                      buttonVariant="outline"
                      className="p-0"
                      classNames={{ today: 'text-fuchsia-600 font-semibold bg-transparent' }}
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
                  : 'bg-fuchsia-300 cursor-not-allowed'
              )}
            >
              {ui.isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner size="sm" />
                  Creating…
                </span>
              ) : 'Create Reward'}
            </button>

            {showTooltip && !canCreate && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap animate-fade-in shadow-lg">
                Choose a reward trigger and a reward to continue
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900" />
              </div>
            )}
          </div>
        </div>

        {ui.submitError && (
          <div className="mx-6 mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 animate-fade-in">
            {ui.submitError}
          </div>
        )}
      </div>
    </div>
  );
}
