
'use client';

import { AppLayout } from '@/components/AppLayout';
import { usePathname } from 'next/navigation';

export default function ExercisesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isListPage = pathname === '/exercises';

  const reviewConfig = isListPage ? {
    screenName: "Exercises List",
    keyInteractions: [
      "View progress bar of completed exercises.",
      "Expand/collapse exercise categories.",
      "Click on an exercise to start it."
    ]
  } : {
    screenName: "Exercise Template",
    keyInteractions: [
      "Toggle 'Mark as done' switch.",
      "Complete tasks in the checklist.",
      "Fill out short and long form inputs.",
      "Use the draw pad for creative expression."
    ]
  };

  return (
    <AppLayout 
      title="Exercises"
      review={reviewConfig}
    >
      {children}
    </AppLayout>
  );
}
