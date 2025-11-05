export type Emotion = 'Happy' | 'Sad' | 'Angry' | 'Calm' | 'Excited';

export interface JournalEntry {
  id: string;
  date: string;
  emotion: Emotion;
  content: string;
}

export type ExerciseCategory = 'Reflection' | 'Habits' | 'Gratitude';

export type ExerciseTask = {
  id: string;
  text: string;
  completed: boolean;
};

export interface Exercise {
  id: string;
  title: string;
  category: ExerciseCategory;
  instruction: string;
  tasks: ExerciseTask[];
  shortInputPrompt: string;
  longInputPrompt: string;
  hasDrawPad: boolean;
  isDone: boolean;
}
