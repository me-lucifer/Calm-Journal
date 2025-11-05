import type { ReactNode } from 'react';

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-neutral-100 p-4 dark:bg-neutral-950">
      {/* Outer bezel */}
      <div className="relative h-[926px] w-[428px] rounded-[44px] bg-black p-2 shadow-2xl">
        {/* Inner screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-background">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 z-10 h-6 w-36 -translate-x-1/2 rounded-b-xl bg-black"></div>
          {children}
        </div>
      </div>
    </main>
  );
}
