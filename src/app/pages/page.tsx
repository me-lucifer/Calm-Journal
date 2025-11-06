'use client';

import { AppLayout } from '@/components/AppLayout';
import { JournalEntryCard } from '@/components/JournalEntryCard';
import { mockEntries } from '@/lib/data';
import type { JournalEntry } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

export default function PagesPage() {
  return (
    <AppLayout title="Pages">
      <div className="p-6 h-full">
        {mockEntries.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockEntries.map((entry) => (
                <Link key={entry.id} href={`/pages/${entry.id}`} className="no-underline">
                <JournalEntryCard entry={entry} />
                </Link>
            ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-6">
                    <BookOpen className="w-10 h-10 text-primary" />
                </div>
                <h2 className="font-headline text-2xl text-foreground">No journal entries yet</h2>
                <p className="text-muted-foreground mt-2 max-w-xs">Start writing to fill your journal with thoughts and memories.</p>
                <Button asChild size="lg" className="mt-8">
                    <Link href="/new">Create New Entry</Link>
                </Button>
            </div>
        )}
      </div>
    </AppLayout>
  );
}
