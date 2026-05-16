import { Bell, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopNavItem {
  id: string;
  label: string;
}

interface SubNavItem {
  id: string;
  label: string;
}

interface HeaderProps {
  topNavItems?: TopNavItem[];
  activeTopNav?: string;
  subNavItems?: SubNavItem[];
  activeSubNav?: string;
  onTopNavClick?: (id: string) => void;
  onSubNavClick?: (id: string) => void;
  notificationCount?: number;
  avatarFallback?: string;
}

const DEFAULT_TOP_NAV: TopNavItem[] = [
  { id: 'campaigns',        label: 'Campaigns' },
  { id: 'campaign-items',   label: 'Campaign Items' },
  { id: 'campaign-settings', label: 'Campaign Settings' },
];

const DEFAULT_SUB_NAV: SubNavItem[] = [
  { id: 'general',       label: 'General' },
  { id: 'preferences',   label: 'Preferences' },
  { id: 'gamification',  label: 'Gamification' },
];

export function Header({
  topNavItems = DEFAULT_TOP_NAV,
  activeTopNav = 'campaigns',
  subNavItems = DEFAULT_SUB_NAV,
  activeSubNav = 'gamification',
  onTopNavClick,
  onSubNavClick,
  notificationCount = 5,
  avatarFallback = 'TK',
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
      {/* Top row: top-nav + actions */}
      <div className="flex items-center justify-between px-4 sm:px-8 h-12 sm:h-14">
        {/* Top nav */}
        <nav className="hidden sm:flex items-center gap-2">
          {topNavItems.map((item, i) => (
            <div key={item.id} className="flex items-center gap-2">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-gray-300 shrink-0" />}
              <button
                onClick={() => onTopNavClick?.(item.id)}
                className={cn(
                  'text-sm font-medium transition-colors',
                  activeTopNav === item.id
                    ? 'text-gray-900'
                    : 'text-gray-400 hover:text-gray-600'
                )}
              >
                {item.label}
              </button>
            </div>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3 mr-[9.13rem]">
          <button className="relative p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="h-5 w-5 text-gray-500" />
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-1">
                {notificationCount}
              </span>
            )}
          </button>
          <button className="w-8 h-8 rounded-full overflow-hidden border-2 border-fuchsia-200">
            <div className="w-full h-full bg-gradient-to-br from-fuchsia-400 to-purple-400 flex items-center justify-center">
              <span className="text-white text-xs font-bold">{avatarFallback}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Sub-nav row */}
      {subNavItems.length > 0 && (
        <div className="flex items-center gap-0 px-4 sm:px-8 border-t border-gray-50 overflow-x-auto scrollbar-hide">
          {subNavItems.map(item => (
            <button
              key={item.id}
              onClick={() => onSubNavClick?.(item.id)}
              className={cn(
                'px-4 py-2.5 text-sm font-medium border-b-2 transition-all duration-150 -mb-px whitespace-nowrap',
                activeSubNav === item.id
                  ? 'border-fuchsia-500 text-fuchsia-600'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
