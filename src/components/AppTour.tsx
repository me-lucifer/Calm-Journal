'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type TourStep = {
  elementId: string;
  title: string;
  content: string;
  path: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
};

const tourSteps: TourStep[] = [
  {
    elementId: 'tour-quick-journal',
    path: '/home',
    title: 'Welcome to Calm Journal!',
    content: 'This is your dashboard. Let\'s start by exploring how to create a new journal entry.',
    placement: 'bottom',
  },
  {
    elementId: 'tour-handwriting-toggle',
    path: '/new',
    title: 'Type or Draw',
    content: 'You can type your thoughts or switch to a free-hand drawing canvas for more creative expression.',
    placement: 'bottom',
  },
  {
    elementId: 'tour-mood-today',
    path: '/home',
    title: 'Track Your Mood',
    content: 'Next, let\'s see how you can log your daily mood.',
    placement: 'bottom',
  },
  {
    elementId: 'tour-mood-picker',
    path: '/planner?tab=mood-tracker',
    title: 'Pick an Emotion',
    content: 'Simply tap an emoji to log how you\'re feeling. Notice the fun little animation!',
    placement: 'bottom',
  },
  {
    elementId: 'tour-vision-board',
    path: '/home',
    title: 'Create Your Vision',
    content: 'Finally, let\'s check out the Vision Board.',
    placement: 'bottom',
  },
  {
    elementId: 'tour-vision-board-canvas',
    path: '/vision-board',
    title: 'Drag, Drop, and Dream',
    content: 'Arrange images that inspire you. Drag them around to create your personal vision.',
    placement: 'left',
  },
];

export function AppTour() {
  const [hasSeenTour, setHasSeenTour] = useLocalStorage('has-seen-tour', false);
  const [stepIndex, setStepIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const router = useRouter();
  const currentStep = tourSteps[stepIndex];
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasSeenTour) {
      setIsActive(true);
    }
  }, [hasSeenTour]);

  useEffect(() => {
    if (isActive) {
      const step = tourSteps[stepIndex];
      // If the path doesn't match, navigate first. The effect will re-run.
      if (window.location.pathname !== step.path && !window.location.search.includes(step.path)) {
         if (step.path.includes('?')) {
            const [pathname, search] = step.path.split('?');
            router.push(`${pathname}?${search}`);
        } else {
            router.push(step.path);
        }
        return;
      }
      
      // Delay to allow page to render
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(step.elementId);
        if (element) {
          const rect = element.getBoundingClientRect();
          setPosition({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
          element.style.zIndex = '101';
          element.style.position = 'relative';
        }
      }, 200);

      return () => clearTimeout(timeoutId);
    }
  }, [stepIndex, isActive, router]);

  const endTour = () => {
    const step = tourSteps[stepIndex];
    const element = document.getElementById(step.elementId);
    if(element) {
        element.style.zIndex = '';
        element.style.position = '';
    }

    setIsActive(false);
    setHasSeenTour(true);
  };

  const nextStep = () => {
    const currentElement = document.getElementById(currentStep.elementId);
    if(currentElement) {
        currentElement.style.zIndex = '';
        currentElement.style.position = '';
    }
    
    if (stepIndex < tourSteps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      endTour();
    }
  };

  if (!isActive || !currentStep) return null;

  const getTooltipPosition = () => {
    if (!tooltipRef.current) return {};
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    switch (currentStep.placement) {
      case 'top':
        return { top: position.top - tooltipRect.height - 10, left: position.left + position.width / 2 - tooltipRect.width / 2 };
      case 'left':
        return { top: position.top + position.height / 2 - tooltipRect.height / 2, left: position.left - tooltipRect.width - 10 };
      case 'right':
        return { top: position.top + position.height / 2 - tooltipRect.height / 2, left: position.left + position.width + 10 };
      case 'bottom':
      default:
        return { top: position.top + position.height + 10, left: position.left + position.width / 2 - tooltipRect.width / 2 };
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" />
      <div
        ref={tooltipRef}
        className="fixed z-[102] bg-card p-4 rounded-lg shadow-2xl max-w-xs w-full"
        style={getTooltipPosition()}
      >
        <button onClick={endTour} className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
        <h3 className="font-headline text-lg mb-2">{currentStep.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{currentStep.content}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{stepIndex + 1} / {tourSteps.length}</span>
          <Button onClick={nextStep} size="sm">
            {stepIndex === tourSteps.length - 1 ? 'Got it!' : 'Next'}
          </Button>
        </div>
      </div>
    </>
  );
}
