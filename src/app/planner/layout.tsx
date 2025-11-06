
'useuant';

import { AppLayout } from '@/components/AppLayout';

export default function PlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout 
      title="Planner"
      review={{
        screenName: "Planner",
        keyInteractions: [
          "Switch between 'Agenda' and 'Mood Tracker' tabs.",
          "(Agenda) View hourly schedule and mock events.",
          "(Agenda) Use Mood Picker to log emotion.",
          "(Mood Tracker) View monthly calendar with mood dots.",
          "(Mood Tracker) Select a day to see mood and edit notes."
        ]
      }}
    >
      {children}
    </AppLayout>
  );
}
