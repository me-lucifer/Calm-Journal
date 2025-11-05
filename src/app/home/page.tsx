import { generateDailyWritingPrompt } from '@/ai/flows/daily-writing-prompt';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JournalEntryCard } from '@/components/JournalEntryCard';
import { mockEntries } from '@/lib/data';
import { Lightbulb, Plus } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage() {
  const { prompt } = await generateDailyWritingPrompt();

  return (
    <div className="relative h-full p-6 pb-24">
      <div className="space-y-8">
        <Card className="bg-primary/10 border-primary/20">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-lg text-primary">Today's Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-primary/90">{prompt}</p>
          </CardContent>
        </Card>

        <div>
          <h2 className="font-headline text-2xl text-foreground mb-4">Recent Entries</h2>
          <div className="space-y-4">
            {mockEntries.map((entry) => (
              <JournalEntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-24 right-6">
        <Button asChild size="lg" className="rounded-full w-16 h-16 shadow-lg">
          <Link href="/new">
            <Plus className="h-8 w-8" />
            <span className="sr-only">New Entry</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
