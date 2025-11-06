'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AgendaView } from '@/components/planner/AgendaView';
import { MoodTrackerView } from '@/components/planner/MoodTrackerView';
import type { MoodLog } from '@/lib/types';

export function PlannerClientPage() {
    const searchParams = useSearchParams();
    const defaultTab = searchParams.get('tab') || 'agenda';
    const today = new Date();
    // Set a default mood for today for demonstration purposes
    const [moodLog, setMoodLog] = useState<MoodLog[]>([
        { date: '2024-07-05', mood: 'Happy', note: 'Great day at the park.' },
        { date: '2024-07-12', mood: 'Calm', note: 'Finished a good book.' },
        { date: '2024-07-21', mood: 'Happy', note: 'Productive work session.' },
        { date: '2024-07-29', mood: 'Happy', note: 'Feeling good today!' },
    ]);

  return (
    <div className="p-0 sm:p-6">
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
          <TabsTrigger value="mood-tracker">Mood Tracker</TabsTrigger>
        </TabsList>
        <TabsContent value="agenda">
          <AgendaView date={today} />
        </TabsContent>
        <TabsContent value="mood-tracker">
          <MoodTrackerView moodLog={moodLog} setMoodLog={setMoodLog} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
