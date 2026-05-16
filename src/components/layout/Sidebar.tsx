import * as React from 'react';
import { Brain, User } from 'lucide-react';
import { cn } from '@/lib/utils';

function HomeIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4.16667 10H2.5L10 2.5L17.5 10H15.8333" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.16797 10V15.8333C4.16797 16.2754 4.34356 16.6993 4.65612 17.0118C4.96868 17.3244 5.39261 17.5 5.83464 17.5H14.168C14.61 17.5 15.0339 17.3244 15.3465 17.0118C15.659 16.6993 15.8346 16.2754 15.8346 15.8333V10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 17.5026V12.5026C7.5 12.0606 7.6756 11.6367 7.98816 11.3241C8.30072 11.0115 8.72464 10.8359 9.16667 10.8359H10.8333C11.2754 10.8359 11.6993 11.0115 12.0118 11.3241C12.3244 11.6367 12.5 12.0606 12.5 12.5026V17.5026" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BriefcaseIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2.5 7.49992C2.5 7.05789 2.67559 6.63397 2.98816 6.32141C3.30072 6.00885 3.72464 5.83325 4.16667 5.83325H15.8333C16.2754 5.83325 16.6993 6.00885 17.0118 6.32141C17.3244 6.63397 17.5 7.05789 17.5 7.49992V14.9999C17.5 15.4419 17.3244 15.8659 17.0118 16.1784C16.6993 16.491 16.2754 16.6666 15.8333 16.6666H4.16667C3.72464 16.6666 3.30072 16.491 2.98816 16.1784C2.67559 15.8659 2.5 15.4419 2.5 14.9999V7.49992Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.66699 5.83333V4.16667C6.66699 3.72464 6.84259 3.30072 7.15515 2.98816C7.46771 2.67559 7.89163 2.5 8.33366 2.5H11.667C12.109 2.5 12.5329 2.67559 12.8455 2.98816C13.1581 3.30072 13.3337 3.72464 13.3337 4.16667V5.83333" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.5 10.8333C4.82632 12.0055 7.39502 12.6161 10 12.6161C12.605 12.6161 15.1737 12.0055 17.5 10.8333" stroke="#616161" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ApplicationsIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7.5013 4.16406H5.83464C5.39261 4.16406 4.96868 4.33966 4.65612 4.65222C4.34356 4.96478 4.16797 5.3887 4.16797 5.83073V15.8307C4.16797 16.2728 4.34356 16.6967 4.65612 17.0092C4.96868 17.3218 5.39261 17.4974 5.83464 17.4974H14.168C14.61 17.4974 15.0339 17.3218 15.3465 17.0092C15.659 16.6967 15.8346 16.2728 15.8346 15.8307V5.83073C15.8346 5.3887 15.659 4.96478 15.3465 4.65222C15.0339 4.33966 14.61 4.16406 14.168 4.16406H12.5013" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 4.16667C7.5 3.72464 7.6756 3.30072 7.98816 2.98816C8.30072 2.67559 8.72464 2.5 9.16667 2.5H10.8333C11.2754 2.5 11.6993 2.67559 12.0118 2.98816C12.3244 3.30072 12.5 3.72464 12.5 4.16667C12.5 4.60869 12.3244 5.03262 12.0118 5.34518C11.6993 5.65774 11.2754 5.83333 10.8333 5.83333H9.16667C8.72464 5.83333 8.30072 5.65774 7.98816 5.34518C7.6756 5.03262 7.5 4.60869 7.5 4.16667Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 10H12.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 13.332H12.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function WalletIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M15.834 13.3359V15.8359C15.834 16.057 15.7462 16.2689 15.5899 16.4252C15.4336 16.5815 15.2217 16.6693 15.0007 16.6693H5.00065C4.55862 16.6693 4.1347 16.4937 3.82214 16.1811C3.50958 15.8686 3.33398 15.4446 3.33398 15.0026V5.0026C3.33398 4.56058 3.50958 4.13665 3.82214 3.82409C4.1347 3.51153 4.55862 3.33594 5.00065 3.33594H13.334C13.555 3.33594 13.767 3.42374 13.9232 3.58002C14.0795 3.7363 14.1673 3.94826 14.1673 4.16927V6.66927M3.33398 5.0026C3.33398 5.44463 3.50958 5.86855 3.82214 6.18112C4.1347 6.49368 4.55862 6.66927 5.00065 6.66927H15.0007C15.2217 6.66927 15.4336 6.75707 15.5899 6.91335C15.7462 7.06963 15.834 7.28159 15.834 7.5026V10.0026" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.666 10V13.3333H13.3327C12.8907 13.3333 12.4667 13.1577 12.1542 12.8452C11.8416 12.5326 11.666 12.1087 11.666 11.6667C11.666 11.2246 11.8416 10.8007 12.1542 10.4882C12.4667 10.1756 12.8907 10 13.3327 10H16.666Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const NAV_ITEMS = [
  { id: 'home',          label: 'Home',          renderIcon: (c: string) => <HomeIcon color={c} /> },
  { id: 'insights',      label: 'Insights',      renderIcon: (c: string) => <Brain size={20} strokeWidth={1.6} color={c} /> },
  { id: 'gamification',  label: 'Gamification',  renderIcon: (c: string) => <BriefcaseIcon color={c} /> },
  { id: 'applications',  label: 'Applications',  renderIcon: (c: string) => <ApplicationsIcon color={c} /> },
  { id: 'payments',      label: 'Payments',      renderIcon: (c: string) => <WalletIcon color={c} /> },
];

