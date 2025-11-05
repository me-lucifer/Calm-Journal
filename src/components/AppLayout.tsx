'use client';

import { Home, BookCopy, HeartPulse, Calendar, Image as ImageIcon, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/pages', icon: BookCopy, label: 'Pages' },
  { href: '/exercises', icon: HeartPulse, label: 'Exercises' },
  { href: '/planner', icon: Calendar, label: 'Planner' },
  { href: '/vision-board', icon: ImageIcon, label: 'Vision' },
];

export function AppLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-background">
      <header className="flex h-16 shrink-0 items-center justify-between border-b px-6">
        <h1 className="font-headline text-xl text-foreground">{title}</h1>
        <Link href="/settings">
          <Settings className="h-6 w-6 text-muted-foreground" />
          <span className="sr-only">Settings</span>
        </Link>
      </header>

      <main className="flex-1 overflow-y-auto">{children}</main>

      <nav className="shrink-0 border-t bg-card">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname.startsWith(href);
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
  );
}
