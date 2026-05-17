import * as React from 'react';
import { Brain, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import HomeIconSvg from '@/assets/icons/home.svg?react';
import BriefcaseIconSvg from '@/assets/icons/briefcase.svg?react';
import ApplicationsIconSvg from '@/assets/icons/applications.svg?react';
import WalletIconSvg from '@/assets/icons/wallet.svg?react';
import SathiLogoSvg from '@/assets/icons/sathi-logo.svg?react';

const NAV_ITEMS = [
  { id: 'home',         label: 'Home',         Icon: HomeIconSvg },
  { id: 'insights',     label: 'Insights',     Icon: Brain },
  { id: 'gamification', label: 'Gamification', Icon: BriefcaseIconSvg },
  { id: 'applications', label: 'Applications', Icon: ApplicationsIconSvg },
  { id: 'payments',     label: 'Payments',     Icon: WalletIconSvg },
] as const;

interface SidebarProps {
  activeId?: string;
  onNavigate?: (id: string) => void;
}

type SvgIconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

function NavItemRow({ label, Icon, active, onClick }: {
  label: string;
  Icon: SvgIconComponent;
  active: boolean;
  onClick: () => void;
}) {
  const color = active ? '#c530c5' : '#616161';
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2 px-2 py-2 rounded-[10px] text-sm font-medium transition-all duration-150',
        active ? 'bg-[#fffdff]' : 'hover:bg-[#fffdff]/60'
      )}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <Icon width={20} height={20} style={{ color }} />
      <span style={{ color, fontVariantLigatures: 'no-common-ligatures' }}>{label}</span>
    </button>
  );
}

export function SathiLogo() {
  return <SathiLogoSvg style={{ maxWidth: '100%', height: 'auto' }} />;
}

export function Sidebar({ activeId = 'gamification', onNavigate }: SidebarProps) {
  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[200px] hidden lg:flex flex-col z-30 shrink-0 p-4"
      style={{ backgroundColor: '#fdeffd' }}
    >
      <div className="mb-6">
        <SathiLogo />
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {NAV_ITEMS.map(({ id, label, Icon }) => (
          <NavItemRow
            key={id}
            label={label}
            Icon={Icon as SvgIconComponent}
            active={id === activeId}
            onClick={() => onNavigate?.(id)}
          />
        ))}
      </nav>

      <div className="pt-4" style={{ borderTop: '1px solid #fee7fe' }}>
        <NavItemRow
          label="Settings"
          Icon={User as unknown as SvgIconComponent}
          active={activeId === 'settings'}
          onClick={() => onNavigate?.('settings')}
        />
      </div>
    </aside>
  );
}
