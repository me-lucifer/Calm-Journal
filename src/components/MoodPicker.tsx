'use client';

import { useState } from 'react';
import { Laugh, Leaf, BrainCircuit, Frown, Angry, Bed } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Mood = {
  name: string;
  icon: React.ElementType;
  color: string;
};

const moods: Mood[] = [
  { name: 'Happy', icon: Laugh, color: 'text-yellow-500' },
  { name: 'Calm', icon: Leaf, color: 'text-green-500' },
  { name: 'Focused', icon: BrainCircuit, color: 'text-blue-500' },
  { name: 'Sad', icon: Frown, color: 'text-gray-500' },
  { name: 'Angry', icon: Angry, color: 'text-red-500' },
  { name: 'Tired', icon: Bed, color: 'text-purple-500' },
];

export function MoodPicker() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [animatedMood, setAnimatedMood] = useState<string | null>(null);
  const { toast } = useToast();

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setAnimatedMood(mood.name);

    setTimeout(() => {
      setAnimatedMood(null);
      toast({
        title: 'Mood Logged',
        description: `You've logged your mood as "${mood.name}".`,
      });
    }, 2000); // Animation duration
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {moods.map((mood) => {
            const isSelected = selectedMood?.name === mood.name;
            const isAnimating = animatedMood === mood.name;
            return (
              <button
                key={mood.name}
                onClick={() => handleMoodSelect(mood)}
                className={cn(
                  'flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 ease-out',
                  isSelected ? 'border-primary' : 'border-transparent',
                  isAnimating ? 'animate-mood-pop' : '',
                )}
                style={{
                    animationFillMode: 'forwards',
                }}
              >
                <mood.icon
                  className={cn(
                    'h-8 w-8',
                    (isSelected || isAnimating) ? mood.color : 'text-muted-foreground/50'
                  )}
                />
                <span
                  className={cn(
                    'text-sm font-medium',
                    (isSelected || isAnimating) ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {mood.name}
                </span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
