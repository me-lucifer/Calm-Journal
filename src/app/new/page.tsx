import { generateDailyWritingPrompt } from '@/ai/flows/daily-writing-prompt';
import { NewEntryForm } from '@/components/NewEntryForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function NewEntryPage() {
  const { prompt } = await generateDailyWritingPrompt();

  return (
    <div className="flex h-full flex-col bg-background">
      <header className="flex shrink-0 items-center p-4 border-b">
        <Button asChild variant="ghost" size="icon" className="h-9 w-9">
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="font-headline text-xl text-foreground text-center flex-1 -ml-9">New Entry</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <NewEntryForm prompt={prompt} />
      </main>
    </div>
  );
}
