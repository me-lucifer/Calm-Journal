import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SplashPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-background text-center p-6">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-headline text-5xl md:text-6xl text-foreground">Calm Journal</h1>
        <p className="text-lg text-muted-foreground max-w-sm">A gentle space for reflection.</p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/onboarding">Begin</Link>
        </Button>
      </div>
    </div>
  );
}
