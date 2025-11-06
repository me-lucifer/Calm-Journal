'use client';

import { PlusCircle, Bell, Coffee, Briefcase, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MoodPicker } from '@/components/MoodPicker';

const hours = Array.from({ length: 15 }, (_, i) => i + 6); // 6 AM to 8 PM

const mockAgenda = {
  '9': { text: 'Morning Coffee & Planning', icon: Coffee },
  '13': { text: 'Team Meeting', icon: Briefcase },
  '18': { text: 'Dinner with friends', icon: Sparkles },
};


function formatHour(hour: number) {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h = hour % 12 || 12;
  return `${h} ${ampm}`;
}

export function AgendaView({ date }: { date: Date }) {
  const { toast } = useToast();

  const handleAddReminder = () => {
    toast({
      title: 'Reminder Set',
      description: "We'll notify you at the scheduled time.",
    });
  };

  return (
    <div className="space-y-6 p-4">
      <MoodPicker />
      
      <div className="space-y-2">
        {hours.map((hour) => {
          const event = (mockAgenda as any)[hour];
          return (
            <div key={hour} className="flex items-center gap-4 min-h-[40px]">
              <div className="w-16 text-right text-sm text-muted-foreground">
                {formatHour(hour)}
              </div>
              <div className="flex-1 border-t border-dashed relative">
                {event && (
                  <div className="absolute -top-4 left-2 flex items-center gap-2 text-sm">
                    <event.icon className="h-4 w-4 text-primary" />
                    <span>{event.text}</span>
                  </div>
                )}
              </div>
              {!event && (
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <PlusCircle className="h-5 w-5 text-muted-foreground/50" />
                </Button>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-4">
        <Button className="w-full" onClick={handleAddReminder}>
            <Bell className="mr-2 h-4 w-4" /> Add reminder
        </Button>
      </div>
    </div>
  );
}
