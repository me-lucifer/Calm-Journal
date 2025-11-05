"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Emotion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Smile, Frown, Angry, Zap, Leaf, Lightbulb } from "lucide-react";

const emotions: Emotion[] = ['Happy', 'Sad', 'Angry', 'Calm', 'Excited'];

const emotionIcons: Record<Emotion, React.ElementType> = {
  Happy: Smile,
  Sad: Frown,
  Angry: Angry,
  Excited: Zap,
  Calm: Leaf,
};

export function NewEntryForm({ prompt }: { prompt: string }) {
  const [content, setContent] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd save the data.
    // For this prototype, we just navigate back to the home page.
    console.log({ emotion: selectedEmotion, content });
    router.push('/home');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 h-full flex flex-col">
      <div className="space-y-6 flex-1">
        <Card className="bg-primary/10 border-primary/20">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            <CardTitle className="font-headline text-lg text-primary">Today's Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-primary/90">{prompt}</p>
          </CardContent>
        </Card>

        <div>
          <label htmlFor="content" className="font-headline text-lg text-foreground mb-2 block">
            Your Thoughts
          </label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write about your day..."
            className="min-h-[200px] text-base"
            required
          />
        </div>

        <div>
          <h3 className="font-headline text-lg text-foreground mb-3">How are you feeling?</h3>
          <div className="flex flex-wrap gap-2">
            {emotions.map((emotion) => {
              const Icon = emotionIcons[emotion];
              return (
                <Button
                  key={emotion}
                  type="button"
                  variant={selectedEmotion === emotion ? 'default' : 'outline'}
                  onClick={() => setSelectedEmotion(emotion)}
                  className={cn(
                    'rounded-full transition-all',
                    selectedEmotion === emotion && 'shadow-md'
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {emotion}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="sticky bottom-0 bg-background py-4">
        <Button type="submit" size="lg" className="w-full" disabled={!selectedEmotion || content.trim() === ''}>
          Save Entry
        </Button>
      </div>
    </form>
  );
}
