import { Suspense } from 'react';
import { PlannerClientPage } from './PlannerClientPage';
import { Skeleton } from '@/components/ui/skeleton';

function PlannerSkeleton() {
  return (
    <div className="p-0 sm:p-6">
      <div className="w-full">
        <div className="grid w-full grid-cols-2 p-1 bg-muted rounded-md h-10">
            <Skeleton className="h-full w-full" />
            <Skeleton className="h-full w-full" />
        </div>
        <div className="space-y-6 p-4 mt-2">
            <div className="space-y-2">
                <Skeleton className="h-40 w-full rounded-lg" />
            </div>
            <div className="space-y-2">
                 <Skeleton className="h-96 w-full rounded-lg" />
            </div>
        </div>
      </div>
    </div>
  )
}


export default function PlannerPage() {
  return (
    <Suspense fallback={<PlannerSkeleton />}>
      <PlannerClientPage />
    </Suspense>
  );
}
