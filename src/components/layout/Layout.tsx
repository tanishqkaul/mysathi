import * as React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

interface LayoutProps {
  children: React.ReactNode;
  activeNav?: string;
  onNavigate?: (id: string) => void;
}

export function Layout({ children, activeNav = 'gamification', onNavigate }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar activeId={activeNav} onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col ml-0 lg:ml-[200px] pb-16 lg:pb-0">
        <Header activeSubNav="gamification" />
        <main className="flex-1">{children}</main>
      </div>
      <BottomNav activeId={activeNav} onNavigate={onNavigate} />
    </div>
  );
}
