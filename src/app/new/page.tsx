import { NewEntryForm } from '@/components/NewEntryForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewEntryPage() {
  return (
    <div className="flex h-full flex-col bg-background">
      <header className="flex shrink-0 items-center p-4 border-b">
        <Button asChild variant="ghost" size="icon" className="h-9 w-9">
          <Link href="/home">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to Home</span>
          </Link>
        </Button>
        <h1 className="font-headline text-xl text-foreground text-center flex-1 -ml-9">Quick Journal</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <NewEntryForm />
      </main>
    </div>
  );
}
