import * as React from 'react';
import { cn, buildEventLabel } from '@/lib/utils';
import { EVENT_OPTIONS, PERIOD_OPTIONS } from '@/types/gamification';
import type { EventType } from '@/types/gamification';
import { DropdownField } from './DropdownField';
import { FloatingSelect } from '@/components/ui/FloatingSelect';
import { useGamification } from '@/hooks/useGamification';

export function EventSection() {
  const { state, setEventType, setEventParam, saveEvent, clearEventSave } = useGamification();
  const { event, ui } = state;
  const [eventOpen, setEventOpen] = React.useState(false);

  const canSaveEvent = (() => {
    if (!event.selectedType) return false;
    if (event.selectedType === 'is_onboarded') return true;
    if (event.selectedType === 'sales_cross_x') return !!event.params.amount?.trim() && Number(event.params.amount) > 0;
    if (event.selectedType === 'post_x_times') return !!event.params.times?.trim() && Number(event.params.times) > 0 && !!event.params.period;
    return false;
  })();

  const handleSelect = (val: string) => setEventType(val as EventType);

  const handleSave = () => {
    saveEvent();
    setEventOpen(false);
  };

  const savedLabel = event.isSaved && event.selectedType
    ? buildEventLabel(event.selectedType, event.params)
    : null;

  const inlineContent = (() => {
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
            onKeyDown={e => { if (e.key === 'Enter' && canSaveEvent) { e.preventDefault(); handleSave(); } }}
            className={cn(
              'w-full pl-7 pr-3 py-2 text-sm rounded-lg border transition-colors',
              'focus:outline-none focus:border-[#C530C5]',
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
            onKeyDown={e => { if (e.key === 'Enter' && canSaveEvent) { e.preventDefault(); handleSave(); } }}
            className="w-[4.5rem] shrink-0 px-3 py-2 text-sm rounded-lg border border-gray-200 hover:border-gray-300 focus:outline-none focus:border-[#C530C5]"
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

  return (
    <DropdownField
      label="Reward event"
      required
      placeholder="Select an event"
      options={EVENT_OPTIONS.map(o => ({ value: o.value, label: o.label }))}
      pendingValue={event.selectedType}
      savedLabel={savedLabel}
      isOpen={eventOpen && !event.isSaved}
      onToggle={() => {
        if (event.isSaved) { clearEventSave(); setEventOpen(true); }
        else setEventOpen(p => !p);
      }}
      onClose={() => setEventOpen(false)}
      onSelect={handleSelect}
      onSave={handleSave}
      canSave={canSaveEvent}
      inlineContent={inlineContent}
      error={ui.validationErrors.amount || ui.validationErrors.times}
    />
  );
}
