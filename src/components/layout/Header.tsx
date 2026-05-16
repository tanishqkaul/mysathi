import * as React from 'react';
import { Bell, ChevronRight, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

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
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const avatarUrl: string | undefined = user?.user_metadata?.avatar_url;
  const displayFallback = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : avatarFallback;

  React.useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

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
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="w-8 h-8 rounded-full overflow-hidden border-2 border-fuchsia-200 focus:outline-none"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-fuchsia-400 to-purple-400 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{displayFallback}</span>
                </div>
              )}
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                {user?.email && (
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                )}
                <button
                  onClick={() => { setMenuOpen(false); signOut(); }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
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
