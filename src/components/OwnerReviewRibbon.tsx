
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Info } from 'lucide-react';

type OwnerReviewRibbonProps = {
  screenName: string;
  keyInteractions: string[];
};

export function OwnerReviewRibbon({ screenName, keyInteractions }: OwnerReviewRibbonProps) {
  const [note, setNote] = useState('');

  return (
    <div className="bg-yellow-100 dark:bg-yellow-900/30 border-b border-yellow-300 dark:border-yellow-700 p-3 text-sm text-yellow-900 dark:text-yellow-200">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 mt-0.5 shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-start">
             <div>
                <p className="font-bold text-base">Owner Review Mode</p>
                <p><span className="font-semibold">Screen:</span> {screenName}</p>
             </div>
          </div>
          <div>
            <p className="font-semibold mb-1">Key Interactions:</p>
            <ul className="list-disc list-inside space-y-1">
              {keyInteractions.map((interaction, index) => (
                <li key={index}>{interaction}</li>
              ))}
            </ul>
          </div>
          <div>
            <label htmlFor="review-note" className="font-semibold mb-1 block">Record Note:</label>
            <Textarea
              id="review-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="For client presentation notes..."
              className="bg-yellow-50 dark:bg-yellow-800/20 border-yellow-300 dark:border-yellow-600 min-h-[60px] text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
