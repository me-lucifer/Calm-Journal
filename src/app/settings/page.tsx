
'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Moon, Sun, Eye, Info, RefreshCcw } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { setTheme, theme } = useTheme();
  const [isDark, setIsDark] = useState(theme === 'dark');
  const [isReviewMode, setIsReviewMode] = useLocalStorage('owner-review-mode', false);
  const router = useRouter();

  const handleThemeChange = (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light';
    setTheme(newTheme);
    setIsDark(checked);
  };

  const handleReviewModeChange = (checked: boolean) => {
    setIsReviewMode(checked);
  };

  const handleRestartDemo = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
      router.push('/');
    }
  };

  return (
    <div className="p-6">
      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="owner">Owner</TabsTrigger>
          <TabsTrigger value="help">Help</TabsTrigger>
        </TabsList>
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the look and feel of your journal.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="dark-mode" className="text-base">
                    Dark Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Embrace the quiet of the night.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-muted-foreground" />
                  <Switch
                    id="dark-mode"
                    checked={isDark}
                    onCheckedChange={handleThemeChange}
                  />
                  <Moon className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Theme Preview</Label>
                <div className="flex space-x-2 rounded-lg border p-4">
                    <div className="h-8 w-8 rounded-full bg-primary" />
                    <div className="h-8 w-8 rounded-full bg-secondary" />
                    <div className="h-8 w-8 rounded-full bg-card" />
                    <div className="h-8 w-8 rounded-full bg-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Manage your account settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value="Alex Doe" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value="alex@example.com" disabled />
              </div>
               <p className="text-sm text-center text-muted-foreground pt-2">
                This is a prototype. You can sign in later.
              </p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Sync to Cloud
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Sync Not Available</AlertDialogTitle>
                    <AlertDialogDescription>
                      This is a prototype. Sync is not enabled.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>OK</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </TabsContent>
         <TabsContent value="owner">
          <Card>
            <CardHeader>
              <CardTitle>Owner Settings</CardTitle>
              <CardDescription>
                Internal settings for demonstration purposes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="review-mode" className="text-base flex items-center gap-2">
                    <Eye className="h-5 w-5" /> Owner Review Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Shows a debug ribbon on all screens for client reviews.
                  </p>
                </div>
                <Switch
                  id="review-mode"
                  checked={isReviewMode}
                  onCheckedChange={handleReviewModeChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="help">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Info /> Handoff Guide</CardTitle>
              <CardDescription>
                Welcome to the Calm Journal prototype. Here’s what you need to know.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 text-sm text-foreground/90">
                <div>
                  <h3 className="font-semibold mb-1">Prototype Scope</h3>
                  <p>This is an interactive prototype. Features are functional on the front-end, but there is no real backend integration. All data is stored locally in your browser and will be reset if you clear your cache or click "Restart Demo".</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Simulated Autosave</h3>
                  <p>An autosave feature is simulated on editable screens like the Quick Journal, Page Reader, Exercises, and Vision Board. A "Saved" indicator will appear in the header after you stop editing to mimic real-world behavior.</p>
                </div>
                 <div>
                  <h3 className="font-semibold mb-1">Navigation</h3>
                  <p>Use the bottom navigation bar to switch between the main sections of the app. The home screen cards provide quick access to key features. The back arrow in the header will take you to the previous screen in most flows.</p>
                </div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <RefreshCcw className="mr-2 h-4 w-4" /> Restart Demo
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will clear all your local data, including journal entries, mood logs, and vision board images, and return you to the splash screen.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleRestartDemo}>
                      Restart
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
