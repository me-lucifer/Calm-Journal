import type { JournalEntry } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmotionChip } from "./EmotionChip";

function formatDate(dateString: string) {
  const date = new Date(dateString + 'T00:00:00'); // Assume local timezone
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export function JournalEntryCard({ entry }: { entry: JournalEntry }) {
  return (
    <Card className="h-full transition-shadow duration-300 hover:shadow-lg hover:shadow-black/10">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div>
            <CardTitle className="font-headline text-xl">{entry.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{formatDate(entry.date)}</p>
          </div>
          <EmotionChip emotion={entry.emotion} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/80 leading-relaxed line-clamp-3">{entry.content}</p>
      </CardContent>
    </Card>
  );
}
