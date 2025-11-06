
'use client';

import { AppLayout } from '@/components/AppLayout';
import { VisionBoard } from '@/components/VisionBoard';

export default function VisionBoardPage() {
  return (
    <AppLayout 
      title="Vision Board"
      review={{
        screenName: "Vision Board",
        keyInteractions: [
          "Drag and drop images to rearrange them.",
          "Use the zoom slider to scale the board.",
          "Add new images via URL or mock upload.",
          "Reset the layout to its initial state.",
          "Export the board as a PNG (mock)."
        ]
      }}
    >
      <VisionBoard />
    </AppLayout>
  );
}
