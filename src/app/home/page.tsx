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

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(date);
}

export default function HomePage() {
  const { toast } = useToast();
  const today = new Date();

  return (
    <div className="flex h-full flex-col">
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
            />
            <DashboardCard
              title="Mood Today"
              href="#"
              icon={Smile}
              buttonText="Log"
              onClick={() =>
                toast({
                  title: 'Mood Logged',
                  description: "You're feeling great today!",
                })
              }
            />
            <DashboardCard
              title="Recent Pages"
              href="#"
              icon={ClipboardList}
              buttonText="View"
              onClick={() =>
                toast({
                  title: 'Coming Soon',
                  description: 'This feature is not yet available.',
                })
              }
            />
             <DashboardCard
              title="Vision Board"
              href="#"
              icon={Clapperboard}
              buttonText="Continue"
              onClick={() =>
                toast({
                  title: 'Coming Soon',
                  description: 'This feature is not yet available.',
                })
              }
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
}: {
  title: string;
  href: string;
  icon: React.ElementType;
  buttonText: string;
  onClick?: () => void;
}) {
  const cardContent = (
    <Card className="h-full transform transition-transform hover:scale-105 active:scale-95">
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
            if (onClick && href === '#') {
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

  if (href === '#') {
    return <div onClick={onClick}>{cardContent}</div>
  }

  return (
    <Link href={href}>
      {cardContent}
    </Link>
  );
}
