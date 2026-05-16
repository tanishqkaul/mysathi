import * as React from 'react';
import { Home, BarChart2, Layers, FileText, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home',          label: 'Home',          icon: Home },
  { id: 'insights',      label: 'Insights',      icon: BarChart2 },
  { id: 'gamification',  label: 'Gamification',  icon: Layers },
  { id: 'applications',  label: 'Applications',  icon: FileText },
  { id: 'payments',      label: 'Payments',      icon: CreditCard },
];

interface BottomNavProps {
  activeId?: string;
  onNavigate?: (id: string) => void;
}

export function BottomNav({ activeId = 'gamification', onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 flex lg:hidden h-16">
      {NAV_ITEMS.map(item => {
        const Icon = item.icon;
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate?.(item.id)}
            className={cn(
              'flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors',
              active ? 'text-magenta-12' : 'text-gray-400'
            )}
          >
            <Icon className={cn('h-5 w-5', active ? 'text-magenta-12' : 'text-gray-400')} />
            <span className="text-[10px] font-medium leading-none">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
