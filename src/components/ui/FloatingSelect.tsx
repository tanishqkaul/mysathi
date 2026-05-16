// import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface FloatingSelectOption {
  value: string;
  label: string;
}

interface FloatingSelectProps {
  options: FloatingSelectOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function FloatingSelect({
  options,
  value,
  onChange,
  placeholder = 'Select…',
  className,
}: FloatingSelectProps) {
  return (
    <Select value={value ?? ''} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          'w-full h-auto px-3 py-3 rounded-lg border border-gray-200 text-sm bg-white',
          'hover:border-gray-300 data-[state=open]:border-2 data-[state=open]:border-[#C530C5] focus:outline-none focus:ring-0',
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent side="bottom" className="rounded-xl border-gray-200 shadow-xl p-0 overflow-hidden">
        {options.map((opt, i) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className={cn(
              'pl-8 pr-4 py-3 text-sm cursor-pointer rounded-none',
              i > 0 && 'border-t border-gray-100',
              'focus:bg-fuchsia-50 focus:text-fuchsia-600',
              'data-[state=checked]:text-fuchsia-600 data-[state=checked]:font-medium data-[state=checked]:bg-fuchsia-50/60'
            )}
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
