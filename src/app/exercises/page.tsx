'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { mockExercises } from '@/lib/exercises-data';
import type { Exercise } from '@/lib/types';
import { CheckCircle2, Circle } from 'lucide-react';

export default function ExercisesPage() {
  const [exercises, setExercises] = useState(mockExercises);

  const completedCount = useMemo(() => exercises.filter((e) => e.isDone).length, [exercises]);
  const progressPercentage = (completedCount / exercises.length) * 100;

  const groupedExercises = useMemo(() => {
    return exercises.reduce((acc, exercise) => {
      const category = exercise.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(exercise);
      return acc;
    }, {} as Record<string, Exercise[]>);
  }, [exercises]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-muted-foreground">Your Progress</p>
          <p className="text-sm font-medium text-primary">{`${completedCount} / ${exercises.length} completed`}</p>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <Accordion type="multiple" defaultValue={['Reflection', 'Habits', 'Gratitude']} className="w-full">
        {Object.entries(groupedExercises).map(([category, exercisesInCategory]) => (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger className="text-lg font-headline text-foreground hover:no-underline">
              {category}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {exercisesInCategory.map((exercise) => (
                  <Link key={exercise.id} href={`/exercises/${exercise.id}`} className="block">
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-card hover:bg-secondary transition-colors">
                      {exercise.isDone ? (
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground/50" />
                      )}
                      <span className="font-medium text-foreground">{exercise.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
