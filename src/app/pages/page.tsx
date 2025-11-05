'use client';

import { AppLayout } from '@/components/AppLayout';
import { JournalEntryCard } from '@/components/JournalEntryCard';
import { mockEntries } from '@/lib/data';
import type { JournalEntry } from '@/lib/types';
import Link from 'next/link';

export default function PagesPage() {
  return (
    <AppLayout title="Pages">
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mockEntries.map((entry) => (
            <Link key={entry.id} href={`/pages/${entry.id}`} className="no-underline">
              <JournalEntryCard entry={entry} />
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
