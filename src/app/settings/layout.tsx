
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
          "Switch between 'Appearance', 'Account', and 'Owner' tabs.",
          "Toggle Dark Mode.",
          "View mock account information.",
          "Attempt to 'Sync to Cloud' to see prototype message.",
          "Enable/disable 'Owner Review Mode' from the Owner tab."
        ]
      }}
    >
      {children}
    </AppLayout>
  );
}
