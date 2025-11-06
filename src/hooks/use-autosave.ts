
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

type AutosaveStatus = 'idle' | 'saving' | 'saved';

export function useAutosave(
  callback: () => void,
  delay: number = 2000,
  options: { onStatusChange?: (status: AutosaveStatus) => void } = {}
) {
  const { onStatusChange } = options;
  const [status, setStatus] = useState<AutosaveStatus>('idle');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleStatusChange = useCallback(
    (newStatus: AutosaveStatus) => {
      setStatus(newStatus);
      onStatusChange?.(newStatus);
    },
    [onStatusChange]
  );

  const triggerSave = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    handleStatusChange('saving');
    timerRef.current = setTimeout(() => {
      callback();
      handleStatusChange('saved');
      setTimeout(() => handleStatusChange('idle'), 2000); // Display "Saved" for 2 seconds
    }, delay);
  }, [callback, delay, handleStatusChange]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { triggerSave, status };
}
