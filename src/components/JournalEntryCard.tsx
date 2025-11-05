import type { JournalEntry } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmotionChip } from "./EmotionChip";

function formatDate(dateString: string) {
  const date = new Date(dateString + 'T00:00:00'); // Assume local timezone
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
  }).format(date);
}

export function JournalEntryCard({ entry }: { entry: JournalEntry }) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-headline text-lg">{formatDate(entry.date)}</CardTitle>
          </div>
          <EmotionChip emotion={entry.emotion} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/80 leading-relaxed">{entry.content.substring(0, 120)}{entry.content.length > 120 ? '...' : ''}</p>
      </CardContent>
    </Card>
  );
}
