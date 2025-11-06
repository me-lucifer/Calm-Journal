
'use client';

import { AppLayout } from '@/components/AppLayout';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout 
      title="Home"
      review={{
        screenName: "Home Dashboard",
        keyInteractions: [
          "Navigate to Quick Journal",
          "Navigate to Mood Tracker (in Planner)",
          "Navigate to Recent Pages",
          "Navigate to Vision Board"
        ]
      }}
    >
      {children}
    </AppLayout>
  );
}
