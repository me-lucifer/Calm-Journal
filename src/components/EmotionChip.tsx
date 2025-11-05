import type { Emotion } from "@/lib/types";
import { Smile, Frown, Angry, Zap, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

// This maps emotions to their respective icons and CSS variables for color theming.
const emotionConfig: Record<Emotion, { icon: React.ElementType; variable: string }> = {
  Happy: { icon: Smile, variable: "--emotion-happy" },
  Sad: { icon: Frown, variable: "--emotion-sad" },
  Angry: { icon: Angry, variable: "--emotion-angry" },
  Excited: { icon: Zap, variable: "--emotion-excited" },
  Calm: { icon: Leaf, variable: "--emotion-calm" },
};

/**
 * A small chip component to display an emotion with a corresponding icon and color.
 * Colors are controlled via CSS variables defined in globals.css for theming.
 */
export function EmotionChip({ emotion, className }: { emotion: Emotion; className?: string }) {
  const config = emotionConfig[emotion];
  if (!config) return null;

  const { icon: Icon, variable } = config;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        className
      )}
      style={
        {
          backgroundColor: `hsla(var(${variable}), 0.15)`,
          color: `hsl(var(${variable}))`,
        } as React.CSSProperties
      }
    >
      <Icon className="h-4 w-4" />
      <span>{emotion}</span>
    </div>
  );
}
