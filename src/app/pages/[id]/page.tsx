'use client';

import { ArrowLeft, Edit2, SquareCheckBig, Type } from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { mockEntries } from '@/lib/data';
import { JournalEntry } from '@/lib/types';
import { useState }
from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function PageReader() {
  const { id } = useParams();
  const entry = mockEntries.find((e) => e.id === id);
  const [isDrawMode, setIsDrawMode] = useState(false);

  if (!entry) {
    notFound();
  }

  const currentIndex = mockEntries.findIndex((e) => e.id === id);
  const prevEntry = currentIndex > 0 ? mockEntries[currentIndex - 1] : null;
  const nextEntry = currentIndex < mockEntries.length - 1 ? mockEntries[currentIndex + 1] : null;

  return (
    <div className="flex h-full flex-col bg-background">
      <header className="flex shrink-0 items-center justify-between p-4 border-b">
        <Button asChild variant="ghost" size="icon" className="h-9 w-9">
          <Link href="/pages">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to Pages</span>
          </Link>
        </Button>
        <h1 className="font-headline text-lg text-foreground text-center truncate">
          {entry.date}
        </h1>
        <div className="flex items-center gap-2">
            <Button variant={isDrawMode ? "secondary" : "ghost"} size="icon" className="h-9 w-9" onClick={() => setIsDrawMode(!isDrawMode)}>
                <Edit2 className="h-5 w-5" />
                <span className="sr-only">Toggle Draw Mode</span>
            </Button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute inset-0 z-0">
          <Image
            src={PlaceHolderImages[0].imageUrl}
            alt="Page background"
            fill
            className="object-cover opacity-10"
            data-ai-hint="paper texture"
          />
        </div>
        
        {isDrawMode && (
          <canvas className="absolute inset-0 z-20 w-full h-full" />
        )}

        <div className="relative z-10 p-6 space-y-6">
            <div className="p-4 bg-card/80 rounded-lg shadow-sm">
                <h2 className="font-headline text-2xl mb-4 flex items-center gap-2"><Type className="w-6 h-6 text-primary"/> Editable Text Block</h2>
                <textarea
                    defaultValue={entry.content}
                    className="w-full bg-transparent border-0 focus:ring-0 p-0 m-0 text-foreground/90 leading-relaxed"
                    rows={8}
                />
            </div>

            <div className="p-4 bg-card/80 rounded-lg shadow-sm">
                <h2 className="font-headline text-2xl mb-4 flex items-center gap-2"><SquareCheckBig className="w-6 h-6 text-primary" /> Checklist</h2>
                <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                        <Checkbox id="check1" />
                        <Label htmlFor="check1" className="text-base flex-1">Did I drink enough water today?</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Checkbox id="check2" defaultChecked />
                        <Label htmlFor="check2" className="text-base flex-1">Did I take a moment for myself?</Label>
                    </div>
                     <div className="flex items-center space-x-3">
                        <Checkbox id="check3" />
                        <Label htmlFor="check3" className="text-base flex-1">Did I move my body?</Label>
                    </div>
                </div>
            </div>
        </div>
      </main>

      <footer className="shrink-0 flex items-center justify-between p-4 border-t">
        {prevEntry ? (
          <Button asChild variant="outline">
            <Link href={`/pages/${prevEntry.id}`}>Previous</Link>
          </Button>
        ) : <div />}
        {nextEntry ? (
          <Button asChild variant="outline">
            <Link href={`/pages/${nextEntry.id}`}>Next</Link>
          </Button>
        ) : <div />}
      </footer>
    </div>
  );
}