interface SidebarProps {
  activeId?: string;
  onNavigate?: (id: string) => void;
}

function NavItemRow({ label, renderIcon, active, onClick }: {
  label: string;
  renderIcon: (color: string) => React.ReactNode;
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
      {renderIcon(color)}
      <span style={{ color }}>{label}</span>
    </button>
  );
}

function SathiLogo() {
  return (
    <svg width="105" height="26" viewBox="0 0 140 35" fill="none" style={{ maxWidth: '100%', height: 'auto' }}>
      <g clipPath="url(#clip0_5013_529)">
        <path d="M27.4642 8.25964L12.513 15.7643L12.5999 23.1819L3.55957 18.7487V11.389L18.337 3.82642L27.2904 8.20169" fill="#C530C5"/>
        <path d="M5.15332 26.9776L20.0756 19.4441L20.0177 12.0264L29.029 16.4596V23.8193L14.2516 31.3819L5.2982 27.0356" fill="#C530C5"/>
      </g>
      <path d="M40.9602 19.8436H44.7726C44.8479 20.4837 45.1397 21.0674 45.648 21.5945C46.1752 22.1028 46.8624 22.5076 47.7096 22.8089C48.5568 23.0913 49.5075 23.2325 50.5618 23.2325C51.522 23.2325 52.3127 23.1289 52.934 22.9218C53.5553 22.7147 54.0166 22.4229 54.3178 22.0464C54.619 21.6698 54.7696 21.218 54.7696 20.6908C54.7696 20.1825 54.5814 19.7966 54.2048 19.533C53.8283 19.2506 53.2353 19.0247 52.4257 18.8552C51.6161 18.667 50.5524 18.4787 49.2346 18.2904C48.1991 18.1398 47.2201 17.9327 46.2976 17.6691C45.3751 17.3867 44.5561 17.029 43.8407 16.596C43.1441 16.163 42.5887 15.6358 42.1745 15.0146C41.7791 14.3744 41.5815 13.6214 41.5815 12.7553C41.5815 11.6822 41.8827 10.7409 42.4851 9.93131C43.1064 9.12176 44.0195 8.49106 45.2244 8.03922C46.4294 7.58737 47.9073 7.36145 49.6582 7.36145C52.2939 7.36145 54.3178 7.92626 55.7298 9.05586C57.1606 10.1666 57.8572 11.701 57.8196 13.659H54.1484C54.073 12.5482 53.6024 11.7481 52.7363 11.2586C51.8891 10.7691 50.816 10.5244 49.517 10.5244C48.312 10.5244 47.3142 10.7032 46.5235 11.0609C45.7516 11.4186 45.3656 12.0305 45.3656 12.8965C45.3656 13.2354 45.4598 13.5366 45.648 13.8002C45.8363 14.045 46.1564 14.2615 46.6082 14.4497C47.0601 14.638 47.6719 14.8169 48.4438 14.9863C49.2157 15.1558 50.1759 15.3252 51.3243 15.4946C52.3975 15.6453 53.367 15.8523 54.2331 16.1159C55.1179 16.3607 55.871 16.6901 56.4923 17.1043C57.1324 17.4997 57.6219 18.008 57.9608 18.6293C58.2997 19.2506 58.4691 20.0131 58.4691 20.9168C58.4691 22.0275 58.1773 22.9971 57.5937 23.8255C57.0289 24.6351 56.144 25.2658 54.9391 25.7176C53.753 26.1694 52.2092 26.3954 50.3077 26.3954C48.9522 26.3954 47.7566 26.2542 46.7212 25.9718C45.6857 25.6705 44.7914 25.2752 44.0384 24.7857C43.2853 24.2962 42.6734 23.7596 42.2027 23.176C41.7321 22.5923 41.3932 22.0087 41.1861 21.4251C40.9978 20.8415 40.9225 20.3143 40.9602 19.8436ZM64.8104 22.0181V18.8835H76.8972V22.0181H64.8104ZM60.2637 26L68.8487 7.72857H72.9153L81.5851 26H77.4902L69.9783 9.53595H71.7857L64.3303 26H60.2637ZM80.7387 7.72857H99.9986V10.8632H80.7387V7.72857ZM88.5048 10.4679H92.2607V26H88.5048V10.4679ZM106.457 15.2687H120.944V18.4034H106.457V15.2687ZM120.322 7.72857H124.078V26H120.322V7.72857ZM103.152 7.72857H106.908V26H103.152V7.72857ZM129.374 7.72857H133.13V26H129.374V7.72857Z" fill="#340634"/>
      <defs>
        <clipPath id="clip0_5013_529">
          <rect width="25.4693" height="27.5556" fill="white" transform="translate(3.55566 3.8269)"/>
        </clipPath>
      </defs>
    </svg>
  );
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
        {NAV_ITEMS.map(({ id, label, renderIcon }) => (
          <NavItemRow
            key={id}
            id={id}
            label={label}
            renderIcon={renderIcon}
            active={id === activeId}
            onClick={() => onNavigate?.(id)}
          />
        ))}
      </nav>

      <div className="pt-4" style={{ borderTop: '1px solid #fee7fe' }}>
        <NavItemRow
          id="settings"
          label="Settings"
          renderIcon={(c) => <User size={20} strokeWidth={1.6} color={c} />}
          active={activeId === 'settings'}
          onClick={() => onNavigate?.('settings')}
        />
      </div>
    </aside>
  );
}
