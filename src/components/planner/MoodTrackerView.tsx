'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import type { MoodLog } from '@/lib/types';
import { EmotionChip } from '@/components/EmotionChip';

const moodColorMapping: Record<string, string> = {
  Happy: 'bg-yellow-400',
  Calm: 'bg-green-400',
  Focused: 'bg-blue-400',
  Sad: 'bg-gray-400',
  Angry: 'bg-red-400',
  Tired: 'bg-purple-400',
};

export function MoodTrackerView({ moodLog, setMoodLog }: { moodLog: MoodLog[], setMoodLog: (log: MoodLog[]) => void; }) {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());

  const selectedLog = selectedDay ? moodLog.find(log => {
      const logDate = new Date(log.date + 'T00:00:00');
      return logDate.toDateString() === selectedDay.toDateString();
  }) : undefined;
  
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedLog) {
      const newLog = moodLog.map(log => 
        log.date === selectedLog.date ? { ...log, note: e.target.value } : log
      );
      setMoodLog(newLog);
    }
  };

  const MoodDay = ({ date }: { date: Date }) => {
    const log = moodLog.find(log => {
        const logDate = new Date(log.date + 'T00:00:00');
        return logDate.toDateString() === date.toDateString();
    });

    if (log) {
      const colorClass = moodColorMapping[log.mood] || 'bg-border';
      return (
        <div className={`absolute bottom-1 right-1 h-2 w-2 rounded-full ${colorClass}`} />
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardContent className="p-2">
          <Calendar
            mode="single"
            selected={selectedDay}
            onSelect={setSelectedDay}
            className="w-full"
            components={{
              DayContent: ({ date }) => <MoodDay date={date as Date} />,
            }}
          />
        </CardContent>
      </Card>

      {selectedLog && (
        <Card>
          <CardHeader>
             <div className="flex justify-between items-center">
                <CardTitle className="font-headline text-lg">Your Mood</CardTitle>
                <EmotionChip emotion={selectedLog.mood} />
             </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={selectedLog.note}
              onChange={handleNoteChange}
              placeholder="Add a note about your day..."
              className="mt-2"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Custom DayContent component to render dots
function DayContent(props: { date: Date; moodLog: MoodLog[] }) {
  const log = props.moodLog.find(log => {
    const logDate = new Date(log.date + 'T00:00:00');
    return logDate.toDateString() === props.date.toDateString();
  });

  return (
    <div className="relative">
      <span>{props.date.getDate()}</span>
      {log && (
        <div
          className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full ${moodColorMapping[log.mood]}`}
        />
      )}
    </div>
  );
}
