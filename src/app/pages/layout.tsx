'use client';

import { AppLayout } from '@/components/AppLayout';

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout title="Pages">{children}</AppLayout>;
}
