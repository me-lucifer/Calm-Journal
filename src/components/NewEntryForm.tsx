"use client";

import { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Pen, Type } from 'lucide-react';
import { useAutosave } from '@/hooks/use-autosave';
import { AppLayoutContext } from './AppLayout'; // Assuming AppLayout provides a context

export function NewEntryForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isHandwriting, setIsHandwriting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const router = useRouter();
  
  const appLayoutContext = useContext(AppLayoutContext);

  const handleSave = useCallback(() => {
    // This is where you'd save to a real backend
    console.log('Autosaving...', { title, content });
  }, [title, content]);
  
  const { triggerSave } = useAutosave(handleSave, 2000, {
      onStatusChange: appLayoutContext?.setStatus,
  });

  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext('2d');
  };
  
  useEffect(() => {
    const ctx = getCanvasContext();
    if (ctx) {
      ctx.strokeStyle = '#2C2C2C'; // Graphite
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, [isHandwriting]);


  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const ctx = getCanvasContext();
    if (!ctx) return;
    setIsDrawing(true);
    const pos = getEventPosition(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    triggerSave();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const ctx = getCanvasContext();
    if (!ctx) return;
    const pos = getEventPosition(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    triggerSave();
  };

  const stopDrawing = () => {
    const ctx = getCanvasContext();
    if (!ctx) return;
    ctx.closePath();
    setIsDrawing(false);
  };

  const getEventPosition = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e.nativeEvent) {
      return {
        x: e.nativeEvent.touches[0].clientX - rect.left,
        y: e.nativeEvent.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave(); // final save
    toast({
      title: 'Saved locally',
      description: 'Your journal entry has been saved.',
    });
    router.push('/home');
  };
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
      triggerSave();
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
      triggerSave();
  }

  const isSaveDisabled = title.trim() === '' || (!isHandwriting && content.trim() === '');

  return (
    <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
      <div className="space-y-6 flex-1">
        <div>
          <Label htmlFor="title" className="font-headline text-lg text-foreground mb-2 block">
            Title
          </Label>
          <Input
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="A title for your entry"
            className="text-base"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="handwriting-toggle" className="font-headline text-lg text-foreground">
            {isHandwriting ? 'Handwriting' : 'Your Thoughts'}
          </Label>
          <div className="flex items-center gap-2">
            <Type className={cn("h-5 w-5", !isHandwriting ? "text-primary" : "text-muted-foreground")} />
            <Switch
              id="handwriting-toggle"
              checked={isHandwriting}
              onCheckedChange={setIsHandwriting}
            />
            <Pen className={cn("h-5 w-5", isHandwriting ? "text-primary" : "text-muted-foreground")} />
          </div>
        </div>

        {isHandwriting ? (
          <div className="w-full rounded-md border border-input bg-background aspect-video">
            <canvas
              ref={canvasRef}
              width="600"
              height="400"
              className="w-full h-full rounded-md"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>
        ) : (
          <Textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            placeholder="Write about your day..."
            className="min-h-[250px] text-base leading-relaxed"
            required={!isHandwriting}
          />
        )}
      </div>
      
      <div className="sticky bottom-0 bg-background py-4">
        <Button type="submit" size="lg" className="w-full" disabled={isSaveDisabled}>
          Save Entry
        </Button>
      </div>
    </form>
  );
}
