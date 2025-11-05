import type { Exercise } from './types';

export const mockExercises: Exercise[] = [
  {
    id: 'reflection-1',
    title: 'Daily Reflection',
    category: 'Reflection',
    instruction: 'Take a few moments to reflect on your day. Think about what went well, what challenged you, and what you learned.',
    tasks: [
      { id: 'r1-t1', text: 'List one thing that made you smile.', completed: false },
      { id: 'r1-t2', text: 'Describe one challenge you faced.', completed: true },
    ],
    shortInputPrompt: 'What is one word to describe your day?',
    longInputPrompt: 'Elaborate on your feelings today. What caused them?',
    hasDrawPad: true,
    isDone: false,
  },
  {
    id: 'habits-1',
    title: 'Morning Routine',
    category: 'Habits',
    instruction: 'A consistent morning routine can set a positive tone for the entire day. Check off the habits you completed this morning.',
    tasks: [
      { id: 'h1-t1', text: 'Drank a glass of water.', completed: true },
      { id: 'h1-t2', text: 'Stretched for 5 minutes.', completed: false },
      { id: 'h1-t3', text: 'Set an intention for the day.', completed: true },
    ],
    shortInputPrompt: 'How do you feel after your routine?',
    longInputPrompt: '',
    hasDrawPad: false,
    isDone: true,
  },
  {
    id: 'gratitude-1',
    title: 'Three Good Things',
    category: 'Gratitude',
    instruction: 'Cultivate gratitude by listing three good things that happened to you today, no matter how small.',
    tasks: [],
    shortInputPrompt: '',
    longInputPrompt: '1. ...\n2. ...\n3. ...',
    hasDrawPad: false,
    isDone: false,
  },
    {
    id: 'reflection-2',
    title: 'Mindful Moment',
    category: 'Reflection',
    instruction: 'Pause and bring your attention to the present moment. Notice your breath, the sensations in your body, and the environment around you.',
    tasks: [
        { id: 'r2-t1', text: 'Focused on my breath for 1 minute.', completed: false },
        { id: 'r2-t2', text: 'Noticed 5 things I can see.', completed: false },
    ],
    shortInputPrompt: 'What are you most aware of right now?',
    longInputPrompt: 'Describe your sensory experience during this mindful moment. What did you see, hear, feel?',
    hasDrawPad: false,
    isDone: false,
  },
];
