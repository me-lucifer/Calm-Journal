'use client';

import { useState, useRef } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit, Pen, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { mockExercises } from '@/lib/exercises-data';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function ExercisePage() {
  const { id } = useParams();
  const { toast } = useToast();
  const exercise = mockExercises.find((e) => e.id === id);

  const [isDone, setIsDone] = useState(exercise?.isDone || false);
  const [drawPadActive, setDrawPadActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (!exercise) {
    notFound();
  }
  
  const handleToggleDone = (checked: boolean) => {
    setIsDone(checked);
    // Here you would typically update your backend
    toast({
        title: `Exercise Marked as ${checked ? 'Done' : 'Incomplete'}`,
        description: `"${exercise.title}" status has been updated.`,
    })
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <header className="flex shrink-0 items-center justify-between p-4 border-b">
        <Button asChild variant="ghost" size="icon" className="h-9 w-9">
          <Link href="/exercises">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to Exercises</span>
          </Link>
        </Button>
        <h1 className="font-headline text-lg text-foreground text-center truncate px-4">
          {exercise.title}
        </h1>
        <Switch
          id="mark-as-done"
          checked={isDone}
          onCheckedChange={handleToggleDone}
          aria-label="Mark as done"
        />
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        <div className="p-4 bg-card rounded-lg shadow-sm">
            <h2 className="font-headline text-xl mb-2">Instructions</h2>
            <p className="text-muted-foreground">{exercise.instruction}</p>
        </div>

        {exercise.tasks.length > 0 && (
            <div className="p-4 bg-card rounded-lg shadow-sm">
                <h2 className="font-headline text-xl mb-4">Tasks</h2>
                <div className="space-y-3">
                    {exercise.tasks.map(task => (
                        <div key={task.id} className="flex items-center space-x-3">
                            <Checkbox id={`task-${task.id}`} defaultChecked={task.completed} />
                            <Label htmlFor={`task-${task.id}`} className="text-base flex-1">{task.text}</Label>
                        </div>
                    ))}
                </div>
            </div>
        )}
        
        <div className="space-y-6">
            {exercise.shortInputPrompt && (
                <div>
                    <Label htmlFor="short-input" className="font-headline text-lg text-foreground mb-2 block">{exercise.shortInputPrompt}</Label>
                    <Input id="short-input" placeholder="Your short answer..." />
                </div>
            )}
            
            {exercise.longInputPrompt && (
                <div>
                    <Label htmlFor="long-input" className="font-headline text-lg text-foreground mb-2 block">{exercise.longInputPrompt}</Label>
                    <Textarea id="long-input" placeholder="Your detailed thoughts..." className="min-h-[150px]" />
                </div>
            )}
        </div>

        {exercise.hasDrawPad && (
          <div className="p-4 bg-card rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-headline text-xl">Draw Pad</h2>
                <Button variant="ghost" size="icon" onClick={() => setDrawPadActive(!drawPadActive)}>
                    <Edit className="h-5 w-5" />
                    <span className="sr-only">Toggle Draw Pad</span>
                </Button>
            </div>
            {drawPadActive && (
              <div className="w-full rounded-md border border-input bg-background aspect-video">
                <canvas
                  ref={canvasRef}
                  width="600"
                  height="400"
                  className="w-full h-full rounded-md"
                />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
