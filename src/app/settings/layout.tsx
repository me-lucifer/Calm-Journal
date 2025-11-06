
'use client';

import { AppLayout } from '@/components/AppLayout';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout 
      title="Settings"
      review={{
        screenName: "Settings",
        keyInteractions: [
          "Switch between tabs.",
          "Toggle Dark Mode.",
          "View mock account information.",
          "Enable/disable 'Owner Review Mode'.",
          "Restart the demo from the Help tab."
        ]
      }}
    >
      {children}
    </AppLayout>
  );
}
