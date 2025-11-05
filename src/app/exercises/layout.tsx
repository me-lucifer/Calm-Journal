'use client';

import { AppLayout } from '@/components/AppLayout';

export default function ExercisesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout title="Exercises">{children}</AppLayout>;
}
