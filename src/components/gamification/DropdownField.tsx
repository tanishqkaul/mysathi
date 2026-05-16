import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

interface DropdownFieldProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  options: SelectOption[];
  pendingValue: string | null;
  savedLabel: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onSelect: (value: string) => void;
  onSave: () => void;
  canSave: boolean;
  disabled?: boolean;
  inlineContent?: React.ReactNode;
  error?: string;
}

export function DropdownField({
  label,
  required,
  placeholder = 'Select…',
  options,
  pendingValue,
  savedLabel,
  isOpen,
  onToggle,
  onClose,
  onSelect,
  onSave,
  canSave,
  disabled,
  inlineContent,
  error,
}: DropdownFieldProps) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState<{ top: number; left: number; width: number } | null>(null);

  const displayText = savedLabel ?? null;

  // Calculate position when opening
  const handleToggle = () => {
    if (!isOpen) {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) setPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    }
    onToggle();
  };

  // Close on outside click — ignore clicks inside Radix portals (e.g. FloatingSelect)
  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t.closest?.('[data-radix-popper-content-wrapper]')) return;
      if (!triggerRef.current?.contains(t) && !popoverRef.current?.contains(t)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onClose]);

  // Close on scroll/resize
  React.useEffect(() => {
    if (!isOpen) return;
    const handler = () => onClose();
    window.addEventListener('scroll', handler, true);
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler, true);
      window.removeEventListener('resize', handler);
    };
  }, [isOpen, onClose]);

  return (
    <div className="space-y-1.5">
      {/* Label */}
      <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          'w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all duration-150 bg-white',
          'focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed',
          isOpen
            ? 'border-2 border-[#C530C5]'
            : error
              ? 'border border-red-400'
              : 'border border-gray-200 hover:border-gray-300',
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={cn('font-normal', displayText ? 'text-gray-900' : 'text-gray-400')}>
          {displayText ?? placeholder}
        </span>
        <ChevronDown className={cn('h-4 w-4 text-gray-400 transition-transform duration-150 shrink-0', isOpen && 'rotate-180')} />
      </button>

      {/* Floating portal panel */}
      {isOpen && pos && ReactDOM.createPortal(
        <div
          ref={popoverRef}
          className="fixed z-[300] bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden animate-slide-down"
          style={{ top: pos.top, left: pos.left, width: pos.width }}
        >
          {/* Options */}
          <div>
            {options.map((opt, i) => {
              const isSelected = pendingValue === opt.value;
              return (
                <React.Fragment key={opt.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => onSelect(opt.value)}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-3 text-sm text-left transition-colors',
                      i > 0 && 'border-t border-gray-100',
                      isSelected
                        ? 'text-fuchsia-600 font-medium bg-fuchsia-50/60'
                        : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="h-4 w-4 text-fuchsia-500 shrink-0" />}
                  </button>

                  {/* Inline content below selected option (e.g. amount input) */}
                  {isSelected && inlineContent && (
                    <div className="px-4 pb-3 border-t border-gray-100">{inlineContent}</div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!canSave}
              onClick={onSave}
              className={cn(
                'flex-1 py-2 rounded-lg text-sm text-white font-medium transition-all duration-150',
                canSave
                  ? 'bg-fuchsia-500 hover:bg-fuchsia-600 active:scale-[0.98]'
                  : 'bg-[#F68DF6] cursor-not-allowed'
              )}
            >
              Save
            </button>
          </div>
        </div>,
        document.body
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
