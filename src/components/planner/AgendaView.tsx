'use client';

import { PlusCircle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MoodPicker } from '@/components/MoodPicker';

const hours = Array.from({ length: 15 }, (_, i) => i + 6); // 6 AM to 8 PM

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
      
      <div className="space-y-4">
        {hours.map((hour) => (
          <div key={hour} className="flex items-center gap-4">
            <div className="w-16 text-right text-sm text-muted-foreground">
              {formatHour(hour)}
            </div>
            <div className="flex-1 border-t border-dashed"></div>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <PlusCircle className="h-5 w-5 text-muted-foreground/50" />
            </Button>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <Button className="w-full" onClick={handleAddReminder}>
            <Bell className="mr-2 h-4 w-4" /> Add reminder
        </Button>
      </div>
    </div>
  );
}
