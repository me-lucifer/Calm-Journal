'use client';

import { AppLayout } from '@/components/AppLayout';

export default function PlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout title="Planner">{children}</AppLayout>;
}
