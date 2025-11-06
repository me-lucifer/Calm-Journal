'use client';

import {
  Book,
  ClipboardList,
  Clapperboard,
  Smile,
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { AppTour } from '@/components/AppTour';

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(date);
}

export default function HomePage() {
  const { toast } = useToast();
  const today = new Date();
  const router = useRouter();

  const handleMoodClick = () => {
    router.push('/planner?tab=mood-tracker');
  }

  return (
    <div className="flex h-full flex-col">
      <AppTour />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-headline text-foreground">
              Welcome back
            </h2>
            <p className="text-muted-foreground">{formatDate(today)}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <DashboardCard
              title="Quick Journal"
              href="/new"
              icon={Book}
              buttonText="Write"
              id="tour-quick-journal"
            />
            <DashboardCard
              title="Mood Today"
              href="#"
              icon={Smile}
              buttonText="Log"
              onClick={handleMoodClick}
              id="tour-mood-today"
            />
            <DashboardCard
              title="Recent Pages"
              href="/pages"
              icon={ClipboardList}
              buttonText="View"
            />
             <DashboardCard
              title="Vision Board"
              href="/vision-board"
              icon={Clapperboard}
              buttonText="Continue"
              id="tour-vision-board"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function DashboardCard({
  title,
  href,
  icon: Icon,
  buttonText,
  onClick,
  id,
}: {
  title: string;
  href: string;
  icon: React.ElementType;
  buttonText: string;
  onClick?: () => void;
  id?: string;
}) {
  const cardContent = (
    <Card id={id} className="h-full transform transition-transform hover:scale-105 active:scale-95">
      <CardHeader className="p-4">
        <Icon className="h-6 w-6 text-primary" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CardTitle className="mb-2 text-base font-headline">{title}</CardTitle>
        <Button
          size="sm"
          className="w-full"
          variant="secondary"
          onClick={(e) => {
            if (onClick) {
              e.preventDefault();
              onClick();
            }
          }}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );

  if (href === '#' && onClick) {
    return <div className="cursor-pointer" onClick={onClick}>{cardContent}</div>
  }

  return (
    <Link href={href}>
      {cardContent}
    </Link>
  );
}
