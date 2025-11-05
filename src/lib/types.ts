export type Emotion = 'Happy' | 'Sad' | 'Angry' | 'Calm' | 'Excited';

export interface JournalEntry {
  id: string;
  date: string;
  emotion: Emotion;
  content: string;
}
