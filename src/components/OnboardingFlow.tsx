"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Camera, Circle, CircleDot } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const onboardingSteps = [
  {
    image: PlaceHolderImages[0],
    headline: 'Journaling made easy',
    body: 'Effortlessly capture your thoughts, feelings, and daily experiences in a calm, focused space.',
  },
  {
    image: PlaceHolderImages[1],
    headline: 'Tap an emoji to log mood',
    body: 'Quickly record your emotions with a simple tap, helping you track your mood over time.',
  },
  {
    image: PlaceHolderImages[2],
    headline: 'Build your vision board',
    body: 'Collect images that inspire you and create a personal vision board to visualize your goals.',
  },
];

export function OnboardingFlow() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleNext = () => {
    if (current === onboardingSteps.length - 1) {
      router.push('/home');
    } else {
      api?.scrollNext();
    }
  };

  const handleSkip = () => {
    router.push('/home');
  };

  return (
    <div className="flex h-full flex-col bg-background p-6">
      <Carousel setApi={setApi} className="flex-1">
        <CarouselContent>
          {onboardingSteps.map((step, index) => (
            <CarouselItem key={index} className="flex flex-col items-center justify-center text-center">
              <div className="relative mb-4">
                <Image
                  src={step.image.imageUrl}
                  alt={step.image.description}
                  width={600}
                  height={400}
                  className="aspect-video w-full max-w-[300px] rounded-lg object-cover"
                  data-ai-hint={step.image.imageHint}
                />
                <div className="absolute -bottom-2 -right-2 rounded-full bg-card p-2 shadow-md">
                  <Camera className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <h2 className="font-headline text-2xl text-foreground mt-4">{step.headline}</h2>
              <p className="text-muted-foreground mt-2 max-w-xs">{step.body}</p>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-2">
          {onboardingSteps.map((_, index) =>
            index === current ? (
              <CircleDot key={index} className="h-4 w-4 text-primary" />
            ) : (
              <Circle key={index} className="h-4 w-4 text-primary/30" />
            )
          )}
        </div>
        <Button onClick={handleNext} size="lg" className="w-full">
          {current === onboardingSteps.length - 1 ? 'Enter App' : 'Next'}
        </Button>
        {current < onboardingSteps.length - 1 && (
          <Button onClick={handleSkip} variant="ghost" className="text-muted-foreground">
            Skip
          </Button>
        )}
      </div>
    </div>
  );
}
