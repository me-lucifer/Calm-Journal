
'use client';

import { AppLayout } from '@/components/AppLayout';
import { usePathname } from 'next/navigation';

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isListPage = pathname === '/pages';

  const reviewConfig = isListPage ? {
    screenName: "Pages List",
    keyInteractions: ["View all journal entries in a grid.", "Click on an entry to view its details."]
  } : {
    screenName: "Page Reader",
    keyInteractions: [
        "Edit text content in the text block.", 
        "Check/uncheck items in the checklist.", 
        "Toggle draw mode to annotate on the page.",
        "Navigate to previous/next entry."
    ]
  };

  return (
    <AppLayout 
      title={isListPage ? "Pages" : "Page"}
      review={reviewConfig}
    >
      {children}
    </AppLayout>
  );
}
