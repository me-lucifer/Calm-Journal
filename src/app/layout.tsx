import type {Metadata} from 'next';
import './globals.css';
import PhoneFrame from '@/components/PhoneFrame';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Calm Journal',
  description: 'A sanctuary for your thoughts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <PhoneFrame>
          {children}
        </PhoneFrame>
        <Toaster />
      </body>
    </html>
  );
}
