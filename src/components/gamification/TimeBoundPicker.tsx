import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { format, addDays, startOfDay } from 'date-fns';
import { Calendar, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGamification } from '@/hooks/useGamification';

export function TimeBoundPicker() {
  const { state, toggleTimeBound, setExpiryDate } = useGamification();
  const { timeBound, event } = state;
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const isDisabled = !event.isSaved;
  const tomorrow = addDays(startOfDay(new Date()), 1);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectedDate = timeBound.expiryDate ? new Date(timeBound.expiryDate) : undefined;

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setExpiryDate(date.toISOString());
      setCalendarOpen(false);
    }
  };

  const handleToggle = (checked: boolean) => {
    toggleTimeBound(checked);
    if (checked) setCalendarOpen(true);
    else setCalendarOpen(false);
  };

  return (
    <div className={cn('space-y-3', isDisabled && 'opacity-40 pointer-events-none')}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Make time-bound</span>
          <span className="text-xs text-gray-400">(optional)</span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={timeBound.enabled}
          onClick={() => handleToggle(!timeBound.enabled)}
          className={cn(
            'relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            timeBound.enabled ? 'bg-primary' : 'bg-gray-200'
          )}
        >
          <span
            className={cn(
              'inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200',
              timeBound.enabled ? 'translate-x-5' : 'translate-x-0.5'
            )}
          />
        </button>
      </div>

      {timeBound.enabled && (
        <div className="relative animate-fade-in" ref={ref}>
          <button
            type="button"
            onClick={() => setCalendarOpen(prev => !prev)}
            className={cn(
              'w-full flex items-center justify-between px-4 py-2.5 text-sm rounded-lg border transition-all duration-150 bg-white',
              calendarOpen
                ? 'border-primary shadow-sm'
                : 'border-gray-200 hover:border-gray-300',
              !selectedDate && 'text-gray-400'
            )}
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className={cn(selectedDate ? 'text-gray-900 font-medium' : 'text-gray-400')}>
                {selectedDate
                  ? format(selectedDate, 'MMM d, yyyy')
                  : 'Select expiry date'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {selectedDate && (
                <span
                  role="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpiryDate('');
                    toggleTimeBound(true);
                  }}
                  className="p-0.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-3 w-3" />
                </span>
              )}
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-gray-400 transition-transform duration-150',
                  calendarOpen && 'rotate-180'
                )}
              />
            </div>
          </button>

          {calendarOpen && (
            <div className="absolute z-30 top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-dropdown p-3 animate-slide-down">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleSelect}
                disabled={{ before: tomorrow }}
                fromMonth={new Date()}
                showOutsideDays={false}
                classNames={{
                  months: 'flex flex-col',
                  month: 'space-y-3',
                  caption: 'flex justify-between items-center px-1',
                  caption_label: 'text-sm font-semibold text-gray-900',
                  nav: 'flex gap-1',
                  nav_button: 'h-7 w-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed',
                  table: 'w-full border-collapse',
                  head_row: 'flex',
                  head_cell: 'text-gray-400 rounded-md w-9 font-normal text-[0.75rem] text-center',
                  row: 'flex w-full mt-1',
                  cell: 'h-9 w-9 text-center text-sm p-0 relative',
                  day: 'h-9 w-9 p-0 font-normal rounded-full flex items-center justify-center transition-colors aria-selected:bg-primary aria-selected:text-white hover:bg-gray-100',
                  day_selected: 'bg-primary text-white hover:bg-primary-hover',
                  day_today: 'font-bold text-primary',
                  day_outside: 'opacity-50',
                  day_disabled: 'text-gray-300 cursor-not-allowed hover:bg-transparent',
                  day_range_middle: 'aria-selected:bg-primary-light aria-selected:text-primary',
                  day_hidden: 'invisible',
                }}
              />
              <p className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-100">
                Only future dates are selectable
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
