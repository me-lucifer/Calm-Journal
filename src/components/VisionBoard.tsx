'use client';

import { useState, useRef, useEffect, useContext, useCallback } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Image as ImageIcon, Link, Download, Clapperboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAutosave } from '@/hooks/use-autosave';
import { AppLayoutContext } from './AppLayout';

type BoardImage = {
  id: string;
  src: string;
  alt: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
};

const initialImages: BoardImage[] = [
  {
    id: 'vision-1',
    src: PlaceHolderImages[0].imageUrl,
    alt: PlaceHolderImages[0].description,
    position: { x: 10, y: 10 },
    size: { width: 150, height: 100 },
  },
  {
    id: 'vision-2',
    src: PlaceHolderImages[1].imageUrl,
    alt: PlaceHolderImages[1].description,
    position: { x: 170, y: 50 },
    size: { width: 120, height: 180 },
  },
  {
    id: 'vision-3',
    src: PlaceHolderImages[2].imageUrl,
    alt: PlaceHolderImages[2].description,
    position: { x: 80, y: 200 },
    size: { width: 200, height: 130 },
  },
];

export function VisionBoard() {
  const [images, setImages] = useLocalStorage<BoardImage[]>('vision-board-images', initialImages);
  const [zoom, setZoom] = useState(1);
  const [draggingImage, setDraggingImage] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const boardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const appLayoutContext = useContext(AppLayoutContext);

  const handleSave = useCallback(() => {
    // The useLocalStorage hook already persists changes,
    // but we can log it for demonstration.
    console.log('Autosaving vision board...');
  }, []);

  const { triggerSave } = useAutosave(handleSave, 1000, {
    onStatusChange: appLayoutContext?.setStatus,
  });

  useEffect(() => {
    if (images !== initialImages) {
        triggerSave();
    }
  }, [images, triggerSave]);

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0]);
  };
  
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    if (!boardRef.current) return;
    const image = images.find(img => img.id === id);
    if (!image) return;

    const boardRect = boardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - boardRect.left;
    const mouseY = e.clientY - boardRect.top;
    
    setDraggingImage(id);
    setOffset({
      x: mouseX / zoom - image.position.x,
      y: mouseY / zoom - image.position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggingImage || !boardRef.current) return;

    const boardRect = boardRef.current.getBoundingClientRect();
    const x = (e.clientX - boardRect.left) / zoom - offset.x;
    const y = (e.clientY - boardRect.top) / zoom - offset.y;

    setImages(prevImages =>
      prevImages.map(img =>
        img.id === draggingImage ? { ...img, position: { x, y } } : img
      )
    );
  };

  const handleMouseUp = () => {
    if(draggingImage) {
        triggerSave();
    }
    setDraggingImage(null);
  };
  
  const handleResetLayout = () => {
    setImages(initialImages);
    setZoom(1);
    toast({ title: 'Vision Board Reset', description: 'The layout has been reset to its default state.' });
  };
  
  const handleAddFromUrl = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = e.currentTarget.imageUrl.value;
    if (!url) return;

    const newImage: BoardImage = {
        id: `vision-${Date.now()}`,
        src: url,
        alt: 'User added image',
        position: { x: 20, y: 20 },
        size: { width: 150, height: 100 },
    };
    setImages(prev => [...prev, newImage]);
    toast({ title: 'Image Added', description: 'The image has been added to your board.' });
    e.currentTarget.reset();
     // Close dialog after adding
    const closeButton = document.querySelector('[data-radix-dialog-close]');
    if (closeButton instanceof HTMLElement) {
      closeButton.click();
    }
  };

  const handleExport = () => {
    toast({ title: 'Exporting...', description: 'Your vision board is being prepared as an image.'});
  }
  
  const addImageAction = (
     <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline"><Plus className="mr-2 h-4 w-4" /> Add Image</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add an Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
                 <Button variant="outline" className="w-full" onClick={() => toast({ title: 'File Picker Mock', description: 'In a real app, this would open a file dialog.' })}>
                    <ImageIcon className="mr-2 h-4 w-4" /> Upload from Device
                </Button>
                <form onSubmit={handleAddFromUrl} className="flex gap-2">
                    <Input name="imageUrl" placeholder="Paste image URL..." />
                    <Button type="submit" size="icon"><Link className="h-4 w-4" /></Button>
                </form>
            </div>
        </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex h-full flex-col">
      <div id="tour-vision-board-canvas" className="flex-1 relative overflow-hidden bg-secondary/30" ref={boardRef} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
        {images.length > 0 ? (
             <div
                className="relative w-full h-full origin-top-left"
                style={{ transform: `scale(${zoom})` }}
                >
                {images.map(image => (
                    <div
                    key={image.id}
                    className={cn(
                        "absolute cursor-grab rounded-lg shadow-md transition-shadow duration-200",
                        draggingImage === image.id ? 'shadow-2xl z-10 cursor-grabbing' : 'hover:shadow-lg'
                    )}
                    style={{
                        left: image.position.x,
                        top: image.position.y,
                        width: image.size.width,
                        height: image.size.height,
                    }}
                    onMouseDown={(e) => handleMouseDown(e, image.id)}
                    >
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover rounded-lg pointer-events-none"
                    />
                    </div>
                ))}
            </div>
        ) : (
             <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-background mb-6">
                    <Clapperboard className="w-10 h-10 text-primary" />
                </div>
                <h2 className="font-headline text-2xl text-foreground">Your vision board is empty</h2>
                <p className="text-muted-foreground mt-2 max-w-xs">No images yet. Add your first inspiration to get started!</p>
                <div className="mt-8">
                     <Dialog>
                        <DialogTrigger asChild>
                           <Button size="lg"><Plus className="mr-2 h-4 w-4" /> Add Image</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add an Image</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <Button variant="outline" className="w-full" onClick={() => toast({ title: 'File Picker Mock', description: 'In a real app, this would open a file dialog.' })}>
                                    <ImageIcon className="mr-2 h-4 w-4" /> Upload from Device
                                </Button>
                                <form onSubmit={handleAddFromUrl} className="flex gap-2">
                                    <Input name="imageUrl" placeholder="Paste image URL..." />
                                    <Button type="submit" size="icon"><Link className="h-4 w-4" /></Button>
                                </form>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        )}
      </div>
      <footer className="shrink-0 border-t bg-card p-4 space-y-4">
         <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Zoom</span>
            <Slider
                min={0.5}
                max={2}
                step={0.1}
                value={[zoom]}
                onValueChange={handleZoomChange}
            />
        </div>
        <div className="grid grid-cols-2 gap-2">
           {addImageAction}
            
            <Button variant="outline" onClick={handleResetLayout}><Trash2 className="mr-2 h-4 w-4" /> Reset</Button>
            <Button className="col-span-2" onClick={handleExport}><Download className="mr-2 h-4 w-4" /> Export as PNG</Button>
        </div>
      </footer>
    </div>
  );
}
