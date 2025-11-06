'use client';

import { Home, BookCopy, HeartPulse, Calendar, Image as ImageIcon, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import React from 'react';

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/pages', label: 'Pages', icon: BookCopy },
  { href: '/exercises', label: 'Exercises', icon: HeartPulse },
  { href: '/planner', label: 'Planner', icon: Calendar },
  { href: '/vision-board', label: 'Vision', icon: ImageIcon },
];

type AppLayoutProps = {
  children: React.ReactNode;
  title: string;
  status?: 'idle' | 'saving' | 'saved';
};

export const AppLayoutContext = React.createContext<{
    setStatus: (status: 'idle' | 'saving' | 'saved') => void;
} | null>(null);

export function AppLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const pathname = usePathname();
  const [status, setStatus] = React.useState<'idle' | 'saving' | 'saved'>('idle');

  return (
    <AppLayoutContext.Provider value={{ setStatus }}>
        <div className="flex h-full flex-col bg-background">
          <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 sm:px-6">
            <div className="flex items-center gap-2">
                <h1 className="font-headline text-xl text-foreground">{title}</h1>
                {status === 'saved' && <Badge variant="secondary" className="transition-opacity duration-300">Saved</Badge>}
                {status === 'saving' && <Badge variant="outline" className="transition-opacity duration-300 animate-pulse">Saving...</Badge>}
            </div>
            <Link href="/settings">
              <Settings className="h-6 w-6 text-muted-foreground" />
              <span className="sr-only">Settings</span>
            </Link>
          </header>

          <main className="flex-1 overflow-y-auto">{children}</main>

          <nav className="shrink-0 border-t bg-card">
            <div className="mx-auto flex h-16 max-w-md items-center justify-around">
              {navItems.map(({ href, icon: Icon, label }) => {
                const isActive = pathname === href || (href !== '/home' && pathname.startsWith(href));
                return (
                  <Link
                    key={label}
                    href={href}
                    className="flex flex-col items-center gap-1 p-2 text-xs"
                  >
                    <Icon
                      className={cn(
                        'h-6 w-6 transition-colors',
                        isActive
                          ? 'text-primary'
                          : 'text-foreground/60'
                      )}
                    />
                    <span
                      className={cn(
                        'text-xs transition-colors',
                        isActive
                          ? 'text-primary'
                          : 'text-foreground/60'
                      )}
                    >
                      {label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
    </AppLayoutContext.Provider>
  );
}
